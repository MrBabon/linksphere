import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";
import AppNavigator from "@/navigation/AppNavigator";
import { AuthProvider } from "@/context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";


import { Text, View, StatusBar } from "react-native";

export default function App() {
  const [isFontLoaded] = useFonts({
    'InriaLight': require('../assets/fonts/Inria/InriaSans-Light.ttf'),
    'InriaSansRegular': require('../assets/fonts/Inria/InriaSans-Regular.ttf'),
    'InriaItalic': require('../assets/fonts/Inria/InriaSans-Italic.ttf'),
    'InriaBold': require('../assets/fonts/Inria/InriaSans-Bold.ttf'),
    'Jost': require('../assets/fonts/Jost/Jost-Regular.ttf'),
    'JostSemiBold': require('../assets/fonts/Jost/Jost-SemiBold.ttf'),
    'JostBold': require('../assets/fonts/Jost/Jost-Bold.ttf'),
  });

  if (!isFontLoaded) {
    return <Spinner />;
  }
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#1AC1B9" />
      <AppNavigator />
      <FlashMessage position="top" />
    </AuthProvider>
  );
}
