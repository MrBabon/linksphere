import { FlatList, Image, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import api from "../../../config/config";
import Header from "../../../components/Header/Header";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { s } from "./styles";

const ChatroomIndex = () => {
    const { userToken } = useContext(AuthContext);
    const [chatrooms, setChatrooms] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const router = useRouter();

    const fetchChatrooms = async () => {
        try {
            const response = await api.get("/chatrooms", {
                headers: { Authorization: userToken }
            });
            console.log("Chatrooms response:", response.data);
            
            setChatrooms(response.data.chatrooms.data);
            setFilteredUsers(response.data.users.data);
        } catch (error) {
            console.error("Failed to fetch chatrooms:", error);
        }
    }

    useEffect(() => {
        fetchChatrooms();  // Appel initial de la fonction pour récupérer les données
    }, [search]);


    const handleNavigateToChatroom = (chatroomId) => {
        // Navigue vers la page de détails de la chatroom avec Expo Router
        router.push(`/chatrooms/${chatroomId}`);
    };

    const renderChatroom = ({ item }) => {
        const lastMessage = item.messages[item.messages.length - 1];

        return (
            <TouchableOpacity onPress={() => handleNavigateToChatroom(item.id)}>
                <View style={s.chatroomContainer}>
                    <Image
                        source={{ uri: item.other_user.avatar_url || "https://example.com/default-avatar.png" }}
                        style={s.avatar}
                    />
                    <View style={s.chatroomDetails}>
                        <TxtInria style={s.chatroomName}>{item.other_user.full_name}</TxtInria>
                        <TxtInria style={s.chatroomJob}>{item.other_user.job}</TxtInria>
                        <TxtInria style={s.chatroomLastMessage}>
                            {lastMessage && lastMessage.user_id === currentUser.id ? "You: " : `${lastMessage.user.first_name}: `}
                            {lastMessage ? lastMessage.content : "No messages yet"}
                        </TxtInria>
                    </View>
                    <TxtInria style={s.messageDate}>
                        {lastMessage && new Date(lastMessage.created_at).toLocaleDateString()}
                    </TxtInria>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <Header title={"Chats"} />
                <TextInput
                    style={s.searchInput}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search Contacts"
                />
                <FlatList
                    data={filteredUsers}
                    renderItem={renderChatroom}
                    keyExtractor={(item) => item.id.toString()}
                />

        </>
    );
};

export default ChatroomIndex;