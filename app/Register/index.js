import { s } from "./styles";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from "../context/AuthContext";
import { showMessage } from "react-native-flash-message";
import ChevronLeft from "../../assets/icons/ChevronLeft";
import { TxtJost, TxtJostSemiBold } from "../../components/TxtJost/TxtJost";
import { Container } from "../../components/Container/Container";
import { TxtInria, TxtInriaBold } from "../../components/TxtInria/TxtInria";
import { Link, useRouter } from "expo-router";


const RegisterScreen = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const {isLoading, register, errorMessage} = useContext(AuthContext);
    const router = useRouter();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            showMessage({
                message: "Password Mismatch",
                description: "The passwords you entered do not match.",
                type: "warning",
                duration: 4000
            });
            return;
        }
        register(firstName, lastName, phone, email, password, confirmPassword);
        
    }

    const backButton = (

        <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft/>
        </TouchableOpacity>

    
    )
    const header = (    
        <View style={s.header}>
            {backButton}
            <View style={s.header_texts}>
                <TxtJost style={s.txtheader}>Sign up</TxtJost>
            </View>
        </View>
    );

    return (
        <>
            {header}
            <Container>
                <ScrollView>
                    <View style={s.container}>
                        <Spinner visible={isLoading} />
                        <View style={s.logo}>
                            <TxtJostSemiBold style={s.logotxt}>LinkSphere</TxtJostSemiBold>
                        </View>
                        <View style={s.wrapper}>
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
                            <TxtInriaBold style={s.txt}>Email</TxtInriaBold>
                            <TextInput 
                                style={s.input} 
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"/>
                            <TxtInriaBold style={s.txt}>Phone Number</TxtInriaBold>
                            <TextInput 
                                style={s.input} 
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                placeholder="+33 6 12 34 56 78" />
                            <TxtInriaBold style={s.txt}>Password</TxtInriaBold>
                            <TextInput 
                                style={s.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry />
                            <TxtInriaBold style={s.txt}>Confirm Password</TxtInriaBold>
                            <TextInput 
                                style={s.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry />
                            
                        </View>
                        <View>
                            <TouchableOpacity style={s.log} onPress={handleRegister}>
                                <TxtInriaBold style={s.logtxt}>Login</TxtInriaBold>
                            </TouchableOpacity>
                        </View>
                        {errorMessage ? <Text style={s.error}>{errorMessage}</Text> : null}
                        <View style={{flexDirection: "row", marginTop: 20}}>
                            <TxtInria>Already have an account? </TxtInria>
                            <Link href={"/Login"} asChild>
                                <TouchableOpacity>
                                    <TxtInria style={s.link}>Login</TxtInria>
                                </TouchableOpacity>
                            </Link>
                        </View> 
                    </View>
                </ScrollView>
            </Container>
        </>

    )
}

export default RegisterScreen;