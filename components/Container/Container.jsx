import { s } from "./Container.style"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export function Container({children, style}){
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaProvider style={[s.provider, style]}>
                <SafeAreaView style={s.container}>{children}</SafeAreaView>
            </SafeAreaProvider>
        </TouchableWithoutFeedback>
    )
}