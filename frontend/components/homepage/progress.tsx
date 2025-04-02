import { Text } from "react-native";
import { CardView } from "../CardView";
import { cardStyles } from "../styles";

export default function Progress() {
  return (
      <CardView color="rgba(255, 155, 0, 0.2)">
        <Text style={cardStyles.titleText}>PROGRESS</Text>
      </CardView>
  );
}