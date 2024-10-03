import { View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { useLocalSearchParams } from "expo-router";
import Header from "../../../components/Header/Header";
import { useEffect, useState } from "react";


const ChatroomShow = () => {
    const { chatroomId, userId } = useLocalSearchParams();
    const [chatroom, setChatroom] = useState(null);

    useEffect(() => {
        const fetchChatroom = async () => {
            try {
                const response = await api.get(`/chatrooms/${chatroomId}`);
                setChatroom(response.data.chatroom);
            } catch (error) {
                console.error("Erreur lors du chargement de la chatroom:", error);
            }
        };

        fetchChatroom();
    }, [chatroomId]);

    if (!chatroom) {
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
            />
            <TxtInria>Chatroom Show</TxtInria>
        </>
    )
}

export default ChatroomShow;