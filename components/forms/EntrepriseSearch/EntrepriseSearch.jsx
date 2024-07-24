import { s } from "./EntrepriseSearch.style";
import { useState } from "react"
import { Keyboard, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Search from "../../../assets/icons/Search";


export const EntrepriseSearch = ({ onEntrepriseSearch }) => {
    const [entrepriseName, setEntrepriseName] = useState('');

    const handleEntrepriseSearch = () => {
        if (entrepriseName) {
            onEntrepriseSearch(entrepriseName);
        } else {
            onEntrepriseSearch('');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={s.searchBar}>
                <Search/>
                <TextInput
                    style={s.input}
                    onChangeText={setEntrepriseName}
                    value={entrepriseName}
                    placeholder="Search Contact"
                    onSubmitEditing={handleEntrepriseSearch} />
            </View>
        </TouchableWithoutFeedback>
    )
}