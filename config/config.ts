import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Déterminez l'URL de base en fonction de l'environnement
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://linksphere-api-4dc51f475572.herokuapp.com'
  : 'http://192.168.1.13:3000';

const api = axios.create({
    baseURL: BASE_URL,
});

type SetUserToken = (token: string | null) => void;

export const setAuthInterceptor = (userToken: string | null, setUserToken: SetUserToken) => {
    api.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          const originalRequest = error.config;
          if (originalRequest.url.includes('/login')) {
            console.error("Erreur de connexion: Identifiants incorrects.");
            return Promise.reject({ ...error, isLoginError: true });
          }
          console.warn("Session expirée ou non autorisée. Déconnexion de l'utilisateur.");
          await AsyncStorage.removeItem('userToken');
          console.log("test token",userToken);
          setUserToken(null);
          Alert.alert(
            'Session expirée',
            'Votre session a expiré. Veuillez vous reconnecter.',
            [
              {
                text: 'OK',
              }
            ],
            { cancelable: false }
          );
        }
        return Promise.reject(error);
      }
    );
  };
  
  export default api;
  export { BASE_URL };