import { ScrollView, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header/Header";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/config";
import { useFocusEffect } from "@react-navigation/native";
import { TxtInria, TxtInriaBold, TxtInriaLight } from "../../components/TxtInria/TxtInria";
import { s } from "./styles";
import Avatar from "../../assets/icons/Avatar";
import { UserSearch } from "../../components/forms/UserSearch/UserSearch";
import { ModalShare } from "../../components/Modal/ModalShare/ModalShare";
import { TxtJostBold } from "../../components/TxtJost/TxtJost";


const ShareScreen = ({ route, navigation }) => {
    const { userShare } = route.params;
    const {userInfo, userToken, isLoading} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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
            const response = await api.get(`/users/${userInfo.id}/repertoire${queryString}`, {
                headers: { Authorization: userToken }
            });
            let allUsers = response.data.users;

            const users = allUsers.filter(item => item.type === 'user').map(user => ({
                id: user.id,
                first_name: user.attributes.first_name,
                last_name: user.attributes.last_name,
                avatar_url: user.attributes.avatar_url
            }));

            // Exclure l'utilisateur avec lequel vous partagez
            const filteredUsers = users.filter(user => String(user.id) !== String(userShare.id));

            setSearchedUsers(filteredUsers);
        
        } catch (e) {
            console.error(e);
        }
    }

    const fetchData = async () => {
        try {
            if (userInfo && userToken) {

                const response = await api.get(`/users/${userInfo.id}/repertoire`, {
                    headers: {
                        'Authorization': userToken
                    }
                });
                const included = response.data.repertoire.included;

                const users = included.filter(item => item.type === 'user').map(user => ({
                    ...user.attributes,
                }));

                setUsers(users);

            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [userInfo.id, userToken])
    );

    const renderUsers = (usersList) => {
        return usersList
            .filter(user => user.id !== userShare.id)
            .map(user => (
                <>
                    <TouchableOpacity key={`user-${user.id}`} onPress={() => setModalVisible(true)}>
                        <View style={s.contactGroup}>
                            <TxtInria>{user.first_name} {user.last_name}</TxtInria>
                            <Avatar uri={user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url} />
                        </View>
                        <View style={s.border}></View>
                    </TouchableOpacity>
                    <ModalShare isVisible={modalVisible} onClose={() => setModalVisible(false)}>
                        <TxtInria style={s.txt}>
                            You would like to share {userShare.first_name} {userShare.last_name}’s profil with your contact Billy Winters. 
                        </TxtInria>
                        <TxtInria style={s.txt}>
                            A notification will be sent à Rachel Monroe for confirmation.
                        </TxtInria>
                        <TouchableOpacity style={s.btnConfirm}>
                            <TxtJostBold style={s.send}>Send</TxtJostBold>
                        </TouchableOpacity>

                    </ModalShare>
                </>
            ));
    };

    return (
        <>
            <Header
                title={"Share with"}
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            >
                <View style={s.container}>
                    <View style={s.contactShare}>
                        <View>
                            <Avatar uri={userShare.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url}/>
                        </View>
                        <View style={s.info}>
                            <TxtInriaBold style={s.userName}>{userShare.first_name} {userShare.last_name}</TxtInriaBold>
                            <View style={s.detailTxt}>
                                <TxtInriaLight style={s.job}>{userShare.job ? userShare.job : "Job not specified"}</TxtInriaLight>
                                <TxtInriaLight style={s.industry}>{userShare.industry ? userShare.industry : "Industry not specified"}</TxtInriaLight>
                            </View>
                        </View>
                    </View>
                </View>
                <UserSearch onUserSearch={onUserSearch}/>
            </Header>
            <ScrollView>
                <View>
                    {searchedUsers.length > 0 ? renderUsers(searchedUsers) : renderUsers(users)}
                </View>
            </ScrollView>
        </>
    )
}

export default ShareScreen;