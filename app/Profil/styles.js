import { StyleSheet } from "react-native"


export const s = StyleSheet.create({

    // HEADER

    header: {
        flexDirection: "row",
        position: "absolute",
        width: "100%",
        backgroundColor: "#1AC1B9",
        height: 110,
        paddingTop: 60,
        paddingHorizontal: 14,
        zIndex: 1
    },

    header_texts: {
        flex: 1,
        alignItems: "center",
        marginRight: 27
    },

    txtheader: {
        fontFamily: "Jost-bold",
        textTransform: "uppercase",
        fontSize: 20,
        color: "#F4F4F4"
    },

    // BODY

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 10
    },

    container_avatar:{
        position: "relative",
        alignItems: "center",
        backgroundColor: "#1AC1B9",
        paddingTop: 170
    },

    avatar: {
        width: 120, // La largeur de l'avatar
        height: 120, // La hauteur de l'avatar
        borderRadius: 60, // Si l'avatar est un cercle
        position: 'absolute',
        bottom: -60, // La moitié de la hauteur de l'avatar
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    user_name: {
        marginBottom: 8,
        fontSize: 35,
        color: "#A3A8AF",
        textTransform: "capitalize"
    },

    user_info: {
        flexDirection: "row"
    },

    info: {
        fontSize: 17
    },

    social: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignSelf: "center",
        alignItems: "center",
    },

    yellow: { 
        width: '100%',
        height: 3,
        marginTop: 16,
        backgroundColor: "#FFD115"
    },

    detail: {
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 150
    },

    job: {
        fontSize: 21,
        marginBottom: 10
    },

    industry: {
        marginBottom: 10
    },

    entreprise: {
        marginBottom: 10,
        color: "#368FE6"
    }

})