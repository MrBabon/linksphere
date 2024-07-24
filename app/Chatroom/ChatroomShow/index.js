import { View } from "react-native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";


const ChatroomShow = ({ route, navigation }) => {
    const { userId } = route.params
    return (
        <View>
            <TxtInria>Chatroom Show</TxtInria>
        </View>
    )
}

export default ChatroomShow;