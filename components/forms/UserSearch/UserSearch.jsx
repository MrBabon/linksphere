import { s } from "./UserSearch.style";
import { useState } from "react"
import { Keyboard, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Search from "../../../assets/icons/Search";


export const UserSearch = ({ onUserSearch }) => {
    const [userName, setUserName] = useState('');

    const handleUserSearch = () => {
        if (userName) {
            onUserSearch(userName);
        } else {
            onUserSearch('');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={s.searchBar}>
                <Search/>
                <TextInput
                    style={s.input}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder="Search Contact"
                    onSubmitEditing={handleUserSearch} />
            </View>
        </TouchableWithoutFeedback>
    )
}