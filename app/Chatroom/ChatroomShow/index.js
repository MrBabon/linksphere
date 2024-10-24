import { ScrollView, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { useLocalSearchParams } from "expo-router";
import Header from "../../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/config";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../../../assets/icons/Avatar";


const ChatroomShow = () => {
    const { userToken, userInfo } = useContext(AuthContext);
    const { chatroomId } = useLocalSearchParams();
    const [chatroom, setChatroom] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    console.log("chatroomId reçu :", chatroomId);

    useEffect(() => {
        const fetchChatroom = async () => {
            try {
                const response = await api.get(`users/${userInfo.id}/chatrooms/${chatroomId}`, {
                    headers: { Authorization: userToken }
                });
                const otherUsers = response.data.included.find(user => user.id !== userInfo.id.toString());

                console.log("Other user:", otherUsers);
                
                setChatroom(response.data.data.relationships.messages);
                setOtherUser(otherUsers);
            } catch (error) {
                console.error("Erreur lors du chargement de la chatroom:", error);
            }
        };

        fetchChatroom();
    }, [chatroomId, userToken, userInfo]);

    
    
    if (!chatroom || !otherUser) {
        return (
            <View>
                <TxtInria>Loading...</TxtInria>
            </View>
        );
    }
    return (
        <>
            <Header
                title={"Chats"}
            >
               <View>
                    <Avatar uri={otherUser.attributes.avatar_url} />
                    <TxtInria>{otherUser.attributes.first_name} {otherUser.attributes.last_name}</TxtInria>
                    <TxtInria>{otherUser.attributes.job || "Job not specified"}</TxtInria>
                </View>  
            </Header>
            <ScrollView>

            </ScrollView>
        </>
    )
}

export default ChatroomShow;