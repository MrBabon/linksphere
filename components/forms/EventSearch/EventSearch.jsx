import { useContext, useState } from "react"
import { Button, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { s } from "./EventSearch.style";
import { TxtInria, TxtInriaBold } from "../../TxtInria/TxtInria";
import Filter from "../../../assets/icons/Filter"
import Search from "../../../assets/icons/Search";
import * as Animatable from 'react-native-animatable';


export const EventSearch = ({ onSearch, onTitleSearch }) => {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [industry, setIndustry] = useState('');
    const [title, setTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const toggleFilters = () => setVisible(!visible);

    const handleOutsidePress = () => {
        if (visible) {
            setVisible(false);
        }
    };

    const handleTitleSearch = () => {
        if (title) {
            onTitleSearch(title);
        }  else {
            onTitleSearch('');
        }
    };


    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress} accessible={false}>
            <View style={s.container}>
                <View style={s.searchBar}>
                    <Search/>
                    <TextInput
                        style={s.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Search Event"
                        onSubmitEditing={handleTitleSearch}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={toggleFilters} >
                        <Filter/>
                    </TouchableOpacity>
                </View>
                <Animatable.View 
                    style={s.filters}
                    animation={visible ? 'fadeInDown' : 'fadeOutUp'}
                    duration={300}
                >
                {visible && (
                    <>
                        
                        <TextInput
                            style={s.inputFilter}
                            onChangeText={setCountry}
                            value={country}
                            placeholder="Select Country"
                        />
                        <TextInput
                            style={s.inputFilter}
                            onChangeText={setRegion}
                            value={region}
                            placeholder="Select State"
                        />
                        <TextInput
                            style={s.inputFilter}
                            onChangeText={setCity}
                            value={city}
                            placeholder="Select City"
                        />
                        <TextInput
                            style={s.inputFilter}
                            onChangeText={setIndustry}
                            value={industry}
                            placeholder="Select industry"
                        />
                        <TouchableOpacity onPress={() => onSearch({ searchQuery, country, city, region, industry })} style={s.btn}>
                            <TxtInriaBold style={s.txtbtn}>Search</TxtInriaBold>
                        </TouchableOpacity>
                    </>
                )}
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
}