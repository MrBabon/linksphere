import { s } from "./styles";
import { Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { TxtInria } from "../../components/TxtInria/TxtInria";
import { TxtJost, TxtJostBold } from "../../components/TxtJost/TxtJost";
import Spinner from "react-native-loading-spinner-overlay";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../../config/config";
import { format, parseISO } from 'date-fns';
import CalendarEvent from "../../assets/icons/CalendarEvent";
import MapPin from "../../assets/icons/MapPin";
import { EventSearch } from "../../components/forms/EventSearch/EventSearch";


const EventIndexScreen = ({ navigation }) => {
    const { userInfo, userToken } = useContext(AuthContext)
    const [events, setEvents] = useState([]);
    const [initialEvents, setInitialEvents] = useState([]);

    
    const handleOutsidePress = () => {
        if (visible) {
            setVisible(false);
        }
    };
    const onTitleSearch = (title) => {
        if (title) {
            const queryString = `?title=${encodeURIComponent(title)}`;
            fetchEvents(queryString);
        } else {
            console.log("Title is empty, resetting to initial events.");

            fetchEvents('');
        }
    };
    
    const fetchEvents = async (queryString) => {
        try {
            const response = await api.get(`/events${queryString}`, {
              headers: { Authorization: userToken }
            });
            let allEvents = [];
            for (const dateKey in response.data) {
                const dayEvents = response.data[dateKey].data;
                allEvents = [...allEvents, ...dayEvents.map(event => ({
                    ...event.attributes,
                    id: event.id,
                    month: format(parseISO(event.attributes.start_time), 'MMMM yyyy')
                }))];
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
    };  
    const handleSearch = async (query) => {
        console.log(query);
        let queryString = '';

            queryString = Object.keys(query)
                .filter(key => query[key]) // Filtrer les clés qui n'ont pas de valeur vide
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
                .join('&');
    
            if (queryString) {
                queryString = `?${queryString}`;
            }
        
        console.log(queryString);
        try {
            const response = await api.get(`/events${queryString}`, {
              headers: { Authorization: userToken }
            });
            let allEvents = [];
            for (const dateKey in response.data) {
                const dayEvents = response.data[dateKey].data;
                allEvents = [...allEvents, ...dayEvents.map(event => ({
                    ...event.attributes,
                    id: event.id,
                    month: format(parseISO(event.attributes.start_time), 'MMMM yyyy')
                }))];
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
                    <TouchableOpacity style={s.navContainer}>
                        <TxtJostBold style={s.nav_txt_active}>All Upcoming Events</TxtJostBold>
                        <View style={s.underline}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
                        <TxtJost style={s.nav_txt}>My Events</TxtJost>
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
                    const response = await api.get(`/events`, {
                        headers: {
                            'Authorization': userToken
                        }
                    }).then(response => {
                        let allEvents = [];
                        for (const dateKey in response.data) {
                            // Assuming each date key directly contains an object with 'data' that is an array of events
                            const dayEvents = response.data[dateKey].data;
                            allEvents = [...allEvents, ...dayEvents.map(event => ({
                                ...event.attributes,
                                id: event.id,
                                month: format(parseISO(event.attributes.start_time), 'MMMM yyyy')
                            }))];
                        }
                        const groupedEvents = allEvents.reduce((acc, event) => {
                            acc[event.month] = acc[event.month] || [];
                            acc[event.month].push(event);
                            return acc;
                        }, {});
                        setEvents(groupedEvents);
                        setInitialEvents(groupedEvents);
                    })
                }
            } catch (e) {
                console.log(e);
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
                                    <TouchableOpacity key={event.id} onPress={() => navigation.navigate('Event', { eventId: event.id })}>
                                        <View style={s.card}>
                                            <View style={s.cardImg}>
                                                <Image source={{ uri: event.logo_url }} style={s.logo} onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
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

export default EventIndexScreen;