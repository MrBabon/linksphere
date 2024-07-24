import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter, Slot } from 'expo-router';
import Spinner from 'react-native-loading-spinner-overlay';

const AuthWrapper = () => {
    const { userToken, isLoading } = useContext(AuthContext);
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            setIsReady(true);
            if (userToken) {
                console.log("Redirecting to profile");
                router.replace('/Profil');
            } else {
                console.log("Redirecting to home");
                
                router.replace('/Home');
            }
        }
    }, [isLoading, userToken]);

    if (!isReady) {
        return <Spinner visible={true} />;
    }

    return <Slot />;
};

export default AuthWrapper;
