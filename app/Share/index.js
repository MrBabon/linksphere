import { ScrollView, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header/Header";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../../config/config";
import { useFocusEffect } from "@react-navigation/native";
import { TxtInria, TxtInriaBold, TxtInriaLight } from "../../components/TxtInria/TxtInria";
import { s } from "./styles";
import Avatar from "../../assets/icons/Avatar";
import { UserSearch } from "../../components/forms/UserSearch/UserSearch";
import { ModalShare } from "../../components/Modal/ModalShare/ModalShare";
import { TxtJostBold } from "../../components/TxtJost/TxtJost";
import { useLocalSearchParams, useRouter } from "expo-router";


const ShareScreen = () => {
    const { userShare } = useLocalSearchParams();
    const {userInfo, userToken, isLoading} = useContext(AuthContext);
    const [userPartage, setUserPartage] = useState({});
    const [users, setUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const router = useRouter();

    // Traitement de userShare
    useEffect(() => {
        if (typeof userShare === 'string') {
            const parsedUser = JSON.parse(userShare);
            setUserPartage(parsedUser);
            console.log("First Name:", parsedUser.first_name);
        } else {
            setUserPartage(userShare);
            console.log("First Name:", userShare.first_name);
        }
    }, [userShare]);

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
            const filteredUsers = users.filter(user => String(user.id) !== String(userPartage.id));

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
                    id: user.id,
                    first_name: user.attributes.first_name,
                    last_name: user.attributes.last_name,
                    avatar_url: user.attributes.avatar_url,
                }));

                // Filtrer l'utilisateur à partager
                const filteredUsers = users.filter(u => String(u.id) !== String(userPartage.id));

                setUsers(filteredUsers);

            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [userInfo.id, userToken, userPartage])
    );

    // Fonction de gestion du modal
    const openModal = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedUser(null);
    };

    const renderUsers = (usersList) => {
        return usersList.map(user => (
            <View key={`user-${user.id}`}>
                <TouchableOpacity onPress={() => openModal(user)}>
                    <View style={s.contactGroup}>
                        <TxtInria>{user.first_name} {user.last_name}</TxtInria>
                        <Avatar uri={user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url} />
                    </View>
                    <View style={s.border}></View>
                </TouchableOpacity>
            </View>
        ));
    };


    return (
        <>
            <Header
                title={"Share with"}
                showBackButton={true}
                onBackPress={() => router.back()}
            >
                <View style={s.container}>
                    <View style={s.contactShare}>
                        <View>
                            <Avatar uri={userPartage.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url}/>
                        </View>
                        <View style={s.info}>
                            <TxtInriaBold style={s.userName}>{userPartage.first_name} {userPartage.last_name}</TxtInriaBold>
                            <View style={s.detailTxt}>
                                <TxtInriaLight style={s.job}>{userPartage.job ? userPartage.job : "Job not specified"}</TxtInriaLight>
                                <TxtInriaLight style={s.industry}>{userPartage.industry ? userPartage.industry : "Industry not specified"}</TxtInriaLight>
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
            {selectedUser && (
                <ModalShare 
                    isVisible={modalVisible} 
                    onClose={closeModal}
                >
                    <TxtInria style={s.txt}>
                        You would like to share {userPartage.first_name} {userPartage.last_name}’s profile with your contact {selectedUser.first_name} {selectedUser.last_name}.
                    </TxtInria>
                    <TxtInria style={s.txt}>
                        A notification will be sent à {userPartage.first_name} {userPartage.last_name} for confirmation.
                    </TxtInria>
                    <TouchableOpacity style={s.btnConfirm}>
                        <TxtJostBold style={s.send}>Send</TxtJostBold>
                    </TouchableOpacity>
                </ModalShare>
            )}
        </>
    )
}

export default ShareScreen;