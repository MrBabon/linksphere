import { StyleSheet } from "react-native"


export const s = StyleSheet.create({

    background_img: {
        flex: 4,
        backgroundColor: "white",
        padding: 20
    },

    img:{
        opacity: 0.5
    },

    container_name: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    name: {
        textTransform: "uppercase",
        fontSize: 40
    },

    btn_container: {
        flex: 1
    },
    container_login: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 25,
    },

    container_sign: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 10
    },

    txt_sign: {
        color: "#368FE6"
    },

    yellow: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: 20,
        backgroundColor: "#FFD115"
    }
})