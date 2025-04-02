import { Text } from "react-native";
import { CardView } from "../CardView";
import { cardStyles } from "../styles";

export default function Todos() {
  return (
      <CardView color="rgba(0, 225, 255, 0.1)">
        <Text style={cardStyles.titleText}>TODOS</Text>
      </CardView>
  );
}