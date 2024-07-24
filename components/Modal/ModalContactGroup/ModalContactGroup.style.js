import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },

      input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#F8F8F8',
        textAlign: 'center',
      },
      button: {
        backgroundColor: '#FFC107',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
      },
      buttonText: {
        color: 'white',
      },
})