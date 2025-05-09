import { StyleSheet, Dimensions } from "react-native"
import { responsiveStyleSheet } from "./responsive"

export const bgColor = "#f9f7f1"
export const cardColor = "#ffffff"
export const primaryColor = "#c9a348"
export const secondaryColor = "#02066f"
export const tertiaryColor = "##6e6e6e"
export const fontfamily = "monospace"

const {height, width} = Dimensions.get("screen")
export function unitPixel(val : number) {
  return height/200 * val
}
export function unitSpaceWidth(val : number) {
  return width/200 * val
}

export const authStyles = responsiveStyleSheet({
  titleText: {
    color: secondaryColor,
    fontSize: 40,
    fontFamily: fontfamily,
    textAlign: "center"
  },
  subText: {
    color: secondaryColor,
    fontSize: 20,
    fontFamily: fontfamily,
    textAlign: "left",
    marginBlockEnd: 5
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000000",
    borderCurve: "circular",
    borderRadius: 10
  },
  inputField: {
    marginBlockStart: 40,
    justifyContent: "space-around",
    padding: 45,
    height: 350,
  },
  button: {
    backgroundColor: primaryColor,
    width: 130,
    borderCurve: "circular",
    borderRadius: 10,
    marginBlockEnd: 40,
  },
  buttonText: {
    textAlign: "center",
    color: bgColor,
    padding: unitSpaceWidth(5)
  },
  goto: {
    color: secondaryColor,
    textDecorationLine: "underline"
  }
})


export const pageStyles = StyleSheet.create({
    titleText: {
        fontSize: unitPixel(10),
        marginBlockStart: unitPixel(20),
        marginInlineStart: unitSpaceWidth(20),
        marginBlockEnd: unitPixel(5)
    }
})

export const stepCardStyles = StyleSheet.create({
    titleView: {
        marginBlockStart: unitPixel(10),
        marginInline: unitSpaceWidth(15),
        borderWidth: unitSpaceWidth(1),
        padding: unitPixel(3),
        paddingBlock: unitPixel(5),
        borderCurve: "circular",
        borderRadius: unitPixel(5),
        borderColor: primaryColor,
        overflow: "hidden",
        backgroundColor: secondaryColor
    },
    titleText: {
        fontSize: unitPixel(5),
        color: primaryColor
    }
})

const timelineColor = secondaryColor
export const timelineStyles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "row",
        paddingBlockEnd: unitPixel(3),
        overflow: "hidden",
        marginInline: unitSpaceWidth(10)
    },
    line: {
        backgroundColor: timelineColor,
        marginInlineStart: unitSpaceWidth(15),
        width: unitSpaceWidth(2),
        borderCurve: "circular",
        borderRadius: unitPixel(2),
    },
    dotSection: {
        justifyContent: "center",
        position: "relative"
    },
    dot: {
        width: unitSpaceWidth(5),
        height: unitSpaceWidth(5),
        backgroundColor: timelineColor,
        borderCurve: "circular",
        borderRadius: unitPixel(3),
        position: "absolute",
        right: unitPixel(-0.7)
    },
    dotAndLineView: {
        display: "flex",
        flexDirection: "row",
    },
    eventView: {
        flex: 1,
        paddingBlockEnd: unitPixel(3)
    },
    event: {
        backgroundColor: tertiaryColor,
        paddingBlock: unitPixel(2),
        paddingInline: unitSpaceWidth(3),
        marginBlock: unitPixel(2),
        marginInlineStart: unitSpaceWidth(3),
        marginInlineEnd: unitSpaceWidth(25),
        borderCurve: "circular",
        borderRadius: unitPixel(2),
        flex: 1
    },
    stepPeriodText: {
        fontWeight: "600",
        marginInlineStart: unitSpaceWidth(8),
        marginBlock: unitPixel(1),
        fontSize: unitSpaceWidth(8)
    }
})
