import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

export type IconSymbolName = React.ComponentProps<typeof MaterialIcons>['name'];

/**
 * A cross-platform MaterialIcons-based icon component.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  return <MaterialIcons name={name} size={size} color={color} style={style} />;
}
