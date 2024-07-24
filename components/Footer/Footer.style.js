import { StyleSheet } from "react-native";


export const s = StyleSheet.create({
    
    footer_container: {
        flexDirection: "row",
        height: 130,
        justifyContent: "space-around",
        alignItems: "center",
        position: "relative",
        width: "100%",
    },
    footer: {
        position: 'absolute',
        bottom: -4,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: 'transparent', // Devrait rendre le fond du footer transparent
        alignItems: 'center',
    },
    vide: {
        width: 27
    },
    qrButton: {
        width: 65,
        height: 65,
        position: 'absolute',
        top: -11, // Ajustez selon le besoin pour surélever le bouton
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1AC1B9",
        borderRadius: 50,
        borderColor: "#ffffff",
        borderWidth: 3,
        zIndex: 1
    },

    background_img: {
        backgroundColor: "transparent",
        height: 120,
        width: "100%"
    },

    img: {
        resizeMode: 'cover', // Assure que l'image couvre bien la zone sans déformation
    },

    svgBackground: {
        width: '100%',        // Assure que le SVG couvre toute la largeur de l'écran
        height: 150,          // Augmentez ou ajustez la hauteur pour mieux couvrir l'espace désiré
        position: 'absolute', // Positionnement absolu
        bottom: 0,            // Aligné au bas de l'écran ou du conteneur
    },

    btn:  {
        alignItems: "center"
    },

    activeBtn: {
        fillColor: "#1AC1B9",
        alignItems: "center"
    },
    

    txt: {
        fontSize: 12
    },

    txtM:{
        fontSize: 12,
        marginTop: 10
    },
    

    activeTxt: {
        color: "#1AC1B9",
        fontSize: 12
    },

    activeScan: {
        color: "#FFFFFF",
        fontSize: 12
    }

    

})