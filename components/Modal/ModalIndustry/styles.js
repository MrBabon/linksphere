import { StyleSheet } from "react-native"


export const s = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 28,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeView: {
        position: 'absolute',
        left: 5,
        top: 10,
    },
    industryOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
})