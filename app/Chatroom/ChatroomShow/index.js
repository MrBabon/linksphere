import { View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { useLocalSearchParams } from "expo-router";
import Header from "../../../components/Header/Header";


const ChatroomShow = () => {
    const { userId } = useLocalSearchParams();
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