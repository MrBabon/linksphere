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
        backgroundColor: '#FBD160',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        position: 'relative', // Assurez-vous que cette vue est positionnée relativement
    },
    chevron: {
        position: 'absolute',
        top: 10, // Ajustez selon vos besoins
        right: 10, // Ajustez selon vos besoins
    },

});