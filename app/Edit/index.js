import { s } from "./styles";
import * as ImagePicker from "expo-image-picker";
import { View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { TxtInria, TxtInriaBold } from "../../components/TxtInria/TxtInria";
import Settings from '../../assets/icons/Settings';
import ChevronLeft from "../../assets/icons/ChevronLeft";
import { TxtJost } from "../../components/TxtJost/TxtJost";
import { useContext, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import { AuthContext } from "../context/AuthContext";
import Avatar from "../../assets/icons/Avatar";
import { showMessage } from "react-native-flash-message";
import { useRouter } from "expo-router";


const EditScreen = () => {
    const {updateProfil, userInfo} = useContext(AuthContext);
    const [firstName, setFirstName] = useState(userInfo.first_name || '');
    const [lastName, setLastName] = useState(userInfo.last_name || '');
    const [phone, setPhone] = useState(userInfo.phone || '');
    const [email, setEmail] = useState(userInfo.email || '');
    const [job, setJob] = useState(userInfo.job || '');
    const [industry, setIndustry] = useState(userInfo.industry || '');
    // const [company, setCompany] = useState(null); // A METTRE PLUS TARD
    const [biography, setBiography] = useState(userInfo.biography || '');
    const [website, setWebsite] = useState(userInfo.website || '');
    const [linkedin, setLinkedin] = useState(userInfo.linkedin || '');
    const [instagram, setInstagram] = useState(userInfo.instagram || '');
    const [facebook, setFacebook] = useState(userInfo.facebook || '');
    const [twitter, setTwitter] = useState(userInfo.twitter || '');
    const [avatar, setAvatar] = useState(userInfo.avatar_url || '');
    const [previewUri, setPreviewUri] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(null);
    const router = useRouter();


    
    const settingButton = (
        <TouchableOpacity onPress={() => router.navigate('Settings')}>
            <Settings/>
        </TouchableOpacity>
    );
    const BackButton = (
        <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft/>
        </TouchableOpacity>
    );
    const header = (
        <View style={s.header}>
            {BackButton}
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>Edit Profil</TxtJost>
            </View>
            {settingButton}
        </View>
    )
    
    const handleUpdate = () => {
        if (!currentPassword) {
            showMessage({
                message: "Error password",
                description: "Current password is required to update your profile.",
                type: "warning",
                duration: 4000
            });
            return;
        } 
        updateProfil(firstName, lastName, phone, email, job, biography, website, linkedin, instagram, facebook, twitter, currentPassword, avatar)
        router.navigate('Profil')
    }
    
    async function pickImageAsync(){
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.9
        })
        if (result.canceled) {
            alert("Image picking cancelled")
        } else {
            const newAvatar = result.assets[0].uri;
            setAvatar([newAvatar])
            setPreviewUri(newAvatar);
            console.log("Picked image URI:", newAvatar);
        }
    }

    return (
        <>
        {header}
        <ScrollView>
            <View style={s.container}>
                <View style={s.card}>
                    <View style={s.container_avatar}>
                        <View style={s.avatar}>
                            <TouchableOpacity onPress={pickImageAsync}>
                                <Avatar uri={previewUri || avatar} style={s.avatar_url} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={s.wrapper}>
                        <TxtInria style={s.text_info}>Personnal informations</TxtInria>
                        <TxtInriaBold style={s.txt}>First Name</TxtInriaBold>
                        <TextInput
                            style={s.input} 
                            value={firstName}
                            onChangeText={setFirstName} />
                        <TxtInriaBold style={s.txt}>Last Name</TxtInriaBold>
                        <TextInput 
                            style={s.input} 
                            value={lastName}
                            onChangeText={setLastName} />
                        <TxtInriaBold style={s.txt}>Phone Number</TxtInriaBold>
                        <TextInput 
                            style={s.input} 
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="+33 6 12 34 56 78" />
                        <TxtInriaBold style={s.txt}>Email</TxtInriaBold>
                        <TextInput 
                        style={s.input} 
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none" />
                        <TxtInriaBold style={s.txt}>Job Title</TxtInriaBold>
                        <TextInput 
                            style={s.input} 
                            value={job}
                            onChangeText={setJob} />
                        <TxtInriaBold style={s.txt}>Industry</TxtInriaBold>
                        {/* <Picker style={s.picker} 
                                selectedValue={industry}
                                onValueChange={(itemValue, itemIndex) => setIndustry(itemValue)}>
                            <Picker.Item label="Agriculture" value="agriculture" />
                            <Picker.Item label="Art & Design" value="art_design" />
                            <Picker.Item label="Education" value="education" />
                            <Picker.Item label="Energy" value="energy" />
                            <Picker.Item label="Engineering" value="engineering" />
                            <Picker.Item label="Environment" value="environment" />
                            <Picker.Item label="Finance" value="finance" />
                            <Picker.Item label="Healthcare" value="health" />
                            <Picker.Item label="Human Resources" value="human_resources" />
                            <Picker.Item label="Manufacturing" value="manufacturing" />
                            <Picker.Item label="Media" value="media" />
                            <Picker.Item label="Professional Services" value="professional_services" />
                            <Picker.Item label="Public Administration" value="public_administration" />
                            <Picker.Item label="Real Estate" value="real_estate" />
                            <Picker.Item label="Retail" value="retail" />
                            <Picker.Item label="Science" value="science" />
                            <Picker.Item label="Technology" value="technology" />
                            <Picker.Item label="Telecommunications" value="telecommunications" />
                            <Picker.Item label="Tourism" value="tourism" />
                            <Picker.Item label="Transportation" value="transportation" />
                        </Picker> */}
                        <TxtInriaBold style={s.txt}>Biography</TxtInriaBold>
                        <TextInput
                            style={s.input_bio}
                            value={biography}
                            onChangeText={setBiography}
                            multiline
                            numberOfLines={8}/>
                        <TxtInria style={s.text_info}>Links</TxtInria>
                        <TxtInriaBold style={s.txt}>Website</TxtInriaBold>
                        <TextInput 
                            style={s.input} 
                            value={website}
                            onChangeText={setWebsite}
                            placeholder="www.my-site.com" />
                            <TxtInriaBold style={s.txt}>Linkedin</TxtInriaBold>
                        <TextInput 
                            style={s.input} 
                            value={linkedin}
                            onChangeText={setLinkedin} />
                            <TxtInriaBold style={s.txt}>Instagram</TxtInriaBold>
                        <TextInput 
                            style={s.input} 
                            value={instagram}
                            onChangeText={setInstagram}/>
                            <TxtInriaBold style={s.txt}>Facebook</TxtInriaBold>
                        <TextInput 
                            style={s.input} 
                            value={facebook}
                            onChangeText={setFacebook} />
                            <TxtInriaBold style={s.txt}>X</TxtInriaBold>
                        <TextInput 
                            style={s.input} 
                            value={twitter}
                            onChangeText={setTwitter} />
                        <TxtInriaBold style={s.txt}>Password</TxtInriaBold>
                        <TextInput 
                        style={s.input}
                        value={currentPassword}
                        onChangeText={setCurrentPassword} 
                        secureTextEntry />
                    </View>
                    <View style={s.btn}>
                        <TouchableOpacity style={s.log} onPress={handleUpdate}>
                            <TxtInriaBold style={s.logtxt}>Save</TxtInriaBold>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
        </>
    )
}

export default EditScreen;