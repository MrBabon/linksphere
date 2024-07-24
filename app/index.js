import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import  InriaLight from "../assets/fonts/Inria/InriaSans-Light.ttf";
import  InriaSansRegular from "../assets/fonts/Inria/InriaSans-Regular.ttf";
import  InriaItalic from "../assets/fonts/Inria/InriaSans-Italic.ttf";
import  InriaBold from "../assets/fonts/Inria/InriaSans-Bold.ttf";
import  Jost from "../assets/fonts/Jost/Jost-Regular.ttf";
import  JostSemiBold from "../assets/fonts/Jost/Jost-SemiBold.ttf";
import  JostBold from "../assets/fonts/Jost/Jost-Bold.ttf";


function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#1AC1B9" }}>
      <ActivityIndicator size="large" color="#FBD160" />
    </View>
  );
}

function Main() {
  const { userToken, splashLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!splashLoading) {
      if (userToken) {
        router.replace("/Profil");
      } else {
        router.replace("/Home");
      }
    }
  }, [userToken, splashLoading]);

  return null; // ou retourne un composant vide si la redirection est en cours
}

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [isFontLoaded] = useFonts({
    "InriaLight": InriaLight,
    "InriaSansRegular": InriaSansRegular,
    "InriaItalic": InriaItalic,
    "Inria-bold": InriaBold,
    "Jost": Jost,
    "Jost-semibold": JostSemiBold,
    "Jost-bold": JostBold,
  });
  
  useEffect(() => {
    // Initialiser le contexte ici avant de rendre Main
    async function initialize() {
      // Simuler un délai pour le chargement initial (ex. 2 secondes)
      await new Promise(resolve => setTimeout(resolve, 350));
      setIsReady(true);
    }

    initialize();
  }, []);

  if (!isReady || !isFontLoaded) {
    return <LoadingScreen />;
  }
  return (
    <>
        <Main />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="Register" />
          <Stack.Screen name="Profil" />
          <Stack.Screen name="Settings" />
        </Stack>
    </>
  );
}
