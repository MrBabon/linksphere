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
        
    },

    txtheader: {
        fontFamily: "Jost-bold",
        textTransform: "uppercase",
        fontSize: 20,
        color: "#F4F4F4"
    },

    // BODY

    container: {
        backgroundColor: "#1AC1B9",
        height: "auto",
        paddingTop: 110,
        paddingBottom: 140
    },

    card: {
        backgroundColor: "#F4F4F4",
        marginHorizontal: 16,
        borderRadius: 18,
        paddingTop: 30,
        marginTop: 40
    },

    wrapper: {
        marginHorizontal: 14,
        marginVertical: 16,
    },

    text_info: {
        color: "#A3A8AF",
        marginBottom: 14
    },

    txt: {
        fontSize: 20
    },

    input: {
        backgroundColor: "#FFFFFF",
        height: 40,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 5,
        paddingHorizontal: 14
    },

    input_bio:{
        backgroundColor: "#FFFFFF",
        height: 130,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 5,
        paddingHorizontal: 14,
        textAlignVertical: 'top'
    },


    container_avatar: {
        position: "relative",
        alignItems: "center",
        paddingTop: 60    
    },
    
    
    avatar: {
        position: 'absolute',
        bottom: 10, // La moitié de la hauteur de l'avatar
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    log: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFD115",
        paddingVertical: 7,
        paddingHorizontal: 24,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    logtxt: {        
        color: "#368FE6",
        fontSize: 25,
        marginLeft:3,
        textTransform: "uppercase"
    },

    btn: {        
        alignItems: "center",
        marginBottom: 60,
        marginTop: 20
    }
 })