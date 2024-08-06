import { s } from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
import api, { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { TxtJost } from "../../components/TxtJost/TxtJost";
import { TxtInria, TxtInriaBold, TxtInriaLight } from "../../components/TxtInria/TxtInria";
import { View, TouchableOpacity, ScrollView } from "react-native";
import Settings from '../../assets/icons/Settings';
import Avatar from "../../assets/icons/Avatar";
import Phone from "../../assets/icons/Phone";
import Mail from "../../assets/icons/Mail";
import Globe from "../../assets/icons/Globe";
import Twitter from "../../assets/icons/Twitter";
import Instagram from "../../assets/icons/Instagram";
import Linkedin from "../../assets/icons/Linkedin";
import Facebook from "../../assets/icons/Facebook";
import { Link, useRouter } from "expo-router";


const Profil = () => {
    const {userInfo, userToken, isLoading, splashLoading} = useContext(AuthContext);
    const [avatar, setAvatar] = useState(null);
    const router = useRouter();


    const settingButton = (
        <Link href={"/Settings"} asChild>
            <TouchableOpacity>
                <Settings/>
            </TouchableOpacity>
        </Link>
    );

    const header = (
        
        <View style={s.header}>
            {settingButton}
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>Your Account</TxtJost>
            </View>
        </View>
    );


    useEffect(() => {
        if (!userToken || splashLoading) {
            console.log("Either userToken, userInfo is missing, or splashLoading is true. Aborting fetch.");
            return;
        }

        
        const fetchData = async () => {
            try {
                if (userInfo && userToken) { 
                    console.log('Fetching user info...');
                             
                    const response = await api.get(`/users/${userInfo.id}/profil`, {
                        headers: {
                            'Authorization': `${userToken}`
                        }
                    });
                    setAvatar(response.userInfo.avatar_url);
                } else {
                    console.error('No user info available');
                }
            } catch (error) {
                
            }
        };
        
        fetchData();
    }, [userInfo, userToken, splashLoading]);
    
    if (!userInfo) {
        router.replace('/Home');
        return null;
    }



    return (
        <>
            <Spinner visible={isLoading} />
            {header} 
            <ScrollView>
                <View style={s.container_avatar}>
                    <View style={s.avatar}>
                        <Avatar uri={userInfo.avatar_url} />
                    </View>
                </View>
                <View style={s.container}>
                    <TxtInria style={s.user_name}>{userInfo.first_name} {userInfo.last_name}</TxtInria>
                    <View style={s.user_info}>
                        <Phone />
                        <TxtInria style={s.info}>{userInfo.phone}</TxtInria>
                    </View>
                    <View style={s.user_info}>
                        <Mail />
                        <TxtInria style={s.info}>{userInfo.email}</TxtInria>
                    </View>
                    <View style={s.user_info}>
                        <Globe url={userInfo.website} />
                        <TxtInria style={s.info}>{userInfo.website}</TxtInria>
                    </View>
                </View>
                <View style={s.social}>
                    <Twitter  url={userInfo.twitter} color="#FBD160" />
                    <Linkedin url={userInfo.linkedin} color="#FBD160" />
                    <Facebook url={userInfo.facebook} color="#FBD160" />
                    <Instagram url={userInfo.instagram} color="#FBD160" />
                </View>
                <View style={s.yellow}></View>
                <View style={s.detail}>
                    <TxtInriaBold style={s.job}>{userInfo.job}</TxtInriaBold>
                    <TxtInriaLight style={s.industry}>{userInfo.industry}</TxtInriaLight>
                    <TxtInria style={s.entreprise}>Nom de l'entreprise</TxtInria>
                    <TxtInria style={s.bio}>{userInfo.biography}</TxtInria>
                </View>
            </ScrollView>
            
        </>
    )
};

export default Profil;