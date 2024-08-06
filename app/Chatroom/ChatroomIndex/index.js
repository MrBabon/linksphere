import { ScrollView, View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import Header from "../../../components/Header/Header";

const ChatroomIndex = ({ navigation }) => {
    return (
        <>
            <Header
                title={"Chats"}
                />
            <ScrollView>
                <TxtInria>Chatroom Index</TxtInria>
            </ScrollView>
        </>
    )
}

export default ChatroomIndex;