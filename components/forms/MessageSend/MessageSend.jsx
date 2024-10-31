import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { s } from './MessageSend.style';
import { useState } from "react";
import { TextInput } from 'react-native-gesture-handler';

export const MessageSend = ({ onMessageSend }) => {
    const [message, setMessage] = useState('');

    const handleMessageSend = () => {
        if (message) {
            onMessageSend(message);
            setMessage('');
        }
    }

    return (
        <KeyboardAvoidingView 
            style={s.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={s.messagebar}>
                    <TextInput
                        style={s.input}
                        onChangeText={setMessage}
                        value={message}
                        placeholder="Aa"
                        onSubmitEditing={handleMessageSend}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};