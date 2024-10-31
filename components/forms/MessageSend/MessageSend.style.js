import { StyleSheet } from "react-native";


export const s = StyleSheet.create({

    messagebar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        zIndex: 2
    },

    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#F2F1F1',
        borderRadius: 6,
        borderWidth: 0
    },
});