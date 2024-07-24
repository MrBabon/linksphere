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
        width: '40%',
        marginTop: 2,
    },
    
    nav_txt_active: {
        fontSize: 18
    },

    nav_txt: {
        fontSize: 18
    },


    // BODY

    containerInfo: {
        flexDirection: "row",
        padding: 28,
        alignItems: "center",
        justifyContent: "space-between"
    },

    logo: {
        width: "100%",
        maxWidth: 74,
        height: 74,
        borderRadius: 12,
        resizeMode: 'contain',
        backgroundColor: "#e5e5e5b0"
    },

    containerSocial: {
        flexDirection: "row",
    },

    viewIcon: {
        backgroundColor: "#FBD160",
        marginHorizontal: 8,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },

    iconSocialF: {
        position: "absolute",
        right: -19,
        top: -11,
    },

    iconSocialI: {
        position: "absolute",
        right: -20,
        top: -12,
    },

    entrepriseInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },

    website: {
        fontSize: 14
    },

    container: {
        paddingHorizontal: 10
    },

    name: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },

    description: {
        fontSize: 16
    },

    linkShow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20
    },

    linkTxt: {
        color: "#F9447F",
        marginLeft: 5,
        textTransform: "uppercase",
        fontSize: 15
    },

    containerRepresentative: {
        backgroundColor: "#FBD160"
    },

    titleRepresentatives: {
        textAlign: "center",
        fontSize: 16,
        marginVertical: 10
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