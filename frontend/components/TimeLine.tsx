import { View, Text, StyleSheet} from 'react-native'
import { timelineStyles } from './styles'

export default function TimeLine() {
    return (
        <View style={timelineStyles.line}>
        </View>
    )
}
export function TimeLineDot() {
    return (
        <View style={timelineStyles.dotSection}>
            <View style={timelineStyles.dot}>
            </View>
        </View>
    )
}
