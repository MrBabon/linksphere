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

    header_nav: {
        paddingTop: 120,
        borderBottomColor: "#cccccc",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-around",
        paddingBottom: 10,
        zIndex: 2
    },

    navContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
    },

    underline: {
        height: 3, 
        backgroundColor: '#FCB8D9',
        width: '45%',
        marginTop: 2,
    },
    
    nav_txt_active: {
        fontSize: 18
    },

    nav_txt: {
        fontSize: 18
    },

    // Body

    card: {
        flexDirection: "row",
        padding: 28,
        alignItems: "center",
        justifyContent: "space-between"
    },

    job: {
        fontSize: 18,
        color: "#A3A8AF"
    },

    industry: {
        fontSize: 14,
        color: "#7F95E4"
    },

    avatar_url: {
        width: 55,
        height: 55
    },

    border: {
        height: 0.5,
        backgroundColor: "#FBD160"
    },
})