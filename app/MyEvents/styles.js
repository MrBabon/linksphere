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

    container: {
        marginBottom: 130,
        zIndex: 1
    },

    monthHeader: {
        backgroundColor: "#FBD160",
        alignContent: "center",
        textAlign: "center",
        fontSize: 14,
        paddingVertical: 1
        },

    card: {
        padding: 20,  
    },

    txtTitle: {
        textAlign: "center",
        fontSize: 18
    },
    cardContainer: {
        flexDirection: "row",
        marginTop: 10
    },

    cardImg: {
        width: 80
    },

    logo: {
        width: "100%",
        maxWidth: 90,
        height: 80,
        borderRadius: 12,
    },

    infoContainer: {
        maxWidth: 440,
        alignSelf: 'center',
        marginHorizontal: "auto",
    },

    cardInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },

    cardInfoTxt: {
        fontSize: 16
    },

    btn: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
        marginHorizontal: 35,
        backgroundColor: "#fae9f1ff",
        borderWidth: 0.3,
        borderColor: "#F9447F",
        borderRadius: 12, // Assurez-vous que la bordure est arrondie
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },


    btnTxt: {
        color: "#F9447F",
        fontSize: 16,
        paddingHorizontal: 14,
        paddingVertical: 3,
        borderRadius: 20,
    },

    border: {
        marginTop: 3,
        height: 1,
        backgroundColor: "#FBD160"
    }
})