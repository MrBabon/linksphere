import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { TxtInria, TxtInriaBold, TxtInriaItalic } from "../../components/TxtInria/TxtInria";
import { s } from "./styles";
import ChevronLeft from "../../assets/icons/ChevronLeft";
import { TxtJost, TxtJostBold } from "../../components/TxtJost/TxtJost";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../../config/config";
import Spinner from "react-native-loading-spinner-overlay";
import { ModalVisiblePro } from "../../components/Modal/ModalVisiblePro/ModalVisiblePro";
import Danger from "../../assets/icons/Danger";
import Checkbox from "expo-checkbox";
import { showMessage } from "react-native-flash-message";
import { useLocalSearchParams, useRouter } from "expo-router";

const ExhibitorsScreen = () => {
    const { id } = useLocalSearchParams();
    const { userInfo, userToken } = useContext(AuthContext);
    const [exhibitors, setExhibitors] = useState([]);
    const [events, setEvents] = useState([]);
    const [participationId, setParticipationId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [modalVisiblePro, setModalVisiblePro] = useState(false);
    const router = useRouter();


    // Header
    const backButton = (
        <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft />
        </TouchableOpacity>
    );
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {backButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Meet contacts</TxtJost>
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
                    <TouchableOpacity onPress={() => router.navigate('ProVisitors', { eventId: id })}>
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
                    const response = await api.get(`/events/${id}/exposant`, {
                        headers: { Authorization: userToken }
                    });
                    const data = response.data;
    
    
                    const exhibitors = data.included.filter(item => item.type === "exhibitor").map(exhibitor => {
                        const entrepriseData = data.included.find(entreprise => entreprise.id === exhibitor.relationships?.entreprise?.data?.id && entreprise.type === "entreprise");
                        if (!entrepriseData) {
                            return null;
                        }
                        return {
                            id: exhibitor.id,
                            entrepriseId: entrepriseData.id,
                            name: entrepriseData.attributes?.name,
                            headline: entrepriseData.attributes?.headline,
                            industry: entrepriseData.attributes?.industry,
                            logo_url: entrepriseData.attributes?.logo_url,
                        };
                    }).filter(exhibitor => exhibitor !== null);
    
                    const event = data.data;
                    const participation = data.included.find(item => item.type === "participation"  && item.attributes.user_id === userInfo.id);
    
    
                    setIsChecked(participation?.attributes?.visible_in_participants || false);
                    setParticipationId(participation?.id);
                    setExhibitors(exhibitors);
                    setEvents(event);
                }
    
            } catch (e) {
                console.error('Error fetching exhibitors:', e);
            }
        };
        fetchData();
    }, [id, userToken]);

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
            const response = await api.patch(`/events/${id}/participations/${participationId}`, payload, {
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
                {exhibitors.map(exhibitor => (
                        <View key={exhibitor.id}>
                            <TouchableOpacity style={s.card} onPress={() => router.navigate('Exhibitor', { eventId: id, exhibitorId: exhibitor.id })}>
                                <View style={s.cardImg}>
                                    <Image source={{ uri: exhibitor.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
                                </View>
                                <View style={s.containerInfo}>
                                    <TxtInriaBold style={s.name}>{exhibitor.name}</TxtInriaBold>
                                    <TxtInria style={s.headline}>{exhibitor.headline}</TxtInria>
                                    <TxtInria style={s.industry}>{exhibitor.industry}</TxtInria>
                                </View>
                                <View style={s.standView}>
                                    <TxtInriaBold style={s.stand}>Stand 04.09</TxtInriaBold>
                                </View>
                            </TouchableOpacity>
                            <View style={s.border}></View>
                        </View>
                ))}
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

export default ExhibitorsScreen;