import { StyleSheet, Dimensions } from "react-native"

export const primaryColor = "#FFFFFF"
export const secondaryColor = "#58C6E7"
export const tertiaryColor = "#9ce8ff"
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

export const cardStyles = StyleSheet.create({
    style: {
        padding: unitSpaceHeight(3),
        paddingInlineStart: unitSpaceWidth(10),
        marginInline: unitSpaceHeight(6),
        marginBlock: unitSpaceHeight(2),
        borderCurve: 'circular',
        borderRadius: unitSpaceHeight(2),
    },
    titleText: {
        fontSize: unitSpaceHeight(6),
        color: "#afafaf"
    }
})

export const pageStyles = StyleSheet.create({
    titleText: {
        fontSize: unitSpaceHeight(10),
        marginBlockStart: unitSpaceHeight(20),
        marginInlineStart: unitSpaceWidth(20),
        marginBlockEnd: unitSpaceHeight(5)
    }
})

export const stepCardStyles = StyleSheet.create({
    titleView: {
        marginBlockStart: unitSpaceHeight(10),
        marginInline: unitSpaceWidth(15),
        borderWidth: unitSpaceWidth(1),
        padding: unitSpaceHeight(3),
        paddingBlock: unitSpaceHeight(5),
        borderCurve: "circular",
        borderRadius: unitSpaceHeight(5),
        borderColor: primaryColor,
        overflow: "hidden",
        backgroundColor: secondaryColor
    },
    titleText: {
        fontSize: unitSpaceHeight(5),
        color: primaryColor
    }
})

const timelineColor = secondaryColor
export const timelineStyles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "row",
        paddingBlockEnd: unitSpaceHeight(3),
        overflow: "hidden",
        marginInline: unitSpaceWidth(10)
    },
    line: {
        backgroundColor: timelineColor,
        marginInlineStart: unitSpaceWidth(15),
        width: unitSpaceWidth(2),
        borderCurve: "circular",
        borderRadius: unitSpaceHeight(2),
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
        borderRadius: unitSpaceHeight(3),
        position: "absolute",
        right: unitSpaceHeight(-0.7)
    },
    dotAndLineView: {
        display: "flex",
        flexDirection: "row",
    },
    eventView: {
        flex: 1,
        paddingBlockEnd: unitSpaceHeight(3)
    },
    event: {
        backgroundColor: tertiaryColor,
        paddingBlock: unitSpaceHeight(2),
        paddingInline: unitSpaceWidth(3),
        marginBlock: unitSpaceHeight(2),
        marginInlineStart: unitSpaceWidth(3),
        marginInlineEnd: unitSpaceWidth(25),
        borderCurve: "circular",
        borderRadius: unitSpaceHeight(2),
        flex: 1
    },
    stepPeriodText: {
        fontWeight: "600",
        marginInlineStart: unitSpaceWidth(8),
        marginBlock: unitSpaceHeight(1),
        fontSize: unitSpaceWidth(8)
    }
})