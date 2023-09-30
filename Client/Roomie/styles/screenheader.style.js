import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#F3F4F8",
    borderRadius: 12 / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: 12 / 1.25,
  }),
});

export default styles;