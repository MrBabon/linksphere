import { ActivityIndicator, View } from "react-native"

const SplashScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: "center", backgroundColor: "#1AC1B9"}}>
            <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
    );
};

export default SplashScreen;