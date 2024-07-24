import { StyleSheet } from "react-native";


export const s = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalView: {
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#7F95E4"
    },

    button: {
        backgroundColor: '#FBD160',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },

    buttonText: {
        color: '#7F95E4',
    },

    chevron: {
        position: 'absolute',
        width: "100%",
        top: 20,
        left: 16,
    },
});