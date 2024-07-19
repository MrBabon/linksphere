import api, { setAuthInterceptor } from "@/config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { createContext, useCallback, useEffect, useState, ReactNode } from "react"; 
import { AxiosError } from "axios";

// Types pour les informations utilisateur
interface UserInfo {
    id?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    job?: string;
    biography?: string;
    website?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    avatar?: string;
}

// Types pour le contexte d'authentification
interface AuthContextProps {
    isLoading: boolean;
    userInfo: UserInfo | null;
    userToken: string | null;
    activePage: string;
    splashLoading: boolean;
    groupId: string | null;
    errorMessage: string;
    register: (firstName: string, lastName: string, phone: string, email: string, password: string, confirmPassword: string) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfil: (firstName: string, lastName: string, phone: string, email: string, job: string, biography: string, website: string, linkedin: string, instagram: string, facebook: string, twitter: string, currentPassword: string, avatar: string[]) => Promise<void>;
    updatePreferences: (preferences: any) => Promise<void>;
}

// Types pour le contexte d'authentification
interface AuthContextProps {
    isLoading: boolean;
    userInfo: UserInfo | null;
    userToken: string | null;
    activePage: string;
    splashLoading: boolean;
    groupId: string | null;
    errorMessage: string;
    register: (
      firstName: string,
      lastName: string,
      phone: string,
      email: string,
      password: string,
      confirmPassword: string
    ) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfil: (
      firstName: string,
      lastName: string,
      phone: string,
      email: string,
      job: string,
      biography: string,
      website: string,
      linkedin: string,
      instagram: string,
      facebook: string,
      twitter: string,
      currentPassword: string,
      avatar: string[]
    ) => Promise<void>;
    updatePreferences: (preferences: any) => Promise<void>;
}

// Initialisation du contexte avec des valeurs par défaut
export const AuthContext = createContext<AuthContextProps>({
    isLoading: false,
    userInfo: null,
    userToken: null,
    activePage: "Home",
    splashLoading: false,
    groupId: null,
    errorMessage: "",
    register: () => {},
    login: async () => {},
    logout: async () => {},
    updateProfil: async () => {},
    updatePreferences: async () => {}
});

