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
        width: '70%',
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
        alignItems: "center"
    },

    cardImg: {
        width: 80,
        
    },

    logo: {
        width: "100%",
        maxWidth: 90,
        height: 80,
        borderRadius: 12,
        resizeMode: 'contain',
        backgroundColor: "#e5e5e5b0"
    },

    containerInfo: {
        paddingLeft: 28
    },

    name: {
        fontSize: 18
    },

    headline: {
        fontSize: 16,
        color: "#A3A8AF"
    },

    industry: {
        fontSize: 14,
        color: "#7F95E4"
    },

    standView: {
        position: "absolute",
        right: -10,
        top: 0,
        backgroundColor: "#FBD160",
        width: 120,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 10,

    },

    stand: {
        textAlign: "right",
        fontSize: 12,
        color: "#FFFFFF",
        paddingVertical: 6,
        paddingRight: 16
    },

    border: {
        height: 0.5,
        backgroundColor: "#FBD160"
    },

    // MODAL

    checkboxView: {
        flexDirection: "row",
        marginHorizontal: 8
    },
    checkbox: {
        width: 14,
        height: 14,
        borderColor: "#FFFFFF"
    },

    viewBtn: {
        marginTop: 25
    },

    btnConfirm: {
        backgroundColor: "#FBD160",
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 22,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,

        elevation: 5,
    },

    btntxt: {
        fontSize: 16,
        textTransform: "uppercase",
        color: "#1AC1B9"
    },

    infoNotAccess: {
        color: "#FFFFFF",
        fontSize: 18,
        marginVertical: 10,
        textAlign: "center"
    },

})
