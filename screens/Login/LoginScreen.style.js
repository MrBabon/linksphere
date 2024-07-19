import { StyleSheet } from "react-native"


export const s = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 15
    },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    wrapper: {
        width: "80%"
    },

    input: {
        backgroundColor: "#eae9e9",
        height: 40,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 5,
        paddingHorizontal: 14
    },

    link: {
        color: "#368FE6",
    },

    logo: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 50
    },
    form: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    btn: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },


    txtlogo: {
        textTransform: "uppercase",
        fontSize: 35,
    },

    label: {
        alignItems: "center",
    },
    txt: {
        fontSize: 20,
        fontFamily: "Inria-bold",
    },

    log: {
        backgroundColor: "#368FE6",
        marginTop: 60,
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
        },

    logtxt: {
        fontSize: 20,
        color: "#F4F4F4",
    },

    error: {
        color: "red",
        marginTop: 30
    },

})