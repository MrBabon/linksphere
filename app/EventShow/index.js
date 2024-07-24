import { s } from "./styles.js";
import { useContext, useEffect, useState } from "react";
import api from "../../config/config.js";
import { AuthContext } from "../../context/AuthContext.js";
import { TxtInria, TxtInriaBold, TxtInriaItalic } from "../../components/TxtInria/TxtInria.jsx";
import { Image, ScrollView, TextInput, TouchableOpacity, View, Linking } from "react-native";
import { showMessage } from "react-native-flash-message";
import { TxtJost, TxtJostBold, TxtJostSemiBold } from "../../components/TxtJost/TxtJost.jsx";
import CalendarEvent from "../../assets/icons/CalendarEvent.js";
import MapPin from "../../assets/icons/MapPin.js";
import { format, parseISO } from "date-fns";
import Globe from "../../assets/icons/Globe.js";
import ChevronLeft from "../../assets/icons/ChevronLeft.js";
import Danger from "../../assets/icons/Danger.js";
import { ModalEvent } from "../../components/Modal/ModalEvent/ModalEvent.jsx";
import Checkbox from 'expo-checkbox';
import { ModalDelete } from "../../components/Modal/ModalDelete/ModalDelete.jsx";
import { ModalVisiblePro } from "../../components/Modal/ModalVisiblePro/ModalVisiblePro.jsx"


const EventShowScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const { userInfo, userToken } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalVisiblePro, setModalVisiblePro] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [participationId, setParticipationId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [registrationCode, setRegistrationCode] = useState('');


    const openURL = () => {

        const url = 'https://www.cannesticket.com/fr/activites/festival-international-des-jeux';

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        }).catch(err => console.error('An error occured', err));
    }


    useEffect(() => {

        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${eventId}`, {
                    headers: { Authorization: userToken }
                });
                const data = response.data.data
                const event = data.attributes
                setEvent(event);

                // Utilisation directe des données de l'API
                const isUserRegistered = event.is_registered;
                setIsRegistered(isUserRegistered);
                const isUserChecked = event.is_visible_in_participants;
                setIsChecked(isUserChecked);
                const participationId = event.participation_id;
                if (participationId) {
                    setParticipationId(participationId);
                }

            } catch (e) {
                console.error('Failed to fetch event details: ', e);
            }
        };
        fetchEvent();

    }, [eventId, userToken]);

    if (!event) {
        return <TxtInria>Loading...</TxtInria>;
    }
    
    // Création participation
    const handleParticipation = async () => {
        try {
            const payload = {
                visible_in_participants: isChecked,
                registration_code: registrationCode
            };
            const response = await api.post(`/events/${eventId}/participations`, payload, {
                headers: { Authorization: userToken }
            });
            if (response.status === 201 && response.data && response.data.data) {
                const newParticipationId = response.data.data.id;
                setParticipationId(newParticipationId);

                
                showMessage({
                    message: "Participation recorded successfully",
                    type: "success",
                    duration: 4000
                });

                setIsRegistered(true);
                
            } else {
                console.error('Failed to record participation');
            }
            setModalVisible(false)
        } catch (e) {
            console.error('Error submitting participation:', e);
            setModalVisible(false)
        }
    };

    const toggleCheckbox = async () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        
    };
    
    const handleTextChange = (text) => setRegistrationCode(text.toUpperCase());

    // Suppression participation
    const destroyParticipation = async () => {
        try {
            const response = await api.delete(`/events/${eventId}/participations/${participationId}`, {
                headers: { Authorization: userToken }
            });
    
            if (response.status === 200) {
                showMessage({
                    message: "Participation deleted successfully",
                    type: "success",
                    duration: 4000
                });
    
                setIsRegistered(false);
                setModalVisible(false);
                setParticipationId(null)
                setModalDeleteVisible(false)
            } else {
                console.error('Failed to delete participation');
                setModalDeleteVisible(false)
            }
        } catch (e) {
            console.error('Error deleting participation:', e);
            setModalDeleteVisible(false)
        }
    }

    // Update participation
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

    // Header
    const backButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    )
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {backButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Events</TxtJost>
                </View>
            </View>
            <View>
                <View style={s.header_nav}>
                    {!isRegistered ? (
                        <>
                            <TouchableOpacity style={s.navContainer} onPress={() => navigation.navigate('Events')}>
                                <TxtJostBold style={s.nav_txt_active}>All Upcoming Events</TxtJostBold>
                                <View style={s.underline}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
                                <TxtJost style={s.nav_txt}>My Events</TxtJost>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity  onPress={() => navigation.navigate('Events')}>
                                <TxtJost style={s.nav_txt}>All Upcoming Events</TxtJost>
                            </TouchableOpacity>
                            <TouchableOpacity  style={s.navContainer} onPress={() => navigation.navigate('MyEvents')}>
                                <TxtJostBold style={s.nav_txt_active}>My Events</TxtJostBold>
                                <View style={s.underline}></View>
                            </TouchableOpacity>
                        </>
                    )}
                    
                </View>
            </View>
        </View>
    )

    return (
        <>
            {header}
            <View>
                <ScrollView>
                    <View style={s.card}>
                        <View style={s.cardImg}>
                            <Image source={{ uri: event.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}/>
                        </View>
                        <View style={s.cardTitle}>
                            <TxtJostBold>{event.title}</TxtJostBold>
                        </View>
                        <View style={s.infoContainer}>
                            <View style={s.cardInfo}>
                                <MapPin />
                                <TxtInria>{event.city}, {event.country}</TxtInria>
                            </View>
                            <View style={s.cardInfo}>
                                <CalendarEvent />
                                <TxtInria>{format(parseISO(event.start_time), 'MMMM d')} to {format(parseISO(event.end_time), 'd')}</TxtInria>
                            </View>
                        </View>
                        <View style={s.cardLink}>
                            <Globe />
                            <TxtInriaBold style={s.txtLink}>{event.link}</TxtInriaBold>
                        </View>
                        <View style={s.cardDescription}>
                            <TxtInria style={s.txtdescription}>{event.description}</TxtInria>
                        </View>
                    </View>
                    {!isRegistered ? (
                        <View style={s.viewbtn}>
                                <TouchableOpacity style={s.btn} onPress={() => setModalVisible(true)}>
                                    <TxtJostSemiBold style={s.txtbtn}>Register</TxtJostSemiBold>
                                </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={s.containerBtn}>
                            <View style={s.viewBtnParticipation}>
                                <TouchableOpacity 
                                        style={s.btnParticipation}
                                        onPress={() => navigation.navigate('Exhibitors', { eventId: eventId })}>
                                    <TxtJost style={s.btnTxtParticipation}>Exhibitors</TxtJost>
                                </TouchableOpacity>
                                {!isChecked ? (
                                    <>
                                        <TouchableOpacity 
                                            style={s.btnParticipation}
                                            onPress={() => setModalVisiblePro(true)}>
                                            <TxtJost style={s.btnTxtParticipation}>Professional visitors</TxtJost>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity 
                                            style={s.btnParticipation} 
                                            onPress={() => navigation.navigate('ProVisitors', { eventId: eventId })}>
                                            <TxtJost style={s.btnTxtParticipation}>Professional visitors</TxtJost>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                            <View style={s.viewUnsubscribe}>
                                <TxtInriaItalic style={s.txtItalic}>You can no longer participate in this event?</TxtInriaItalic>
                                <TouchableOpacity onPress={() => setModalDeleteVisible(true)}>
                                    <TxtJostSemiBold style={s.btnUnsubscribe}>Unsubscribe</TxtJostSemiBold>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )}
                </ScrollView>
                <ModalEvent isVisible={modalVisible} onClose={() => setModalVisible(false)}>   
                    <Image source={{ uri: event.logo_url }} style={s.logoModal} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}/>
                    <TxtInriaBold style={s.confirmModal}>Please confirm you attendance at the {event.title}</TxtInriaBold>
                    <View style={s.infoContainer}>
                        <View style={s.cardInfo}>
                            <MapPin color="#F9447F" />
                            <TxtInriaBold style={s.txtinfo}>{event.city}, {event.country}</TxtInriaBold>
                        </View>
                        <View style={s.cardInfo}>
                            <CalendarEvent color="#F9447F" />
                            <TxtInriaBold style={s.txtinfo}>{format(parseISO(event.start_time), 'MMMM d')} to {format(parseISO(event.end_time), 'd')}</TxtInriaBold>
                        </View>
                    </View>
                    <View style={s.wraper}>
                        <TextInput
                            style={s.input}
                            placeholder="REGISTRATION CODE"
                            placeholderTextColor="#ccc"
                            onChangeText={handleTextChange} />
                    </View>
                    <View style={s.infoAcces}>
                        <TxtInriaItalic style={s.infoTxt}>Your DigiCard registration code is provided to you in the confirmation email with your badge/ticket which gives you access to the event.</TxtInriaItalic>
                        <TxtInriaItalic style={s.infoQuestion}>Don’t have your badge yet ?</TxtInriaItalic>
                        <View style={s.link}>
                            <TxtInriaItalic style={s.infoTxt}>Get it here: </TxtInriaItalic>
                            <TouchableOpacity onPress={openURL}>
                                <TxtInriaItalic style={s.linkTxt}>{event.link}</TxtInriaItalic>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={s.ligne}></View>
                    <TouchableOpacity style={s.checkboxView}
                        onPress={toggleCheckbox}
                        activeOpacity={0.7}>
                        <Checkbox 
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? "#FBD160" : undefined}
                            style={s.checkbox} />
                        <TxtInriaItalic style={{marginLeft: 10, color: "#FFFFFF"}}>I accept to appear in the list of people present at the event. If you check this box, you will also have access to the list of registered people.</TxtInriaItalic>
                    </TouchableOpacity>
                    <View style={s.viewBtn}>
                        <TouchableOpacity style={s.btnConfirm} onPress={handleParticipation}>
                            <TxtJostBold style={s.btntxt}>Confirm</TxtJostBold>
                        </TouchableOpacity>
                    </View>
                </ModalEvent>
                <ModalDelete visible={modalDeleteVisible} onConfirm={destroyParticipation} onCancel={() => setModalDeleteVisible(false)}>Please, confirm your unsubscription</ModalDelete>
                <ModalVisiblePro isVisible={modalVisiblePro} onClose={() => setModalVisiblePro(false)}>
                    <View>
                        <Danger/>
                    </View>

                        <View>
                            <TxtInria style={s.infoNotAccess}>You do not have access to the room list {event.title}.</TxtInria>
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
            </View>
        </>
    )
}

export default EventShowScreen