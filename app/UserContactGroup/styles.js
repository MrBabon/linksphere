import { StyleSheet } from "react-native";


export const s = StyleSheet.create({

    // HEADER

    container_header: {
        zIndex: 3
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

    contactgroups: {
        height: 140,
        backgroundColor: "#FBD160",
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 2

    },

    btngroup: {
        marginBottom: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },

    txtbtngroup: {
        marginRight: 12,
    },

    chevron: {
        marginTop: 4
    },

    menu: {
        backgroundColor: '#FBD160',
        position: "absolute",
        alignItems: "center",
        width: "100%",
        top: 56,
        paddingHorizontal: 10,
        paddingTop: 100,
        paddingBottom: 10,
        zIndex: 1
    },

    menuItems: {
        alignItems: "center",
        width: "100%",
        backgroundColor: "#F4F4F4",

    },

    menuItem: {
        paddingVertical: 6,
        fontSize: 16,
        color: '#3A3A3A',
      },

    share: {
        position: "absolute",
        top: 14,
        left: 18,
        zIndex: 1
    },

    avatar: {
        marginTop: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    contact: {
        marginVertical: 10,
        alignItems: "center"
    },

    name: {
        fontSize: 36,
        color: "#A3ABAF",
        textTransform: "capitalize"
    },

    user_info: {
        flexDirection: "row",
        marginTop: 2
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

    border: { 
        width: '100%',
        height: 1,
        marginTop: 16,
        backgroundColor: "#F9447F"
    },


    detailTxt: {
        marginHorizontal: 8,
        marginTop: 30,
        width: "auto",
    },

    standView: {
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "#FBD160",
        width: 110,
        height: 30,
        borderBottomLeftRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    note: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },

    txtNote: {
        fontSize: 14,
        color: "#3A3A3A",
        fontWeight: "bold",
        textAlign: "center"
    },

    job: {
        fontSize: 18,
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
        fontSize: 18,
        marginHorizontal: 8,
    },

})