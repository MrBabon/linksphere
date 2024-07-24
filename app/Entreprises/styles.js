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
        marginRight: 27
    },

    txtheader: {
        fontFamily: "Jost-bold",
        textTransform: "uppercase",
        fontSize: 20,
        color: "#F4F4F4"
    },



    banner: {
        height: 120,
        backgroundColor: "#e5e5e5b0"
    },

    standView: {
        position: "absolute",
        right: 0,
        bottom: -30,
        backgroundColor: "#7F95E4",
        width: 140,
        height: 30,
        borderBottomLeftRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    btnsend: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    send: {
        textAlign: "center",
        fontSize: 14,
        color: "#FFFFFF"
    },

    // BODY

    container: {
        padding: 10,    
    },

    name: {
        fontSize: 20
    },

    headline: {
        color: "#A3A8AF",
        fontSize: 15
    },

    industry: {
        color: "#7F95E4",
        fontSize: 14
    },

    containerDetail: {
        marginTop: 14
    },

})