import { StyleSheet } from "react-native";


export const s = StyleSheet.create({

    chatroomContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        // borderBottomWidth: 1,
        // borderBottomColor: "#ddd",
    },

    chatroomDetails: {
        flex: 1, // Occupe l'espace disponible
    },

    avatar_url: {
        width: 60,
        height: 60,
        marginRight: 12,
    },

    chatroomName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },

    chatroomJob: {
        fontSize: 14,
        color: "#777",
        marginTop: 4, // Espacement entre le nom et le job
    },
});