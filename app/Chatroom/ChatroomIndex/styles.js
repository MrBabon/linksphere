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

    garbage: {
        marginLeft: 27
    },

    txtheader: {
        fontFamily: "Jost-bold",
        textTransform: "uppercase",
        fontSize: 20,
        color: "#F4F4F4"
    },

    header_nav: {
        paddingTop: 110,
        borderBottomColor: "#cccccc",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-around",
        zIndex: 2
    },

    // BODY

    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },

    chatroomContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        // borderBottomWidth: 1,
        // borderBottomColor: "#ddd",
    },


    avatar_url: {
        width: 60,
        height: 60,
        marginRight: 12,
    },

    border: {
        height: 0.5,
        backgroundColor: "#cacaca7b"
    },

    chatroomDetails: {
        flex: 1, // Occupe l'espace disponible
    },

    chatroomName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },

    chatroomJob: {
        fontSize: 12,
        color: "#777",
        marginTop: 4, // Espacement entre le nom et le job
    },

    chatroomLastMessage: {
        fontSize: 12,
        color: "#aaa",
        marginTop: 2, // Espacement entre le job et le dernier message
    },

    messageDate: {
        fontSize: 12,
        color: "#aaa",
        marginLeft: 8, // Espace entre la date et le contenu
        alignSelf: "flex-end", // Aligné en haut pour être au même niveau que le nom
    },

    noChatMessage: {
        padding: 16,
        textAlign: "center",
        fontSize: 16,
        color: "#999",
    },
});