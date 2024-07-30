import { TouchableOpacity, View, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import api from "../../config/config.js";
import { TxtInria } from "../../components/TxtInria/TxtInria.jsx";
import { s } from "./styles.js";
import ChevronLeft from "../../assets/icons/ChevronLeft.js";
import { TxtJost, TxtJostBold } from "../../components/TxtJost/TxtJost.jsx";
import Spinner from "react-native-loading-spinner-overlay";
import Avatar from "../../assets/icons/Avatar.js"
import { useLocalSearchParams, useRouter } from "expo-router";

const ProVisitorsScreen = () => {
    const { id } = useLocalSearchParams();
    const { userInfo, userToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
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
                <TouchableOpacity onPress={() => router.push({pathname: `/ExhibitorsIndex`, params: { id: id}})}>
                    <TxtJost>Exhibitors</TxtJost>
                </TouchableOpacity>
                <TouchableOpacity style={s.navContainer} onPress={() => router.push({pathname: `/ProVisitorsIndex`, params: { id: id}})}>
                    <TxtJostBold style={s.nav_txt_active}>Professional Visitors</TxtJostBold>
                    <View style={s.underline}></View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                {/* Mettre une search bar pour chercher un user */}
            </TouchableOpacity>
        </View>
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await api.get(`/events/${id}/visitor`, {
                        headers: { Authorization: userToken }
                    });

                    const data = response.data;
                    const visibleParticipants = data.participations.data || [];
                    const includedUsers = data.participations.included || [];

                    // Associez les utilisateurs aux participations
                    const participantsWithUserDetails = visibleParticipants.map(participation => {
                        const user = includedUsers.find(inc => inc.type === "user" && inc.id === participation.relationships.user.data.id);
                        return {
                            ...participation,
                            user: user ? user.attributes : {},
                            userId: user ? user.id : null
                        };
                    });

                    setUsers(participantsWithUserDetails);
                }
            } catch (e) {
                console.error('Error fetching exhibitors:', e);
            }
        }
        fetchData();
    }, [id, userToken]);
    return (
        <>
            <Spinner/>
            {header}
            <ScrollView>
                {users.map(user => (
                    <View key={user.id}>
                        <TouchableOpacity style={s.card} onPress={() => router.navigate({pathname:'ProVisitorShow', params: { userId: user.userId }})}>
                            <View style={s.containerInfo}>
                                <TxtInria>{user.user.first_name} {user.user.last_name}</TxtInria>
                                <TxtInria style={s.job}>{user.user.job ? user.user.job : "Job not specified"}</TxtInria>
                                <TxtInria style={s.industry}>{user.user.industry ? user.user.industry : "Industry not specified"}</TxtInria>
                            </View>
                            <View style={s.cardAvatar}>
                                <Avatar uri={user.user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url} />
                            </View>
                        </TouchableOpacity>
                        <View style={s.border}></View>
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

export default ProVisitorsScreen;