import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;


function scaleValue(value: any): any {
  if (typeof value === "number") return moderateScale(value);
  if (typeof value === "object" && value !== null) {
    const scaledObject: any = {};
    for (const key in value) {
      scaledObject[key] = scaleValue(value[key]);
    }
    return scaledObject;
  }
  return value;
}

export function responsiveStyleSheet(styles: Record<string, any>) {
  const scaledStyles: Record<string, any> = {};
  for (const key in styles) {
    scaledStyles[key] = scaleValue(styles[key]);
  }
  return StyleSheet.create(scaledStyles);
}