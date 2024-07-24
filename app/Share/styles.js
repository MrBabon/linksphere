import { StyleSheet } from "react-native";


export const s = StyleSheet.create({

    container: {
    },
    contactShare: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FBD160",
        margin: 20,
        borderRadius: 20,
    },

    avatar_url: {
        width: 50,
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    info: {
        alignItems: "center",
    },

    detailTxt: {
        alignItems: "center",
        width: "auto",
    },

    userName: {
        fontSize: 18,
        color: "#3A3A3A",
    },

    contactGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 25,
        marginVertical: 20,
    },
    
    border: {
        height: 0.5,
        backgroundColor: "#cacaca7b"
    },

    // MODAL

    closeButton: {
        alignItems: "flex-start",
        
    },

    txt: {
        color: "#ffffff",
        fontSize: 18,
        marginVertical: 10,
    },

    btnConfirm: {
        backgroundColor: "#FBD160",
        paddingHorizontal: 28,
        paddingVertical: 5,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 20,
    },

    send: {
        color: "#7F95E4",
        fontSize: 20,
        textTransform: "uppercase",
    },
});