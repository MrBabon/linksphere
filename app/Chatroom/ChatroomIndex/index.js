import { FlatList, Image, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import api from "../../../config/config";
import Header from "../../../components/Header/Header";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { s } from "./styles";
import Avatar from "../../../assets/icons/Avatar";
import Spinner from "react-native-loading-spinner-overlay";
import { UserSearch } from "../../../components/forms/UserSearch/UserSearch";

const ChatroomIndex = () => {
    const { userToken, userInfo } = useContext(AuthContext);
    const [chatrooms, setChatrooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [lastMessages, setLastMessages] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const router = useRouter();
    

    const fetchChatrooms = async (searchQuery = "") => {
        try {
            const response = await api.get(`users/${userInfo.id}/chatrooms`, {
                headers: { Authorization: userToken },
                params: { search: searchQuery },
            });
            console.log("Chatrooms response:", response.data.chatrooms.data);
            
            const chatrooms = response.data.chatrooms.data.map(chatroom => {
                const otherUser = chatroom.attributes.other_user; // Accéder à l'autre utilisateur
    
                console.log("Other user in chatroom:", otherUser); // Affiche les détails de l'autre utilisateur
                
                const messages = chatroom.relationships.messages.data;
                const lastMessage = messages.length > 0 ? messages[0].attributes.content : "Pas de message";

                // Tronquer le dernier message à 15 caractères
                const truncatedMessage = lastMessage.length > 15 ? lastMessage.substring(0, 15) + "..." : lastMessage;
                if (otherUser) {
                    console.log("Other user in chatroom:", otherUser);
                    return {
                        id: chatroom.id,
                        otherUserFirstName: otherUser.first_name,
                        otherUserLastName: otherUser.last_name,
                        otherUserAvatar: otherUser.avatar_url,
                        otherUserJob: otherUser.job,
                        truncatedMessage: truncatedMessage,
                        lastMessage: chatroom.relationships.messages.data.length > 0
                            ? chatroom.relationships.messages.data[0].attributes.content
                            : "Pas de message",
                        updatedAt: chatroom.attributes.updated_at
                    };
                } else {
                    console.warn("Other user is the current user, skipping.");
                    return null;
                }
            }).filter(chatroom => chatroom !== null);
            const users = response.data.users.data;

            setChatrooms(chatrooms); // Mettre à jour les chatrooms avec les infos de l'autre utilisateur
            setFilteredUsers(users); // Mettre à jour les utilisateurs filtrés si nécessaire
        } catch (error) {
            console.error("Failed to fetch chatrooms:", error);
        }
    }

    useEffect(() => {
        fetchChatrooms(search);  // Appel initial de la fonction pour récupérer les données
    }, [search]);


    const handleSearchChange = (searchTerm) => {
        setSearch(searchTerm);
    };
   

    return (
        <>
            <Spinner/>
            <Header title={"Chats"}>
                <UserSearch onUserSearch={handleSearchChange}/>
            </Header>
            <ScrollView style={s.container}>
                <View>
                    {chatrooms.length === 0 ? (
                        // Si aucune chatroom n'est disponible, afficher un message
                        <TxtInria style={s.noChatMessage}>Aucune conversation active pour le moment.</TxtInria>
                    ) : (
                        chatrooms.map(chatroom => (
                            <TouchableOpacity key={chatroom.id} onPress={() => router.navigate({ pathname: "Chatroom/ChatroomShow", params: { chatroomId: chatroom.id, user: chatroom.otherUser }})}> 
                                <View style={s.chatroomContainer}>
                                    {/* Avatar de l'autre utilisateur */}
                                    <Avatar style={s.avatar_url} svgStyle={s.avatar_url} uri={chatroom.otherUserAvatar} />

                                    <View style={s.chatroomDetails}>
                                        <TxtInria style={s.chatroomName}>
                                            {`${chatroom.otherUserFirstName || "Unknown"} ${chatroom.otherUserLastName || "User"}`}
                                        </TxtInria>
                                        <TxtInria style={s.chatroomJob}>{chatroom.otherUserJob || "Job not specified"}</TxtInria>
                                        <TxtInria style={s.chatroomLastMessage}>
                                            {/* Ajoute ici le contenu du dernier message si disponible */}
                                            {chatroom.truncatedMessage}
                                        </TxtInria>
                                    </View>
                                    <TxtInria style={s.messageDate}>
                                        {/* Ajoute ici la date du dernier message */}
                                        {chatroom.lastMessages}
                                    </TxtInria>
                                </View>
                                <View style={s.border}></View>
                            </TouchableOpacity>

                        ))
                        
                                
                            
                    )}
                </View>
            </ScrollView>  

        </>
    );
};

export default ChatroomIndex;