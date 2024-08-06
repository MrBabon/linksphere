import { s } from "./styles";
import { EventSearch } from "../../components/forms/EventSearch/EventSearch"
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, View, Image } from "react-native";
import { TxtInria } from "../../components/TxtInria/TxtInria";
import { TxtJost, TxtJostBold, TxtJostSemiBold } from "../../components/TxtJost/TxtJost";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import api from "../../config/config";
import { format, parseISO } from "date-fns";
import  MapPin from "../../assets/icons/MapPin"
import CalendarEvent from "../../assets/icons/CalendarEvent"
import { useRouter } from "expo-router";

const MyEventsScreen = () => {
    const { userInfo, userToken } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [initialEvents, setInitialEvents] = useState([]);
    const router = useRouter();


    const handleOutsidePress = () => {
        if (visible) {
            setVisible(false);
        }
    };

    const onTitleSearch = (title) => {
        if (title) {
            const queryString = `?title=${encodeURIComponent(title)}`;
            fetchMyEvents(queryString);
        } else {
            fetchMyEvents('');
        }
    };

    const fetchMyEvents = async (queryString) => {
        try {
            const response = await api.get(`/users/${userInfo.id}/my_events${queryString}`, {
              headers: { Authorization: userToken }
            });
            const eventsData = response.data.events;

                const allEvents = [];

                for (const monthKey in eventsData) {
                    // Obtenir le tableau d'événements pour chaque mois
                    const eventsInMonth = eventsData[monthKey];
                    if (Array.isArray(eventsInMonth)) {
                        allEvents.push(...eventsInMonth.map(event => ({
                            ...event.data.attributes,
                            id: event.data.id,
                            month: format(parseISO(event.data.attributes.start_time), 'MMMM yyyy')
                        })));
                    } else {
                        console.warn(`La clé ${monthKey} ne contient pas un tableau d'événements :`, eventsInMonth);
                    }
                }
            const groupedEvents = allEvents.reduce((acc, event) => {
                acc[event.month] = acc[event.month] || [];
                acc[event.month].push(event);
                return acc;
            }, {});
            setEvents(groupedEvents);
        } catch (error) {
            console.error("Failed to fetch events by title:", error);
        }
    }

    const handleSearch = async (query) => {
        let queryString = '';

            queryString = Object.keys(query)
                .filter(key => query[key]) // Filtrer les clés qui n'ont pas de valeur vide
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
                .join('&');
    
            if (queryString) {
                queryString = `?${queryString}`;
            }
        
        try {
            const response = await api.get(`/users/${userInfo.id}/my_events${queryString}`, {
              headers: { Authorization: userToken }
            });
            const eventsData = response.data.events;

                const allEvents = [];

                for (const monthKey in eventsData) {
                    // Obtenir le tableau d'événements pour chaque mois
                    const eventsInMonth = eventsData[monthKey];
                    if (Array.isArray(eventsInMonth)) {
                        allEvents.push(...eventsInMonth.map(event => ({
                            ...event.data.attributes,
                            id: event.data.id,
                            month: format(parseISO(event.data.attributes.start_time), 'MMMM yyyy')
                        })));
                    } else {
                        console.warn(`La clé ${monthKey} ne contient pas un tableau d'événements :`, eventsInMonth);
                    }
                }
            const groupedEvents = allEvents.reduce((acc, event) => {
                acc[event.month] = acc[event.month] || [];
                acc[event.month].push(event);
                return acc;
            }, {});
            setEvents(groupedEvents); // Assumez que la réponse contient les événements filtrés
        } catch (error) {
        console.error("Failed to fetch events:", error);
        }
    }

    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Events</TxtJost>
                </View>
            </View>
            <View>
                <View style={s.header_nav}>
                    <TouchableOpacity  onPress={() => router.navigate('EventIndex')}>
                        <TxtJost style={s.nav_txt}>All Upcoming Events</TxtJost>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.navContainer} onPress={() => router.navigate('MyEvents')}>
                        <TxtJostBold style={s.nav_txt_active}>My Events</TxtJostBold>
                        <View style={s.underline}></View>
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback onPress={handleOutsidePress} accessible={false}>
                    <EventSearch onSearch={handleSearch} onTitleSearch={onTitleSearch} setEvents={setInitialEvents}/>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await api.get(`/users/${userInfo.id}/my_events`, {
                        headers: {
                            'Authorization': userToken
                        }
                    })
                const eventsData = response.data.events;

                const allEvents = [];

                for (const monthKey in eventsData) {
                    // Obtenir le tableau d'événements pour chaque mois
                    const eventsInMonth = eventsData[monthKey];
                    if (Array.isArray(eventsInMonth)) {
                        allEvents.push(...eventsInMonth.map(event => ({
                            ...event.data.attributes,
                            id: event.data.id,
                            month: format(parseISO(event.data.attributes.start_time), 'MMMM yyyy')
                        })));
                    } else {
                        console.warn(`La clé ${monthKey} ne contient pas un tableau d'événements :`, eventsInMonth);
                    }
                }

                // Grouper les événements par mois
                const groupedEvents = allEvents.reduce((acc, event) => {
                    acc[event.month] = acc[event.month] || [];
                    acc[event.month].push(event);
                    return acc;
                }, {});

                setEvents(groupedEvents);
                setInitialEvents(groupedEvents);
            }
        } catch (e) {
            console.error('Erreur lors de la récupération des événements:', e);
        }
        };
        fetchData();
    }, [userInfo, userToken])

    return (
        <>
            <Spinner/>
            {header}
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={s.container}>
                        {Object.entries(events).map(([month, eventsOfMonth]) => (
                            <React.Fragment key={month}>
                                <TxtInria style={s.monthHeader}>{month}</TxtInria>
                                {eventsOfMonth.map(event => (
                                    <TouchableOpacity key={event.id} onPress={() => router.push({pathname: `/EventShow`, params: { id: event.id}})} >
                                        <View style={s.card}>
                                            <View style={s.cardTitle}>
                                                <TxtJostBold style={s.txtTitle}>{event.title}</TxtJostBold>
                                            </View>
                                            <View style={s.cardContainer}>
                                                <View style={s.cardImg}>
                                                    <Image source={{ uri: event.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}/>
                                                </View>
                                                <View style={s.infoContainer}>
                                                    <View style={s.cardInfo}>
                                                        <MapPin />
                                                        <TxtInria style={s.cardInfoTxt}>{event.city}, {event.country}</TxtInria>
                                                    </View>
                                                    <View style={s.cardInfo}>
                                                        <CalendarEvent />
                                                        <TxtInria style={s.cardInfoTxt}>{format(parseISO(event.start_time), 'MMMM d')} to {format(parseISO(event.end_time), 'd')}</TxtInria>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={s.btn} onPress={() => router.push({pathname:'ExhibitorsIndex', params: { id: event.id }})}>
                                                <TxtJostSemiBold style={s.btnTxt}>Exhibitors & Visitors listing</TxtJostSemiBold>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={s.border}></View>
                                    </TouchableOpacity>
                                ))}
                            </React.Fragment>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}


export default MyEventsScreen