// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useContext, useRef, useState } from 'react';
// import { AuthContext } from '../context/AuthContext.js';
// import { Easing } from "react-native";
// import  HomeScreen  from '../screens/Home/HomeScreen.jsx';
// import  LoginScreen  from "../screens/Login/LoginScreen.jsx";
// import  RegisterScreen  from "../screens/Register/RegisterScreen.jsx";
// import EventIndexScreen from "../screens/Events/EventIndex/EventIndexScreen.jsx";
// import EventShowScreen from "../screens/Events/EventShow/EventShowScreen.jsx";
// import ProfilScreen from "../screens/User/Profil/ProfilScreen.jsx";
// import SettingsScreen from "../screens/User/Settings/SettingsScreen.jsx";
// import RepertoireScreen from "../screens/User/Repertoire/RepertoireScreen.jsx";
// import EditScreen from "../screens/User/Edit/EditScreen.jsx"
// import ScanScreen from '../screens/User/Scan/ScanScreen.jsx';
// import SplashScreen from '../screens/SplashScreen.js';
// import Footer from "../components/Footer/Footer.jsx";
// import MyEventsScreen from '../screens/User/MyEvents/MyEventsScreen.jsx';
// import ExhibitorsScreen from '../screens/Events/ExhibitorsIndex/ExhibitorsScreen.jsx';
// import ProVisitorsScreen from '../screens/Events/ProVisitorsIndex/ProVisitorsScreen.jsx';
// import ExhibitorShowScreen from '../screens/Events/ExhibitorShow/ExhibitorShowScreen.jsx';
// import EntrepriseScreen from '../screens/Entreprises/EntrepriseScreen.jsx';
// import ProVisitorShowScreen from '../screens/Events/ProVisitorShow/ProVisitorShowScreen.jsx';
// import ContactGroupScreen from '../screens/User/ContactGroups/ContactGroupScreen.jsx';
// import UserContactGroupScreen from '../screens/User/UserContactGroup/UserContactGroupScreen.jsx';
// import ChatroomIndexScreen from '../screens/User/Chatroom/ChatroomIndex/ChatroomIndexScreen.jsx';
// import ChatroomShowScreen from '../screens/User/Chatroom/ChatroomShow/ChatroomShowScreen.jsx';
// import ShareScreen from '../screens/User/Share/ShareScreen.jsx';
// import EntrepriseContactScreen from '../screens/User/Repertoire/EntrepriseContact/EntrepriseContactScreen.jsx';
// import EntrepriseContactShowScreen from '../screens/User/EntrepriseContactShow/EntrepriseContactShow.jsx';

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//     const {userInfo, userToken, splashLoading} = useContext(AuthContext);
//     const [activePage, setActivePage] = useState('Home');
//     const navigationRef = useRef(null);

//     // Pour changer la couleur de l'icon footer
//     const onNavigationStateChange = () => {
//         const route = navigationRef.current?.getCurrentRoute();
//         setActivePage(route?.name);
//     }
//     // ----------------------------------------


//     return (
//         <>
//             <NavigationContainer ref={navigationRef} onStateChange={onNavigationStateChange}>
//                     <Stack.Navigator screenOptions={{
//                         headerShown: false,
//                         animationEnabled: true,
//                         transitionSpec: {
//                             open: {
//                                 animation: 'timing',
//                                 config: {
//                                     duration: 250, // Durée plus courte pour l'ouverture
//                                     easing: Easing.out(Easing.poly(4)), // Utilisation d'un easing personnalisé
//                                 },
//                             },
//                             close: {
//                                 animation: 'timing',
//                                 config: {
//                                     duration: 200, // Durée plus courte pour la fermeture
//                                     easing: Easing.out(Easing.poly(4)),
//                                 },
//                             },
//                         },}} >
//                         {splashLoading ? (
//                             <Stack.Screen name='Splash Screen' component={SplashScreen} />
//                         ) : 
//                         userToken ? (
//                             <>
//                                 <Stack.Screen name="Profil" component={ProfilScreen} />
//                                 <Stack.Screen name="Settings" component={SettingsScreen} />
//                                 <Stack.Screen name="Edit" component={EditScreen} />
//                                 <Stack.Screen name="Repertoire" component={RepertoireScreen} />
//                                 <Stack.Screen name="EntrepriseContact" component={EntrepriseContactScreen} />
//                                 <Stack.Screen name="EntrepriseContactShow" component={EntrepriseContactShowScreen} />
//                                 <Stack.Screen name="ContactGroup" component={ContactGroupScreen} />
//                                 <Stack.Screen name="UserContactGroup" component={UserContactGroupScreen} />
//                                 <Stack.Screen name="Share" component={ShareScreen}/>
//                                 <Stack.Screen name="ChatroomIndex" component={ChatroomIndexScreen}/>
//                                 <Stack.Screen name="ChatroomShow" component={ChatroomShowScreen}/>
//                                 <Stack.Screen name="Scan" component={ScanScreen} />
//                                 <Stack.Screen name="Events" component={EventIndexScreen} />
//                                 <Stack.Screen name="Event" component={EventShowScreen} />
//                                 <Stack.Screen name="Exhibitors" component={ExhibitorsScreen} />
//                                 <Stack.Screen name="Exhibitor" component={ExhibitorShowScreen} />
//                                 <Stack.Screen name="ProVisitors" component={ProVisitorsScreen} />
//                                 <Stack.Screen name="ProVisitor" component={ProVisitorShowScreen} />
//                                 <Stack.Screen name="MyEvents" component={MyEventsScreen} />
//                                 <Stack.Screen name="Entreprise" component={EntrepriseScreen} />
//                             </>
//                                 ) : (
//                             <>
//                                 <Stack.Screen name="Home" component={HomeScreen} />
//                                 <Stack.Screen name="Login" component={LoginScreen} />
//                                 <Stack.Screen name="Register" component={RegisterScreen} />
//                             </>
//                         )}
//                     </Stack.Navigator>   
//             </NavigationContainer>
//             {userToken ? (
//                 <Footer navigation={navigationRef.current} activePage={activePage} />

//             ) : (
//                 null
//             )}
//         </>
//     )
// };

// export default AppNavigator;