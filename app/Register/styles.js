import { StyleSheet } from "react-native"


export const s = StyleSheet.create({

  // HEADER
  header: {
    flexDirection: "row",
    backgroundColor: "#1AC1B9",
    height: 110,
    paddingTop: 60,
    paddingLeft: 10
  },

  header_texts: {
      flex: 1,
      alignItems: "center",
      marginRight: 40,
  },

  txtheader: {
      fontFamily: "Jost-bold",
      textTransform: "uppercase",
      fontSize: 20,
      color: "#F4F4F4"
  },

  //  BODY

  logo: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
    marginTop: 16,
  },

  logotxt: {
    textTransform: "uppercase",
    fontSize: 35,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  wrapper: { 
      width: "80%",
  },

  input: {
      backgroundColor: "#eae9e9",
      height: 40,
      marginTop: 10,
      marginBottom: 30,
      borderRadius: 5,
      paddingHorizontal: 14
  },

  log: {
    backgroundColor: "#368FE6",
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },

  txt: {
    fontSize: 20
  },


  logtxt: {
    fontSize: 20,
    color: "#F4F4F4",
  },

  link: {
    color: "#368FE6",
  },

})