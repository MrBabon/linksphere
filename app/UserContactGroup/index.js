import { ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold, TxtInriaLight } from "../../components/TxtInria/TxtInria";
import { s } from "./styles";
import * as Animatable from 'react-native-animatable';
import { TxtJost } from "../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "../../components/Header/Header";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../../config/config";
import Avatar from "../../assets/icons/Avatar";
import Phone from "../../assets/icons/Phone";
import Mail from "../../assets/icons/Mail";
import Globe from "../../assets/icons/Globe";
import Twitter from "../../assets/icons/Twitter";
import Linkedin from "../../assets/icons/Linkedin";
import Facebook from "../../assets/icons/Facebook";
import Instagram from "../../assets/icons/Instagram";
import Share from "../../assets/icons/Share";
import ChevronBottom from "../../assets/icons/ChevronBottom";
import { ModalContactGroup } from "../../components/Modal/ModalContactGroup/ModalContactGroup";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useLocalSearchParams, useRouter } from "expo-router";

const UserContactGroupScreen = () => {
    const { userContactgroupId, groupId, userId } = useLocalSearchParams();
    const { userInfo, userToken } = useContext(AuthContext);
    const [user, setUser] = useState([]);
    const [contactGroup, setContactGroup] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState([]);
    const [visible, setVisible] = useState(false);
    const router = useRouter();



    const fetchData = useCallback(async () => {
        try {
            if (userInfo && userToken) {
                const response = await api.get(`/users/${userInfo.id}/repertoire/contact_groups/${groupId}/user_contact_groups/${userId}`, {
                    headers: {
                        'Authorization': userToken
                    }
                });
                const groups = response.data.contact_group.data;
                if (Array.isArray(groups) && groups.length > 0) {
                    const deletableGroups = groups.filter(group => group.attributes.deletable);
                    const formattedGroups = deletableGroups.map(group => ({ id: group.id, ...group.attributes }));
                    setContactGroup(formattedGroups);
                }
                
                const user = response.data.user.data.attributes;
                const data = response.data.user_contact_group.data.attributes;
                const note = data.personal_note;
                setUser(user);
                setNote(note);
            }
        } catch(e) {
            console.error(e);
        }
    }, [userInfo, userToken, groupId, userContactgroupId]);
    
        useEffect(() => {
            fetchData();
        }, [fetchData]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const addContactGroup = async (groupName) => {
        try {
            const payload = {
                contact_group: { name: groupName }
            };
            const response = await api.post(`/users/${userInfo.id}/repertoire/contact_groups`, payload, {
                headers: { Authorization: userToken }
            });
            console.log("Full response: => ",response.data);
            if (response.status === 201 && response.data) {
                const newGroup = { id: response.data.id, name: response.data.name, ...response.data.attributes };
                setContactGroup(prevGroups => [...prevGroups, newGroup]);
            }
            showMessage({
                message: 'Group added',
                type: 'success',
                duration: 3000
            });
            setModalVisible(false);
        } catch (e) {
            console.error(e);
            showMessage({
                message: 'An error occured',
                type: 'danger',
                duration: 3000
            });
        }
    }

    const addUserToGroup = async (userId, groupId, personalNote) => {
        try {
            const payload = {
                user_contact_group: { user_id: userId, contact_group_id: groupId, personal_note: personalNote }
            };

            const response = await api.post(`/users/${userInfo.id}/repertoire/contact_groups/${groupId}/user_contact_groups/add_to_group`, payload, {
                headers: { Authorization: userToken }
            });
            if (response.status === 201 && response.data) {
                showMessage({
                    message: 'User added to group',
                    type: 'success',
                    duration: 3000
                });
            } else if (response.status === 200 && response.data.message === 'User already in group') {
                showMessage({
                    message: 'User already in group',
                    type: 'info',
                    duration: 3000
                });
            }
            toggleMenu();
        } catch (e) {
            console.error(e);
            showMessage({
                message: 'An error occured',
                type: 'danger',
                duration: 3000
            });
        }
    }

    const handleGroupClick = async (groupId) => {
        try {
            await addUserToGroup(user.id, groupId, note);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur au groupe", error);
        }
    };

    const handleChatPress = async (userId) => {
        try {
            const response = await api.post('/chatrooms', {
                other_user_id: userId,
            });
            console.log("chatroom id Response:", response.data.data.attributes.id);

            const chatroomId = response.data.data.attributes.id;
            console.log("Chatroom ID:", chatroomId);

            router.push({ pathname: 'ChatroomShow', params: { chatroomId, userId: userId } });
        } catch (error) {
            console.error("Failed to create chatroom:", error);
        }
    }

    const toggleMenu = () => {
        setVisible(!visible);
    };


    
    return (
        <>
            <Spinner/>
            <Header title="Contact"
                    showBackButton={true}
                    onBackPress={() => router.back()}
                    showChatroom={true}
                    onChatPress={() => handleChatPress(user.id)}/>
            <View style={s.contactgroups}>
                <TouchableOpacity style={s.btngroup} onPress={toggleMenu}>
                    <TxtJost style={s.txtbtngroup}>Group</TxtJost>
                    <ChevronBottom style={[s.chevron, { transform: [{ rotate: visible ? '180deg' : '0deg' }] }]}/>
                </TouchableOpacity>
            </View>        
            <Animatable.View
                style={s.menu}
                animation={visible ? 'fadeInDown' : 'fadeOutUp'}
                duration={300}>
                    {visible && (
                        <View style={s.menuItems}>
                            {contactGroup.map(group => (
                                <TouchableOpacity key={group.id} onPress={() => handleGroupClick(group.id)}>
                                    <TxtJost style={s.menuItem}>{group.name}</TxtJost>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <TxtJost style={s.menuItem}>+ Add New Group</TxtJost>
                            </TouchableOpacity>
                            <ModalContactGroup isVisible={modalVisible} 
                                            onClose={() => setModalVisible(false)} 
                                            onConfirm={addContactGroup}/>
                        </View>
                    )}
            </Animatable.View>    
            <ScrollView>
                <View style={s.container}>
                    <View style={s.share}>
                        <TouchableOpacity onPress={() => router.navigate({pathname: "Share", params: {userShare: JSON.stringify(user)}})}>
                            <Share/>
                        </TouchableOpacity>
                    </View>
                    <View style={s.avatar}>
                        <Avatar uri={user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url}/>
                    </View>
                    <View style={s.contact}>
                        <TxtInria style={s.name}>{user.first_name} {user.last_name}</TxtInria>
                        <View style={s.user_info}>
                            <Phone color="#7F95E4" />
                            <TxtInria style={s.info}>{user.phone}</TxtInria>
                        </View>
                        <View style={s.user_info}>
                            <Mail color="#7F95E4" />
                            <TxtInria style={s.info}>{user.email}</TxtInria>
                        </View>
                        <View style={s.user_info}>
                            <Globe color="#7F95E4" url={user.website} />
                            <TxtInria style={s.info}>{user.website}</TxtInria>
                        </View>
                    </View>
                    <View style={s.social}>
                        <Twitter color="#FBD160"  url={userInfo.twitter} />
                        <Linkedin color="#FBD160" url={userInfo.linkedin} />
                        <Facebook color="#FBD160" url={userInfo.facebook} />
                        <Instagram color="#FBD160" url={userInfo.instagram} />
                    </View>
                    <View style={s.border}></View>
                    <View style={s.detail}>
                        <View style={s.standView}>
                            <TouchableOpacity style={s.note}>
                                <TxtInria style={s.txtNote}>Personal Note</TxtInria>
                            </TouchableOpacity>
                        </View>
                        <View style={s.detailTxt}>
                            <TxtInriaBold style={s.job}>{user.job ? user.job : "Job not specified"}</TxtInriaBold>
                            <TxtInriaLight style={s.industry}>{user.industry ? user.industry : "Industry not specified"}</TxtInriaLight>
                            <View style={s.company}>
                                {/* Rediriger vers l'entreprise en question */}
                                <TouchableOpacity>
                                    <TxtInria style={s.at}>At <TxtInriaBold style={s.nameCompany}>DannaCode</TxtInriaBold></TxtInria>
                                </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    <TxtInria style={s.bio}>{user.biography}</TxtInria>
                </View>
            </ScrollView>
        </>
    )
}

export default UserContactGroupScreen;