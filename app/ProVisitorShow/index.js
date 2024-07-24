import { s } from "./styles";
import { useContext, useEffect, useState } from "react";
import { TxtInria, TxtInriaBold, TxtInriaLight } from "../../components/TxtInria/TxtInria";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/config";
import Spinner from "react-native-loading-spinner-overlay";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ChevronLeft from "../../assets/icons/ChevronLeft";
import { TxtJost } from "../../components/TxtJost/TxtJost";
import Send from "../../assets/icons/Send";
import Avatar from "../../assets/icons/Avatar";
import Phone from "../../assets/icons/Phone";
import Mail from "../../assets/icons/Mail";
import Globe from "../../assets/icons/Globe";
import BlurredText from "../../components/BlurredText";
import Twitter from "../../assets/icons/Twitter";
import Linkedin from "../../assets/icons/Linkedin";
import Facebook from "../../assets/icons/Facebook";
import Instagram from "../../assets/icons/Instagram";

const ProVisitorShowScreen = ({ route, navigation }) => {
    const { userId } = route.params;
    const { userInfo, userToken, isLoading } = useContext(AuthContext);
    const [user, setUser] = useState({})


    const backButton = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft/>
        </TouchableOpacity>
    )
    const send = (
        <TouchableOpacity>
            <Send/>
        </TouchableOpacity>
    )
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {backButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Meet contacts</TxtJost>
                </View>
                {send}
            </View>
        </View>
    )
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await api.get(`/users/${userId}`, {
                        headers: { Authorization: userToken }
                    });
                    const data = response.data;
                    const userAttributes = data.user.data.attributes;

                    setUser(userAttributes);
                }
            } catch(e) {
                console.error('Error fetching user:', e);
            }
        }
        fetchData();
    }, [userId, userToken])
    return (
        <>
            <Spinner visible={isLoading} />
            {header}

            <ScrollView>
                <View style={s.container}>
                    <View style={s.avatar}>
                        <Avatar uri={user.avatar_url} />
                    </View>
                    <TxtInria style={s.name}>{user.first_name} {user.last_name}</TxtInria>
                    <View style={s.user_info}>
                            <View style={s.textContainer}>
                                <Phone color={"#7F95E4"} style={{ zIndex: 2}} />
                                <BlurredText text={user.phone} style={s.blurContainer} />
                                <TxtInria style={s.textflou}>{user.phone}</TxtInria>
                            </View>
                    </View>
                    <View style={s.user_info}>
                        <View style={s.textContainer}>
                            <Mail color={"#7F95E4"} style={{ zIndex: 2}} />
                            <BlurredText text={user.email} style={s.blurContainer} />
                            <TxtInria style={s.textflou}>{user.email}</TxtInria>
                        </View>
                    </View>
                    <View style={s.user_info}>
                        <Globe url={user.website} color={"#7F95E4"} />
                        <TxtInria style={s.info}>{user.website}</TxtInria>
                    </View>
                    <View style={s.social}>
                        <Twitter url={user.twitter} color="#FBD160"/>
                        <Linkedin url={user.linkedin} color="#FBD160"/>
                        <Facebook url={user.facebook} color="#FBD160"/>
                        <Instagram url={user.instagram} color="#FBD160" />
                    </View>
                </View>
                    <View style={s.border}></View>
                <View style={s.detail}>
                    <TxtInriaBold style={s.job}>{user.job ? user.job : "Job not specified"}</TxtInriaBold>
                    <TxtInriaLight style={s.industry}>{user.industry ? user.industry : "Industry not specified"}</TxtInriaLight>
                    <View style={s.company}>
                        {/* Rediriger vers l'entreprise en question */}
                        <TouchableOpacity>
                            <TxtInria style={s.at}>At <TxtInriaBold style={s.nameCompany}>DannaCode</TxtInriaBold></TxtInria>
                        </TouchableOpacity>
                    </View>
                    <TxtInria style={s.bio}>{user.biography}</TxtInria>
                </View>
            </ScrollView>
        </>
    )
}

export default ProVisitorShowScreen;