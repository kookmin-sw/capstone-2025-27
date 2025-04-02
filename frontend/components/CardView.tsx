import { StyleSheet, View, type ViewProps, useColorScheme } from 'react-native';
import { unitSpaceHeight, unitSpaceWidth, cardStyles } from './styles';
import { useThemeColor } from '@/hooks/useThemeColor';

export type CardViewProps = ViewProps & {
  color: string;
};

export function CardView({ style, color, ...otherProps }: CardViewProps) {
  const theme = useColorScheme()
  const backgroundColor = color;
  return <View style={[cardStyles.style, style, {backgroundColor: color}]} {...otherProps} />;
}
