import { s } from "./styles";
import { Button, ScrollView, View } from "react-native";
import { TxtInria } from "../../components/TxtInria/TxtInria";
import { TxtJost } from "../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/config";
import QRCode from 'react-native-qrcode-svg';
import { CameraView, useCameraPermissions } from "expo-camera";


const ScanScreen = ({ navigation }) => {
    const {userInfo, userToken, isLoading, groupId} = useContext(AuthContext);
    const [qrCode, setQrCode] = useState('');
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {   
        (async () => {
            if (permission && !permission.granted) {
              await requestPermission();
            }
          })();
    }, [permission]);

    const header = (
        <View style={s.header}>
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>My Qr Code</TxtJost>
            </View>
        </View>
    )

    const fetchData = async () => {
        try {
            if (userInfo && userToken) {          
                const response = await api.get(`/users/${userInfo.id}/profil`, {
                    headers: {
                        'Authorization': `${userToken}`
                    }
                });
                const data = response.data.user.qr_code;
                setQrCode(data);
            } else {
                console.error('No user info available');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [userInfo, userToken]);

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        if (data.startsWith('http://') || data.startsWith('https://')) {
            const url = new URL(data);
            const userId = url.searchParams.get('user_id');
            if (userId) {
                try {
                    const payload = {
                        user_contact_group: { user_id: userId }
                    }
                    const response = await api.post(`/users/${userInfo.id}/user_contact_groups`, payload, {
                            headers: { Authorization: userToken }
                        }
                    );
                    const userContactgroupId = response.data.data.id;
                    console.log('UserContactGroup created:', userContactgroupId);
                    console.log(groupId);
                    navigation.navigate('UserContactGroup', { userContactgroupId, groupId, userId });
                } catch (error) {
                    console.error('Error navigating to ProVisitor:', error);
                }
            }
        } 
    };
    
    if (!permission) {
        // Les permissions de la caméra sont toujours en cours de chargement.
        return <View />;
    }

    if (!permission.granted) {
        // Les permissions de la caméra ne sont pas encore accordées.
        return (
            <View style={styles.container}>
            <TxtInria style={{ textAlign: 'center' }}>We need your permission to show the camera</TxtInria>
            <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    const base64Logo = `data:image/png;base64, ${qrCode}` 

    return (
        <>
            <Spinner visible={isLoading}/>
            {header}
            <View style={s.container}>
                <CameraView 
                        style={s.camera}
                        facing={facing}
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barcodeScannerSettings={{ 
                            barcodeTypes: ["qr"],
                            }} 
                />
                <ScrollView>
                            <View style={s.qr}>
                                {qrCode ? (
                                    <QRCode 
                                        
                                        logo={{uri: base64Logo}}
                                        backgroundColor="transparent"
                                        logoSize={220}
                                        logoBackgroundColor="transparent"
                                        size={200} />
                                ) : (
                                    <TxtInria>Qr Code not available</TxtInria>
                                )}
                            </View>
                </ScrollView>
            </View>
        </>
    )
}

export default ScanScreen;