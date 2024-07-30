import { s } from "./styles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../../../components/Header/Header";
import { TxtJost, TxtJostBold } from "../../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import { EntrepriseSearch } from "../../../components/forms/EntrepriseSearch/EntrepriseSearch";
import api from "../../../config/config";
import { TxtInria, TxtInriaItalic } from "../../../components/TxtInria/TxtInria";
import { useRouter } from "expo-router";

const EntrepriseContactScreen = () => {
    const {userInfo, userToken} = useContext(AuthContext);
    const [entreprises, setEntreprises] = useState([]);
    const [entreprisesSearch, setEntreprisesSearch] = useState([]);
    const router = useRouter();
    const onEntrepriseSearch = (entrepriseName) => {
        if (entrepriseName) {
            const queryString = `?search=${entrepriseName}`
            fetchEntreprises(queryString);
            console.log(queryString);
        } else {
            console.log("Entreprise pas trouvé");
            setEntreprisesSearch([]);
        }
    }

    const fetchEntreprises = async (queryString) => {
        try {
            const response = await api.get(`/users/${userInfo.id}/entreprise_contact${queryString}`, {
                headers: { Authorization: userToken }
            });
            let allEntreprises = response.data.entreprises.map(entreprise => entreprise.attributes);

            setEntreprisesSearch(allEntreprises);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchData = async () => {
        try {
            if (userInfo && userToken) {
                const response = await api.get(`/users/${userInfo.id}/entreprise_contact`, {
                    headers: {
                        'Authorization': userToken
                    }
                });
                const data = response.data.entreprises.map(entreprise => entreprise.attributes);
                setEntreprises(data);
                
            }
        } catch(e) {

        }
    }
    useEffect(() => {
        fetchData();
    }, [userInfo, userToken])

  return (
    <>
        <Spinner />
        <Header
            title={"Groups"}>
            <View>
                <View style={s.header_nav}>
                    <TouchableOpacity style={s.navContainer} onPress={() => router.navigate('Repertoire')}>
                        <TxtJost style={s.nav_txt_active}>My Cards</TxtJost>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.navContainer}>
                        <TxtJostBold style={s.nav_txt}>Entreprises</TxtJostBold>
                        <View style={s.underline}></View>
                    </TouchableOpacity>
                </View>
                <EntrepriseSearch onEntrepriseSearch={onEntrepriseSearch} />
            </View>
        </Header>
        <ScrollView>
            <View style={s.container}>
                {entreprisesSearch.length > 0 ? (
                    entreprisesSearch.map(entreprise => (
                        <View key={entreprise.id}>
                            <TouchableOpacity style={s.entreprise} onPress={() => router.push({pathname: "EntrepriseContactShow", params: {entrepriseId: entreprise.id}})}>
                                <View>
                                    <TxtInria>{entreprise.name}</TxtInria>
                                    <TxtInriaItalic>{entreprise.headline}</TxtInriaItalic>
                                </View>
                                <Image source={{ uri: entreprise.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                            </TouchableOpacity>
                            <View style={s.border}></View>
                        </View>
                    ))
                ) : (
                    entreprises.map(entreprise => (
                        <View key={entreprise.id}>
                            <TouchableOpacity style={s.entreprise} onPress={() => router.push({pathname: "EntrepriseContactShow", params: {entrepriseId: entreprise.id}})}>
                                <View>
                                    <TxtInria>{entreprise.name}</TxtInria>
                                    <TxtInriaItalic>{entreprise.headline}</TxtInriaItalic>
                                </View>
                                <Image source={{ uri: entreprise.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                            </TouchableOpacity>
                            <View style={s.border}></View>

                        </View>
                    ))
                )
                }
                
            </View>
        </ScrollView>
    </>
  );
}

export default EntrepriseContactScreen;