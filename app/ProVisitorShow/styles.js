import { StyleSheet } from "react-native";


export const s = StyleSheet.create({
    // HEADER

    container_header: {
        zIndex: 1
    },

    header: {
        flexDirection: "row",
        position: "absolute",
        width: "100%",
        backgroundColor: "#1AC1B9",
        height: 110,
        paddingTop: 60,
        paddingHorizontal: 14,
        zIndex: 3
    },

    header_texts: {
        flex: 1,
        alignItems: "center",
    },

    txtheader: {
        fontFamily: "Jost-bold",
        textTransform: "uppercase",
        fontSize: 20,
        color: "#F4F4F4"
    },

    // BODY

    container: {
        marginTop: 120,
        justifyContent: "center",
        alignItems: "center",
    },

    avatar: {
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    name: {
        marginBottom: 8,
        fontSize: 35,
        color: "#A3A8AF",
        textTransform: "capitalize"
    },


    user_info: {
        flexDirection: "row",
        alignItems: "center", // Centrer verticalement
    },


    blurContainer: {
        position: 'absolute', // Utiliser position absolue pour couvrir le texte
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        borderRadius: 5,
        zIndex: 1
    },

    textflou: {
        zIndex: 0,
        color: "#b4b3b3",
        textAlign: "center"
    },
    textContainer: {
        position: 'relative',
        flex: 1,
        alignItems: 'center', // Centrer le contenu horizontalement
        justifyContent: 'center',
        flexDirection: "row"
    },

    social: {
        flexDirection: "row",
        alignItems: "center", // Centrer verticalement
        marginVertical: 16
    },

    border: {
        height: 0.5,
        backgroundColor: "#F9447F",
        marginBottom: 16
    },

    detail: {
        marginHorizontal: 8
    },

    job: {
        fontSize: 18
    },

    industry: {
        fontSize: 13,
        color: "#5B5B5B",
        marginTop: 2
    },

    company: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },

    at: {
        color: "#7F95E4",
        fontSize: 14
    },

    nameCompany: {
        fontSize: 15,
        color: "#7F95E4"
    },

    bio: {
        fontSize: 18
    },
})