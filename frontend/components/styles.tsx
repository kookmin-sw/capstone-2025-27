import { StyleSheet, Dimensions } from "react-native"

export const primaryColor = "#FFFFFF"
export const secondaryColor = "#58C6E7"
export const fontfamily = "monospace"

const {height, width} = Dimensions.get("screen")
export function unitSpaceHeight(val : number) {
    return height/200 * val
}
export function unitSpaceWidth(val : number) {
    return width/200 * val
}

export const authStyles = StyleSheet.create({
    titleText: {
        color: secondaryColor,
        fontSize: unitSpaceHeight(9),
        fontFamily: fontfamily,
        textAlign: "center"
    },
    subText: {
        color: secondaryColor,
        fontSize: unitSpaceHeight(4.5),
        fontFamily: fontfamily,
        textAlign: "left",
        marginBlockEnd: unitSpaceHeight(1)
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#000000",
        borderCurve: "circular",
        borderRadius: 10
    },
    inputField: {
        marginBlockStart: unitSpaceHeight(10),
        justifyContent: "space-around",
        padding: unitSpaceWidth(30),
        height: unitSpaceHeight(90),
    },
    button: {
        backgroundColor: secondaryColor,
        width: unitSpaceWidth(60),
        borderCurve: "circular",
        borderRadius: unitSpaceHeight(2),
        marginBlockEnd: unitSpaceHeight(10)
    },
    buttonText: {
        textAlign: "center",
        color: primaryColor,
        padding: unitSpaceWidth(5)
    },
    goto: {
        color: secondaryColor,
        textDecorationLine: "underline"
    }
})
