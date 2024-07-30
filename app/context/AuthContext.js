import { createContext, useCallback, useEffect, useState } from "react";
import api, { setAuthInterceptor } from '../../config/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { useRouter } from "expo-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] =useState({});
    const [userToken, setUserToken] = useState(null);
    const [activePage, setActivePage] = useState('Home');
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    
    const fetchContactGroup = useCallback(async () => {
        if (userInfo && userToken) {
            try {
                const response = await api.get(`/users/${userInfo.id}/repertoire`, {
                    headers: { Authorization: userToken }
                });
                const included = response.data.repertoire.included;
                const contactGroup = included.find(group => group.type === 'contact_group' && group.attributes.name === 'Everyone');
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
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            let groupId = await AsyncStorage.getItem('groupId');
            userInfo = JSON.parse(userInfo);
            if(userInfo) {
                setUserInfo(userInfo)
                setUserToken(userToken)
                setGroupId(groupId)
            }
            setSplashLoading(false);
        } catch(e) {
            setSplashLoading(false);
            if (process.env.NODE_ENV === 'development') {
                console.log(`Is logged in error ${e}`);
            }
        }
    };

    useEffect(() => {
        isLoggedIn().then(() => {
            setAuthInterceptor(userToken, setUserToken, router);
        });
    }, [userToken, router]);


    useEffect(() => {
        if (userInfo && userToken) {
            fetchContactGroup();
        }
    }, [userInfo, userToken]);

    
    const register = (firstName, lastName, phone, email, password, confirmPassword) => {
        // Une fois le formulaire envoyé la page ce met en chargement le temps d'envoyer les infos
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
            // Après envoi de userInfo le chargement peux s'arreter
            setIsLoading(false);
            showMessage({
                message: "Welcome in LinkSphere",
                type: "success",
                duration: 4000
            });
            router.replace('/Profil');
        }).catch(e => {
            console.log(`register error ${e}`);
            setIsLoading(false);
            let errorMessage = "Check your login details and try again."; // Message d'erreur par défaut

            if (e.response && e.response.status === 422) {
                errorMessage = "This email already has an account.";  // Message pour erreur 422
            } else if (e.message) {
                errorMessage = e.message;  // Message d'erreur général basé sur l'exception
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



    const login = async (email, password) => {
        setIsLoading(true);
        console.log("Attempting login...");
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
            console.log("Login response:", response); // Debug log
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
            router.replace('/Profil');
        } catch(e) {
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
    }

    const logout = async () => {
        setIsLoading(true);
        try {
            await api.delete('/logout', {
              headers: { Authorization: userToken }
            });
            // await AsyncStorage.removeItem('userInfo');
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('groupId');
            // setUserInfo(null);
            setUserToken(null);
            setGroupId(null);
            setIsLoading(false);
            showMessage({
              message: "Logout Successful",
              type: "success",
              duration: 3000
            });
            router.replace('/Home');
        } catch (e) {
            console.error(`Logout error:`, e);
            setIsLoading(false);
            showMessage({
              message: "Logout Error",
              description: "There was a problem logging out. Please try again.",
              type: "danger",
              duration: 3000
            });
        }
    }

    const deleteAccount = async () => {
        try {
            const response = await api.delete(`/signup`, {
                headers: { Authorization: userToken },
            });

            if (response.status === 200 || response.status === 204) {
                router.replace('/Home');
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('groupId');
                await AsyncStorage.removeItem('userInfo');
                setUserInfo(null);
                setGroupId(null);
                setUserToken(null);
                showMessage({
                    message: "Account deleted successfully",
                    type: "success",
                    duration: 4000
                });
            } else {
                showMessage({
                    message: "Error deleting account",
                    description: "There was a problem deleting your account. Please try again.",
                    type: "danger",
                    duration: 4000
                });
            }
        } catch (error) {
            console.error("Error deleting account:", error.response ? error.response.data : error.message);

            showMessage({
                message: "Error deleting account",
                description: error.response ? error.response.data.message : "There was a problem deleting your account. Please try again.",
                type: "danger",
                duration: 4000
            });
        }
    }
    

    const updateProfil = async (firstName, lastName, phone, email, job, industry, biography, website, linkedin, instagram, facebook, twitter, currentPassword, avatar) => {
        setIsLoading(true); 
        let formData = new FormData();

        // Ajoute les autres données
        formData.append('user[first_name]', firstName);
        formData.append('user[last_name]', lastName);
        formData.append('user[phone]', phone);
        formData.append('user[email]', email);
        formData.append('user[job]', job);
        formData.append('user[industry]', industry);
        formData.append('user[biography]', biography);
        formData.append('user[website]', website);
        formData.append('user[linkedin]', linkedin);
        formData.append('user[instagram]', instagram);
        formData.append('user[facebook]', facebook);
        formData.append('user[twitter]', twitter);
        formData.append('user[current_password]', currentPassword);

        if (Array.isArray(avatar) && avatar.length > 0) {
            const uri = avatar[0];
            if (typeof uri === 'string') {
                const uriParts = uri.split('.');
                const fileType = uriParts[uriParts.length - 1];
                const uniqueName = `avatar-${Date.now()}.${fileType}`;
                formData.append('user[avatar]', {
                    uri: uri,
                    name: uniqueName,
                    type: `image/${fileType}`
                });
            } else {
                console.error('Le premier élément de avatar doit être une chaîne de caractères', uri);
            }
        }
        
        try {
            const response = await api.patch(`/signup`, formData, {
                headers: {
                    Authorization: `${userToken}`,
                    'Content-Type': 'multipart/form-data',
                    accept: 'application/json',
                }
            });
        
            if (response && response.data) {
                let userInfo = response.data.data;
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setUserInfo(userInfo);
                showMessage({ type: 'success', message: 'Profile updated successfully' });
            } else {
                console.error('Réponse de mise à jour du profil invalide:', response);
                setErrorMessage("Invalid profile update response");
                showMessage({ type: 'error', message: 'Erreur de mise à jour' });
            }
        } catch (error) {
            // Affiche un message d'erreur général en cas d'échec de la requête
            console.error('Erreur lors de la mise à jour du profil:', error);
            showMessage({
                message: "Update Failed",
                description: "An error occurred while updating the profile.",
                type: "error",
                duration: 4000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const updatePreferences = async (preferences) => {
        if (!userInfo || !userToken) {
            console.error('User not authenticated');
            return;
        }
        try {
            const response = await api.patch(`/users/${userInfo.id}/update_preferences`, {
                user: {
                    push_notifications: preferences.push_notifications,
                    messages_from_contacts: preferences.messages_from_contacts,
                    messages_from_everyone: preferences.messages_from_everyone
                }
            }, {
                headers: {
                    Authorization: `${userToken}`,
                    'Content-Type': 'multipart/form-data',
                    accept: 'application/json',
                }
            });
            if (response.status === 200 || response.status === 204) {
                const updatedUser = response.data.data.attributes;

                setUserInfo(updatedUser);
                await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
                showMessage({
                    message: 'Preferences updated successfully',
                    type: 'success',
                    duration: 4000
                });  
            } else {
                const errorData = await response.json();
                console.error('Error updating preferences:', errorData.errors);
                showMessage({
                    message: 'Error updating preferences',
                    description: errorData.errors.join(', '),
                    type: 'danger',
                    duration: 4000
                });
            }
        } catch (error) {
            console.error('Error updating preferences:', error);
            showMessage({
                message: 'Error updating preferences',
                description: error.message,
                type: 'danger',
                duration: 4000
            });
        }
    }


    


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
                deleteAccount,
                updateProfil,
                updatePreferences }}>
            {children}
        </AuthContext.Provider>
    );
};