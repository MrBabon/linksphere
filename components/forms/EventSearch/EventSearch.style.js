import { StyleSheet } from "react-native";


export const s = StyleSheet.create({

    searchBar: {
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
        marginRight: 10,
        borderWidth: 0
    },

    filters: {
        backgroundColor: '#7F95E4',
        position: "absolute",
        width: "100%",
        top: 56,
        paddingHorizontal: 10,
        paddingTop: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,

        elevation: 5,
        zIndex: 1
    },

    inputFilter: {
        flex: 1,
        height: 35,
        borderColor: 'gray',
        borderRadius: 6, 
        padding: 10,
        marginHorizontal: 30,
        
        marginBottom: 8,
        borderWidth: 0,
        backgroundColor: "#F4F4F4"
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBD160",
        marginHorizontal: 88,
        marginTop: 16,
        marginBottom: 20,
        paddingVertical: 5,
        borderRadius: 16,          
        overflow: 'hidden' 
    },
    
    txtbtn: {
        color: "#FFFFFF",
        fontSize: 24, 
    }
})

