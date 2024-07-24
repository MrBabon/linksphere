import { s } from "./styles";
import { useContext, useEffect, useState } from "react";
import api from "../../config/config";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "../../components/Header/Header";
import { Image, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaLight } from "../../components/TxtInria/TxtInria";
import { TxtJostBold } from "../../components/TxtJost/TxtJost";
import { ModalContactEntreprise } from "../../components/Modal/ModalContactEntreprise/ModalContactEntreprise";

const EntrepriseContactShowScreen = ({ route, navigation }) => {
    const { entrepriseId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [entreprise, setEntreprise] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
    const [eventDropdownVisible, setEventDropdownVisible] = useState(false);


    const categories = [
        { label: "Our products and/or Services", value: "products_services" },
        { label: "Our job offers", value: "job_offers" },
        { label: "Partnership", value: "partnership" }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await api.get(`/entreprises/${entrepriseId}`, {
                        headers: { Authorization: userToken }
                    });
                    const data = response.data.data
                    const entreprise = data.attributes
                    setEntreprise(entreprise)
                }
            } catch(e) {

            }
        }
        fetchData();
    }, [entrepriseId, userToken])

    const handleSubmit = async () => {
        try {
            const response = await api.post(`/entreprises/${entrepriseId}/contact_entreprises`, {
                contact_entreprise: {
                    category,
                    message,
                }
            }, {
                headers: { Authorization: userToken }
            });
            console.log(response.data)
            setModalVisible(false);
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <>
            <Spinner/>
            <Header
                title="Entreprise"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
                >
                <View style={s.viewBanner}>
                    <Image source={{uri: entreprise.banner_url}} style={s.banner}  onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                    <View style={s.standView}>
                            <TouchableOpacity style={s.btnsend} onPress={() => setModalVisible(true)}>
                                <TxtInria style={s.send}>Send us your details</TxtInria>
                            </TouchableOpacity>
                    </View>
                </View>
            </Header>
            <ScrollView>
                <View style={s.container}>
                    <TxtJostBold style={s.name}>{entreprise.name}</TxtJostBold>
                    <TxtInria style={s.headline}>{entreprise.headline}</TxtInria>
                    <TxtInriaLight style={s.industry}>{entreprise.industry}</TxtInriaLight>
                    <View style={s.containerDetail}>
                        <TxtInria>{entreprise.description}</TxtInria>
                    </View>
                </View>

            </ScrollView>
            <ModalContactEntreprise 
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}>
                    <View style={s.infoEntreprise}>
                        <TxtJostBold style={s.infoName}>{entreprise.name}</TxtJostBold>
                        <TxtInria style={s.infoHeadline}>{entreprise.headline}</TxtInria>
                    </View>
                    <View style={s.viewQuestion}>
                        <TxtInria style={s.question}>What are you interested in ?</TxtInria>
                        <TouchableOpacity style={s.dropdown} onPress={() => setCategoryDropdownVisible(!categoryDropdownVisible)}>
                            <TxtInria style={s.dropdownText}>{category ? categories.find(c => c.value === category).label : "Select"}</TxtInria>
                        </TouchableOpacity>
                        {categoryDropdownVisible && (
                            <View style={s.dropdownList}>
                                {categories.map((item) => (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={s.dropdownItem}
                                        onPress={() => {
                                            setCategory(item.value);
                                            setCategoryDropdownVisible(false);
                                        }}>
                                        <TxtInria style={s.dropdownItemText}>{item.label}</TxtInria>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                    <View style={s.viewQuestion}>
                        <TxtInria style={s.question}>Where did we meet?</TxtInria>
                        <TouchableOpacity style={s.dropdown} onPress={() => setEventDropdownVisible(!eventDropdownVisible)}>
                            <TxtInria style={s.dropdownText}>Select</TxtInria>
                        </TouchableOpacity>
                        {eventDropdownVisible && (
                            <View style={s.dropdownList}>
                                {categories.map((item) => (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={s.dropdownItem}
                                        onPress={() => {
                                            setCategory(item.value);
                                            setEventDropdownVisible(false);
                                        }}>
                                        <TxtInria style={s.dropdownItemText}>{item.label}</TxtInria>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                    <View>
                        <TextInput
                            style={s.input}
                            multiline
                            numberOfLines={4}
                            placeholder="Your message"
                            value={message}
                            onChangeText={(text) => setMessage(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSubmit}>
                        <TxtInria>Submit</TxtInria>
                    </TouchableOpacity>
            </ModalContactEntreprise>
        </>
    )
}


export default EntrepriseContactShowScreen;