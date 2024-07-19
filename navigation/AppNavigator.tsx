import { AuthContext } from '@/context/AuthContext';
import HomeScreen from '@/screens/Home/HomeScreen';
import SplashScreen from '@/screens/SplashScreen';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useState } from 'react';
import { Easing } from 'react-native';

type RootStackParamList = {
    'Splash Screen': undefined;
    Profil: undefined;
    Settings: undefined;
    Edit: undefined;
    Repertoire: undefined;
    EntrepriseContact: undefined;
    EntrepriseContactShow: undefined;
    ContactGroup: undefined;
    UserContactGroup: undefined;
    Share: undefined;
    ChatroomIndex: undefined;
    ChatroomShow: undefined;
    Scan: undefined;
    Events: undefined;
    Event: undefined;
    Exhibitors: undefined;
    Exhibitor: undefined;
    ProVisitors: undefined;
    ProVisitor: undefined;
    MyEvents: undefined;
    Entreprise: undefined;
    Home: undefined;
    Login: undefined;
    Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { userInfo, userToken, splashLoading } = useContext(AuthContext);
    const [activePage, setActivePage] = useState<string>('Home');
    const navigationRef = useNavigationContainerRef();

    const onNavigationStateChange = () => {
        const route = navigationRef.getCurrentRoute();
        setActivePage(route?.name || 'Home');
    }
    
    return (
        <>
            <NavigationContainer ref={navigationRef} onStateChange={onNavigationStateChange}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animationEnabled: true,
                        transitionSpec: {
                        open: {
                            animation: 'timing',
                            config: {
                            duration: 250,
                            easing: Easing.out(Easing.poly(4)),
                            },
                        },
                        close: {
                            animation: 'timing',
                            config: {
                            duration: 200,
                            easing: Easing.out(Easing.poly(4)),
                            },
                        },
                        },
                    }}
                >
                    {splashLoading ? (
                        <Stack.Screen name="Splash Screen" component={SplashScreen} />
                    ) : userToken ? (
                        <>
                            {/* <Stack.Screen name="Profil" component={ProfilScreen} /> */}

                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            {/* <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen name="Register" component={RegisterScreen} /> */}
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            {/* {userToken && <Footer navigation={navigationRef} activePage={activePage}/>} */}
        </>

    )
};

export default AppNavigator;
