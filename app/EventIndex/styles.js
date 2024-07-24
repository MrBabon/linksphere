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

    cardImg: {
        alignItems: "center"
    },

    logo: {
        width: "100%",
        maxWidth: 90,
        height: 90,
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

    border: {
        height: 1,
        backgroundColor: "#cccccc80"
    }
})