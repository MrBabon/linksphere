import { s } from "./styles";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../components/TxtInria/TxtInria"
import Spinner from "react-native-loading-spinner-overlay";
import { UserSearch } from "../../components/forms/UserSearch/UserSearch";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/config";
import Avatar from "../../assets/icons/Avatar";
import { showMessage } from "react-native-flash-message";
import Header from "../../components/Header/Header";

const ContactGroupScreen = ({ route, navigation }) => {
    const { groupId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [contactGroup, setContactGroup] = useState([]);

    const onUserSearch = (userName) => {
        if (userName) {
            const queryString = `?search=${userName}`
            fetchUsers(queryString);
            console.log(queryString);
        } else {
            console.log("User pas trouvé");
            fetchUsers('');
        }
    }
    const fetchUsers = async (queryString) => {
        try {
            const response = await api.get(`/users/${userInfo.id}/repertoire/contact_groups/${groupId}${queryString}`, {
                headers: { Authorization: userToken }
            });
            let allUsers = response.data.users;

            const user = allUsers.filter(item => item.type === 'user').map(user => ({
                id: user.id,
                first_name: user.attributes.first_name,
                last_name: user.attributes.last_name,
                avatar_url: user.attributes.avatar_url
            }))
            console.log("resultat",user);
            setUsers(user);
        } catch (e) {
            console.error(e);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await api.get(`/users/${userInfo.id}/repertoire/contact_groups/${groupId}`, {
                        headers: {
                            'Authorization': userToken
                        }
                    });
                    const contactGroup = response.data.contact_group.data.attributes;
                    setContactGroup(contactGroup)
                    
                    const users = response.data.users.map(user => user.attributes);
                    setUsers(users)
                }
            } catch(e) {
                console.error(e);
            }
        };
        fetchData();
    }, [userInfo.id, userToken, groupId])

    const deleteContactGroup = async () => {
        try {
            const response = await api.delete(`/users/${userInfo.id}/repertoire/contact_groups/${groupId}`, {
                headers: { Authorization: userToken }
            });
            showMessage({
                message: "Contact group deleted",
                type: "success",
                duration: 2000
            });
            
            navigation.navigate('Repertoire')
        } catch(e) {
            console.error(e);
            showMessage({
                message: "Problem deleting a group",
                type: "alert",
                duration: 2000
            });
        }
    }

    return (
        <>
            <Spinner/>
            <Header title={contactGroup.name}
                onBackPress={() => navigation.goBack()}
                showBackButton={true}
                showChatroom={!contactGroup || !contactGroup.deletable}
                onChatPress={() => navigation.navigate('ChatroomIndex', { userId: userInfo.id })}
                showDelete={contactGroup && contactGroup.deletable}
                onDeletePress={deleteContactGroup}>
                <UserSearch onUserSearch={onUserSearch} />
            </Header>
            <ScrollView>
                {users.map(user => (
                    <TouchableOpacity key={user.id} onPress={() => navigation.navigate("UserContactGroup", {userId: user.id, groupId: contactGroup.id})}>
                        <View style={s.contactGroup}>
                            <TxtInria>{user.first_name} {user.last_name}</TxtInria>
                            <Avatar uri={user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url} />
                        </View>
                        <View style={s.border}></View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    )
}


export default ContactGroupScreen;