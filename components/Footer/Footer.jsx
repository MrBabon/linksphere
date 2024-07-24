import { TouchableOpacity, View } from "react-native";
import { s } from "./Footer.style";
import { TxtInria } from "../TxtInria/TxtInria";
import Calendar from "../../assets/icons/Calendar";
import List from "../../assets/icons/List";
import Profil from "../../assets/icons/Profil";
import QrCode from "../../assets/icons/QrCode";
import Envelope from "../../assets/icons/Envelope.js";
import { ImageBackground } from 'react-native';
import backgroundImage from '../../assets/images/Vector 13.png'

const Footer = ({ activePage, navigation }) => {
    
    return (
        <View style={s.footer}>
                <ImageBackground source={backgroundImage} style={s.background_img} imageStyle={s.img}>
                        <TouchableOpacity 
                                style={[activePage === 'Scan' ? s.activeBtn : s.btn, s.qrButton]}
                                onPress={() => {navigation.navigate('Scan')}}>
                            <QrCode color={activePage === 'Scan' ? '#FFFFFF' : '#3A3A3A'}/>
                            <TxtInria style={activePage === 'Scan' ? s.activeScan : s.txt}>Scan</TxtInria>
                        </TouchableOpacity>
                    <View style={s.footer_container}>
                        <TouchableOpacity 
                                style={activePage === 'Events' ? s.activeBtn : s.btn}
                                onPress={() => {navigation.navigate('Events')}}>
                            <Calendar color={activePage === 'Events' ? '#1AC1B9' : '#3A3A3A'}/>
                            <TxtInria style={activePage === 'Events' ? s.activeTxt : s.txt}>Events</TxtInria>
                        </TouchableOpacity>
                        <TouchableOpacity 
                                style={activePage === 'Profil' ? s.activeBtn : s.btn}
                                onPress={() => {navigation.navigate('Profil')}}>
                            <Profil color={activePage === 'Profil' ? '#1AC1B9' : '#3A3A3A'}/>
                            <TxtInria style={activePage === 'Profil' ? s.activeTxt : s.txt}>Profil</TxtInria>
                        </TouchableOpacity>
                        <View style={s.vide}></View>
                        <TouchableOpacity 
                                style={activePage === 'Repertoire' ? s.activeBtn : s.btn}
                                onPress={() => {navigation.navigate('Repertoire')}}>
                            <List  color={activePage === 'Repertoire' ? '#1AC1B9' : '#3A3A3A'} />
                            <TxtInria style={activePage === 'Repertoire' ? s.activeTxt : s.txt}>Directory</TxtInria>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={activePage === 'ChatroomIndex' ? s.activeBtn : s.btn}
                            onPress={() => {navigation.navigate('ChatroomIndex')}}>
                            <Envelope color={activePage === 'ChatroomIndex' ? '#1AC1B9' : '#3A3A3A'}/>
                            <TxtInria style={activePage === 'ChatroomIndex' ? s.activeTxt : s.txt}>Messages</TxtInria>
                        </TouchableOpacity>
                    </View>
            </ImageBackground>
        </View>
    )
}

export default Footer;