import { Linking } from 'react-native';

const useOpenUrl = (url) => {
    const openUrl = () => {
        let correctedUrl = url;
        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
            correctedUrl = 'http://' + url;  // Assurez-vous d'utiliser HTTPS si possible
        }
        Linking.canOpenURL(correctedUrl).then((supported) => {
            if(supported) {
                Linking.openURL(correctedUrl);
            } else {
                console.error("Don't know how to open URL: " + correctedUrl);
            }
        }).catch(err => console.error("An error occurred", err));
    };

    return openUrl;
};

export default useOpenUrl;