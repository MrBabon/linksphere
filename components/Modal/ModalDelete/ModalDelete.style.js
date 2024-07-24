import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Assombrissement de l'arrière-plan
    },

    modalView: {
        margin: 20,
        width: '90%',
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 28,
        paddingHorizontal: 10,
        alignItems: "center",
        backgroundColor: "#1AC1B9",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    children: {
        fontSize: 18,
        color: "#FFFFFF"
    },

    closeView: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        width: "100%"
    },

    button: {
        width: "40%",
        marginTop: 28,
        backgroundColor: "#FBD160",
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 20,
    },

    buttonText: {
        textTransform: "uppercase",
        color: "#1AC1B9",
        fontSize: 16
    },
})