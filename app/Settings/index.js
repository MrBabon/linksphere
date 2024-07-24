import { s } from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import Settings from '../../assets/icons/Settings';
import ChevronLeft from "../../assets/icons/ChevronLeft";
import ChevronRight from "../../assets/icons/ChevronRight";
import { ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold } from "../../components/TxtInria/TxtInria";
import { TxtJost } from "../../components/TxtJost/TxtJost";
import DoorExit from "../../assets/icons/Doorexit";


const SettingsScreen = ({ navigation }) => {
    const {userInfo, logout, isLoading, updatePreferences} = useContext(AuthContext);
    const [pushNotifications, setPushNotifications] = useState(userInfo.push_notifications);
    const [messagesFromContacts, setMessagesFromContacts] = useState(userInfo.messages_from_contacts);
    const [messagesFromEveryone, setMessagesFromEveryone] = useState(userInfo.messages_from_everyone);

    const handleUpdatePreferences = (preference, value) => {
        const updatedPreferences = {
            ...userInfo,
            [preference]: value
        }
        updatePreferences(updatedPreferences)
            .then(() => {
                // Mettre à jour les états locaux après la réussite de la mise à jour
                if (preference === 'push_notifications') setPushNotifications(value);
                if (preference === 'messages_from_contacts') setMessagesFromContacts(value);
                if (preference === 'messages_from_everyone') setMessagesFromEveryone(value);
            })
            .catch((error) => {
                console.error(`Error updating ${preference}:`, error);
            });
    };

    
    

    const settingButton = (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Settings/>
        </TouchableOpacity>
    );
    const BackButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    );
    const header = (

        <View style={s.header}>
            {BackButton}
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>Settings</TxtJost>
            </View>
            {settingButton}
        </View>
    )

    return (
        <>
            <Spinner visible={isLoading}/>
            {header}
            <ScrollView>
                <View style={s.container}>
                    <View style={s.card}>
                        <View style={s.name}>
                            <TxtInriaBold style={s.username}>{userInfo.first_name} {userInfo.last_name}</TxtInriaBold>
                        </View>
                        <View style={s.lign}></View>
                        <View style={s.section_card}>
                            <TxtInria style={s.title}>Account Settings</TxtInria>
                            <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('Edit')}>
                                <TxtInriaBold style={s.txt}>Edit Profile</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Add a payment method</TxtInriaBold>
                                <TxtInriaBold style={{ marginBottom: 3, marginRight: 2 }}>+</TxtInriaBold>
                            </TouchableOpacity>
                            <View style={s.btn}>
                                <TxtInriaBold style={s.txt}>Push notifications</TxtInriaBold>
                                <Switch
                                    value={pushNotifications}
                                    onValueChange={(value) => handleUpdatePreferences('push_notifications', value)}
                                    trackColor={{ false: '#767577', true: '#FFD115' }}
                                    style={s.switch}/>
                            </View>
                            <View style={s.btn}>
                                <TxtInriaBold style={s.txt}>Messages from contacts</TxtInriaBold>
                                <Switch
                                    value={messagesFromContacts}
                                    onValueChange={(value) => handleUpdatePreferences('messages_from_contacts', value)}
                                    trackColor={{ false: '#767577', true: '#FFD115' }}
                                    style={s.switch}/>
                            </View>
                            <View style={s.btn}>
                                <TxtInriaBold style={s.txt}>Messages from everyone</TxtInriaBold>
                                <Switch
                                    value={messagesFromEveryone}
                                    onValueChange={(value) => handleUpdatePreferences('messages_from_everyone', value)}
                                    trackColor={{ false: '#767577', true: '#FFD115' }}
                                    style={s.switch}/>
                            </View>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Push notifications</TxtInriaBold>
                                <TxtInriaBold style={{ marginBottom: 3, marginRight: 2 }}>+</TxtInriaBold>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Messages from contacts</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Messages from everyone</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={s.lign}></View>
                        <View style={s.section_card}>
                            <TxtInria style={s.title}>Company</TxtInria>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Create/modify a business page</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={s.lign}></View>
                        <View style={s.section_card}>
                            <TxtInria style={s.title}>Events</TxtInria>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Create an event</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={s.lign}></View>
                        <View style={s.section_card}>
                            <TxtInria style={s.title}>More</TxtInria>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>About us</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Privacy policy</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Terms and conditions</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Manage blocked profil</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btn}>
                                <TxtInriaBold style={s.txt}>Delete your account</TxtInriaBold>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={s.container_log_out}>
                            <TouchableOpacity style={s.btn_log_out} onPress={() => logout(navigation)}>
                                <DoorExit />
                                <TxtInriaBold style={s.txt_log_out}>LOG OUT</TxtInriaBold>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}


export default SettingsScreen;