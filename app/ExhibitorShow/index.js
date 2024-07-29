import { ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold, TxtInriaItalic } from "../../components/TxtInria/TxtInria";
import { s } from "./styles";
import ChevronLeft from "../../assets/icons/ChevronLeft";
import { TxtJost, TxtJostBold, TxtJostSemiBold } from "../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../../config/config";
import { Image } from "react-native";
import Instagram from "../../assets/icons/Instagram";
import Twitter from "../../assets/icons/Twitter";
import Linkedin from "../../assets/icons/Linkedin";
import Facebook from "../../assets/icons/Facebook";
import Globe from "../../assets/icons/Globe";
import ChevronRight from "../../assets/icons/ChevronRight";
import { ModalVisiblePro } from "../../components/Modal/ModalVisiblePro/ModalVisiblePro";
import Danger from "../../assets/icons/Danger";
import Checkbox from "expo-checkbox";
import { showMessage } from "react-native-flash-message";

const ExhibitorShowScreen = ({ route, navigation }) => {
    const { eventId, exhibitorId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    
    const [entreprise, setEntreprise] = useState({})
    const [isChecked, setIsChecked] = useState(false);
    const [participationId, setParticipationId] = useState(null);
    const [modalVisiblePro, setModalVisiblePro] = useState(false);



    // Header
    const backButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft />
        </TouchableOpacity>
    );
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {backButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Informations</TxtJost>
                </View>
            </View>
            <View style={s.header_nav}>
                <TouchableOpacity style={s.navContainer}>
                    <TxtJostBold style={s.nav_txt_active}>Exhibitors</TxtJostBold>
                    <View style={s.underline}></View>
                </TouchableOpacity>
                {!isChecked ? (
                    <TouchableOpacity  onPress={() => setModalVisiblePro(true)}>
                        <TxtJost>Professional Visitors</TxtJost>
                    </TouchableOpacity>

                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('ProVisitors', { eventId: eventId })}>
                        <TxtJost>Professional Visitors</TxtJost>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity>
                {/* Mettre une search bar pour chercher une entreprise */}
            </TouchableOpacity>
        </View>
    )

    const toggleCheckbox = async () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await api.get(`/events/${eventId}/exhibitors/${exhibitorId}`, {
                        headers: { Authorization: userToken }
                    });
                    const data = response.data;
                    const exhibitorData = data.entreprise.data.attributes;
                    const userParticipation = data.user_participation?.data;

                    setEntreprise(exhibitorData);

                    if (userParticipation) {
                        setIsChecked(userParticipation.attributes.visible_in_participants);
                        setParticipationId(userParticipation.id);
                    }
                    
                }
            } catch(e){
                console.error('Error fetching exhibitor:', e);
            }
        }
        fetchData();
    },[eventId, exhibitorId, userToken]);
    
    const updateParticipation = async () => {
        if (!isChecked) {
            showMessage({
                message: "The checkbox is not checked, update aborted.",
                type: "warning",
                duration: 4000
            });
            setModalVisiblePro(false)
            return; 
        }
        

        try {
            const payload = {
                visible_in_participants: isChecked
            };
            const response = await api.patch(`/events/${eventId}/participations/${participationId}`, payload, {
                headers: { Authorization: userToken }
            });
            if (response.status === 200) {
                showMessage({
                    message: "Participation update successfully",
                    type: "success",
                    duration: 4000
                });
            }
        } catch(e) {
            console.error('Error updating participation:', e);
            showMessage({
                message: "Error updating participation.",
                type: "danger",
                duration: 4000
            });
        }
        setModalVisiblePro(false)
    }

    return (
        <>
            <Spinner/>
            {header}
            <ScrollView>
                <View style={s.containerInfo}>
                    <Image source={{uri: entreprise.logo_url}}  style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                    <View>
                        <View style={s.containerSocial}>
                            <View style={s.viewIcon}>
                                <Twitter url={entreprise.twitter} color={"#FFFFFF"} />
                            </View>
                            <View style={s.viewIcon}>
                                <Linkedin url={entreprise.linkedin} color={"#FFFFFF"}  />
                            </View>
                            <View style={s.viewIcon}>
                                <Facebook url={entreprise.facebook} color={"#FFFFFF"} style={s.iconSocialF} />
                            </View>
                            <View style={s.viewIcon}>
                                <Instagram url={entreprise.instagram} color={"#FFFFFF"} style={s.iconSocialI} />
                            </View>
                        </View>
                        <View style={s.entrepriseInfo}>
                            <Globe url={entreprise.website} color="#FBD160" />
                            <TxtInriaBold style={s.website} >{entreprise.website}</TxtInriaBold>
                        </View>
                    </View>
                </View>
                <View style={s.container}>
                    <TxtJostBold style={s.name}>{entreprise.name}</TxtJostBold>
                    <TxtInria style={s.description}>{entreprise.description}</TxtInria>
                    <TouchableOpacity style={s.linkShow} onPress={() => navigation.navigate('Entreprise', {entrepriseId: entreprise.id})}>
                        <ChevronRight color="#F9447F"/>
                        <TxtJostSemiBold style={s.linkTxt}>View business page</TxtJostSemiBold>
                    </TouchableOpacity>
                </View>
                <View style={s.containerRepresentative}>
                    <TxtInriaBold style={s.titleRepresentatives}>Representatives</TxtInriaBold>
                    <TxtInria>ICI METTRE PHOTO EMPLOYEE + ENTREPRENEURS</TxtInria>
                </View>
            </ScrollView>
            <ModalVisiblePro isVisible={modalVisiblePro} onClose={() => setModalVisiblePro(false)}>
                <View>
                    <Danger/>
                </View>

                <View>
                    <TxtInria style={s.infoNotAccess}>You do not have access to the room list .</TxtInria>
                </View>
                <TouchableOpacity style={s.checkboxView}
                    onPress={toggleCheckbox}
                    activeOpacity={0.7}>
                    <Checkbox 
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? "#FBD160" : undefined}
                        style={s.checkbox} />
                    <TxtInriaItalic style={{marginLeft: 10, color: "#FFFFFF", fontSize: 14}}>I accept to appear in the list of people present at the event. If you check this box, you will also have access to the list of registered people.</TxtInriaItalic>
                </TouchableOpacity>
                <View style={s.viewBtn}>
                    <TouchableOpacity style={s.btnConfirm} onPress={updateParticipation}>
                        <TxtJostBold style={s.btntxt}>Confirm</TxtJostBold>
                    </TouchableOpacity>
                </View>
            </ModalVisiblePro>
        </>
    )
}


export default ExhibitorShowScreen;