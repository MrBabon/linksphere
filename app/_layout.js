import { Stack } from "expo-router";
import { Easing, StatusBar } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import FlashMessage from "react-native-flash-message";

export default function RootLayout() {

    return (
        <AuthProvider>
            <StatusBar backgroundColor="#1AC1B9" />
            <Stack screenOptions={{
                                headerShown: false,
                                animationEnabled: true,
                                transitionSpec: {
                                    open: {
                                        animation: 'timing',
                                        config: {
                                            duration: 250, // Durée plus courte pour l'ouverture
                                            easing: Easing.out(Easing.poly(4)), // Utilisation d'un easing personnalisé
                                        },
                                    },
                                    close: {
                                        animation: 'timing',
                                        config: {
                                            duration: 200, // Durée plus courte pour la fermeture
                                            easing: Easing.out(Easing.poly(4)),
                                        },
                                    },
                                },}}>
                <Stack.Screen name="index" />
            </Stack>
            <FlashMessage position="top" />
        </AuthProvider>
  );
}
