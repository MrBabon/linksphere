import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { TxtInria, TxtInriaBold } from "../../../components/TxtInria/TxtInria";
import { useLocalSearchParams } from "expo-router";
import Header from "../../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/config";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../../../assets/icons/Avatar";
import { s } from "./styles";
import { MessageSend } from "../../../components/forms/MessageSend/MessageSend";
import { GestureHandlerRootView } from "react-native-gesture-handler";


const ChatroomShow = () => {
    const { userToken, userInfo } = useContext(AuthContext);
    const { chatroomId } = useLocalSearchParams();
    const [chatroom, setChatroom] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const FOOTER_HEIGHT = 190;

    useEffect(() => {
        const fetchChatroom = async () => {
            try {
                const response = await api.get(`users/${userInfo.id}/chatrooms/${chatroomId}`, {
                    headers: { Authorization: userToken }
                });
                const otherUsers = response.data.included.find(user => user.id !== userInfo.id.toString());
                
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
        <GestureHandlerRootView>
            <Header
                title={"Chats"}
            >
               <View style={s.chatroomContainer}>
                    <Avatar style={s.avatar_url} svgStyle={s.avatar_url} uri={otherUser.attributes.avatar_url} />
                    <View style={s.chatroomDetails}>
                        <TxtInriaBold style={s.chatroomName}>{otherUser.attributes.first_name} {otherUser.attributes.last_name}</TxtInriaBold>
                        <TxtInria style={s.chatroomJob}>{otherUser.attributes.job || "Job not specified"}</TxtInria>
                    </View>
                </View>  
            </Header>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={FOOTER_HEIGHT}
            >
                <ScrollView>

                </ScrollView>
                <View style={s.inputContainer}>
                    <MessageSend/>
                </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    )
}

export default ChatroomShow;