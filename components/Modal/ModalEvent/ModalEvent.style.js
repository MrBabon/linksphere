import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Assombrissement de l'arrière-plan
      },
      modalView: {
        margin: 20,
        width: '90%',
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 28,
        paddingHorizontal: 10,
        alignItems: "center",
        backgroundColor: "#1AC1B9",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },

    closeView: {
        position: "absolute",
        right: 3,
        top: 10

    },  

})