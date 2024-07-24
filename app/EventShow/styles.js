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
    card: {
        padding: 10,
        
    },

    cardImg: {
        alignItems: "center"
    },

    logo: {
        width: "100%",
        maxWidth: 110,
        height: 110,
        borderRadius: 12,

    },

    cardTitle: {
        alignItems: "center",
        paddingVertical: 10
    },

    infoContainer: {
        width: "100%",
        maxWidth: 440,
        alignSelf: 'center',
        marginHorizontal: "auto",
    },

    cardInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "auto",
        justifyContent: "center"
    },

    cardLink: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 16,
    },

    txtLink: {
        fontSize: 16,
        marginLeft: 4
    },
    cardDescription: {
        margin: 4,
    },
    
    txtdescription: {
        fontSize: 18

    },

    viewbtn: {
        marginHorizontal: 110,
        marginBottom: 140
    },

    btn: {
        marginBottom: 170,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBD160",
        borderRadius: 16,
        paddingVertical: 4,         
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,

        elevation: 5,
    },

    txtbtn: {
        textTransform: "uppercase",
        color: "#1AC1B9"
    },

    containerBtn: {
        marginBottom: 300,
    },

    viewBtnParticipation: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,

        elevation: 5,
    },

    btnParticipation: {
        width: "45%",
        marginTop: 10,
        backgroundColor: "#7F95E4",
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 5,
        
    },

    btnTxtParticipation: {
        fontSize: 16,
        color: "#FFFFFF"
    },

    viewUnsubscribe: {
        marginTop: 16,
        alignItems: "center"
    },

    txtItalic: {
        fontSize: 13
    },

    btnUnsubscribe: {
        textTransform: "uppercase",
        color: "#1AC1B9",
        fontSize: 16
    },
    // MODAL

    logoModal: {
        width: "100%",
        maxWidth: 90,
        height: 90,
        borderRadius: 12,
        marginTop: 8
    },

    confirmModal: {
        color: "#FFFFFF",
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 50,
        marginVertical: 16,
    },

    txtinfo: {
        color: "#FFFFFF",
        fontSize: 14
    },
    wraper: {
        width: "70%",
        marginVertical: 25
    },
    input: {
        backgroundColor: "#F2F1F1",
        height: 40,
        borderRadius: 7,
        textAlign: "center",
        fontSize: 16,
        fontFamily: "InriaSansRegular",
        
    },

    infoAcces: {
        paddingHorizontal: 1
    },

    infoTxt: {
        color: "#FFFFFF"
    },

    infoQuestion: {
        color: "#FFFFFF",
        marginTop: 10
    },

    link: {
        flexDirection: "row",
    },
    linkTxt: {
        color: "#FBD160"
    },

    ligne: {
        height: 1,
        width: "50%",
        backgroundColor: "#F9447F",
        marginVertical: 20,
        
    },
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