// Types pour les propriétés du fournisseur d'authentification
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [activePage, setActivePage] = useState<string>('Home');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [splashLoading, setSplashLoading] = useState<boolean>(false);
    const [groupId, setGroupId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const fetchContactGroup = useCallback(async () => {
        if (userInfo && userToken) {
          try {
            console.log('Je test le fetchContactGroup afin de validé si userToken et tout de même bien présent');
            const response = await api.get(`/users/${userInfo.id}/repertoire`, {
              headers: { Authorization: userToken }
            });
            const included = response.data.repertoire.included;
            const contactGroup = included.find((group: any) => group.type === 'contact_group' && group.attributes.name === 'Everyone');
            if (contactGroup) {
              setGroupId(contactGroup.id);
              await AsyncStorage.setItem('groupId', contactGroup.id);
            } else {
              console.error('Contact group "Everyone" not found');
            }
          } catch (error) {
            console.error('Error fetching contact group ID:', error);
          }
        }
    }, [userInfo, userToken]);

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfoString = await AsyncStorage.getItem("userInfo");
            let userToken = await AsyncStorage.getItem('userToken');
            let groupId = await AsyncStorage.getItem('groupId');
            
            // Analyser la chaîne JSON pour obtenir les informations utilisateur
            let userInfo: UserInfo | null = userInfoString
            ? (JSON.parse(userInfoString) as UserInfo)
            : null;

            if (userInfo) {
                setUserInfo(userInfo);
                setUserToken(userToken);
                setGroupId(groupId);
            }
            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            if (process.env.NODE_ENV === 'development') {
                console.log(`Is logged in error ${e}`);
            }
        }
      };
    
      useEffect(() => {
        isLoggedIn().then(() => {
          setAuthInterceptor(userToken, setUserToken);
        });
      }, [userToken]);

    useEffect(() => {
        if (userInfo && userToken) {
            fetchContactGroup();
        }
    }, [userInfo, userToken]);

    const register = (firstName: string, lastName: string, phone: string, email: string, password: string, confirmPassword: string) => {
        setIsLoading(true);
        api.post(`/signup`, {
          user: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            password: password,
            password_confirmation: confirmPassword
          }
        }).then(res => {
          let userInfo = res.data.data;
          let token = res.headers['authorization'];
          setUserInfo(userInfo);
          setUserToken(token);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          AsyncStorage.setItem('userToken', token);
          setIsLoading(false);
          showMessage({
            message: "Welcome in LinkSphere",
            type: "success",
            duration: 4000
          });
        }).catch(e => {
          console.log(`register error ${e}`);
          setIsLoading(false);
          let errorMessage = "Check your login details and try again.";
    
          if (e.response && e.response.status === 422) {
            errorMessage = "This email already has an account.";
          } else if (e.message) {
            errorMessage = e.message;
          }
    
          setErrorMessage(errorMessage);
          showMessage({
            message: "Login Error",
            description: errorMessage,
            type: "danger",
            duration: 4000
          });
        })
    };
    
    const login = async (email: string, password: string) => {
        setIsLoading(true);
    
        try {
          const response = await api.post('/login', {
            user: {
              email: email,
              password: password
            }
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          let userInfo = response.data.data;
          let token = response.headers['authorization'];
          setUserInfo(userInfo);
          setUserToken(token);
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          await AsyncStorage.setItem('userToken', token);
          await fetchContactGroup();
          setIsLoading(false);
          showMessage({
            message: "Login Successful",
            type: "success",
            duration: 4000
          });
    
        } catch (e: any) {
          if (e.isLoginError) {
            if (process.env.NODE_ENV === 'development') {
              console.error("Erreur de connexion: Identifiants incorrects.");
            }
            setIsLoading(false);
            showMessage({
              message: "Login Error",
              description: "Check your login details and try again.",
              type: "danger",
              duration: 4000
            });
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.error(`Login error: ${e.message}`);
            }
            setIsLoading(false);
            showMessage({
              message: "Login Error",
              description: e.message || "An unexpected error occurred. Please try again.",
              type: "danger",
              duration: 4000
            });
          }
        };
    };

    const logout = async () => {
        setIsLoading(true);
        if (userToken) {
          try {
            await api.delete('/logout', {
              headers: { Authorization: userToken }
            });
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('groupId');
            setUserToken(null);
            setGroupId(null);
            setIsLoading(false);
            showMessage({
              message: "Logout Successful",
              type: "success",
              duration: 4000
            });
          } catch (e) {
            console.error(`Logout error:`, e);
            setIsLoading(false);
            showMessage({
              message: "Logout Error",
              description: "There was a problem logging out. Please try again.",
              type: "danger",
              duration: 4000
            });
          }
        }
    };

    const updateProfil = async (
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        job: string,
        biography: string,
        website: string,
        linkedin: string,
        instagram: string,
        facebook: string,
        twitter: string,
        currentPassword: string,
        avatar: string[]
      ) => {
        setIsLoading(true);
        let formData = new FormData();
    
        formData.append("user[first_name]", firstName);
        formData.append("user[last_name]", lastName);
        formData.append("user[phone]", phone);
        formData.append("user[email]", email);
        formData.append("user[job]", job);
        formData.append("user[biography]", biography);
        formData.append("user[website]", website);
        formData.append("user[linkedin]", linkedin);
        formData.append("user[instagram]", instagram);
        formData.append("user[facebook]", facebook);
        formData.append("user[twitter]", twitter);
        formData.append("user[current_password]", currentPassword);
    
        if (Array.isArray(avatar) && avatar.length > 0) {
          const uri = avatar[0];
          if (typeof uri === "string") {
            const uriParts = uri.split(".");
            const fileType = uriParts[uriParts.length - 1];
            const uniqueName = `avatar-${Date.now()}.${fileType}`;
            formData.append("user[avatar]", {
              uri: uri,
              name: uniqueName,
              type: `image/${fileType}`
            } as any); // Ajout de `as any` pour éviter les erreurs de type
          } else {
            console.error("Le premier élément de avatar doit être une chaîne de caractères", uri);
          }
        }
    
        try {
          const response = await api.patch(`/signup`, formData, {
            headers: {
              Authorization: `${userToken ?? ""}`,
              "Content-Type": "multipart/form-data",
              accept: "application/json"
            }
          });
    
          if (response && response.data) {
            let userInfo = response.data.data;
            await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
            setUserInfo(userInfo);
            showMessage({ type: "success", message: "Profile updated successfully" });
          } else {
            console.error("Réponse de mise à jour du profil invalide:", response);
            setErrorMessage("Invalid profile update response");
            showMessage({ type: "danger", message: "Erreur de mise à jour" });
          }
        } catch (error) {
          console.error("Erreur lors de la mise à jour du profil:", error);
          showMessage({
            message: "Update Failed",
            description: "An error occurred while updating the profile.",
            type: "danger",
            duration: 4000
          });
        } finally {
          setIsLoading(false);
        }
    };

    const updatePreferences = async (preferences: any) => {
        if (!userInfo || !userToken) {
          console.error("User not authenticated");
          return;
        }
        try {
          const response = await api.patch(
            `/users/${userInfo.id}/update_preferences`,
            {
              user: {
                push_notifications: preferences.push_notifications,
                messages_from_contacts: preferences.messages_from_contacts,
                messages_from_everyone: preferences.messages_from_everyone
              }
            },
            {
              headers: {
                Authorization: `${userToken ?? ""}`,
                "Content-Type": "multipart/form-data",
                accept: "application/json"
              }
            }
          );
          if (response.status === 200 || response.status === 204) {
            const updatedUser = response.data.data.attributes;
    
            setUserInfo(updatedUser);
            await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));
            showMessage({
              message: "Preferences updated successfully",
              type: "success",
              duration: 4000
            });
          } else {
            const errorData = await response.data;
            console.error("Error updating preferences:", errorData.errors);
            showMessage({
              message: "Error updating preferences",
              description: errorData.errors.join(", "),
              type: "danger",
              duration: 4000
            });
          }
        } catch (error) {
            const axiosError = error as AxiosError;
          console.error("Error updating preferences:", axiosError.message);
          showMessage({
            message: "Error updating preferences",
            description: axiosError.message,
            type: "danger",
            duration: 4000
          });
        }
    };

    return (
        <AuthContext.Provider
          value={{
            isLoading,
            userInfo,
            userToken,
            activePage,
            splashLoading,
            groupId,
            errorMessage,
            register,
            login,
            logout,
            updateProfil,
            updatePreferences
          }}
        >
          {children}
        </AuthContext.Provider>
    );
}