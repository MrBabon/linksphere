import { Text, TextStyle, useWindowDimensions } from 'react-native';
import { s } from './TxtJost.style';

interface TxtProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export function TxtJost({ children, style }: TxtProps) {
  const { height } = useWindowDimensions();
  const fontSize = (Array.isArray(style) ? style.find(st => st?.fontSize !== undefined)?.fontSize : style?.fontSize) || s.text.fontSize;
  return <Text style={[s.text, style, { fontSize: (fontSize as number) * 0.00118 * height }]}>{children}</Text>;
}

export function TxtJostSemiBold({ children, style }: TxtProps) {
  const { height } = useWindowDimensions();
  const fontSize = (Array.isArray(style) ? style.find(st => st?.fontSize !== undefined)?.fontSize : style?.fontSize) || s.text_semibold.fontSize;
  return <Text style={[s.text_semibold, style, { fontSize: (fontSize as number) * 0.00118 * height }]}>{children}</Text>;
}

export function TxtJostBold({ children, style }: TxtProps) {
  const { height } = useWindowDimensions();
  const fontSize = (Array.isArray(style) ? style.find(st => st?.fontSize !== undefined)?.fontSize : style?.fontSize) || s.text_bold.fontSize;
  return <Text style={[s.text_bold, style, { fontSize: (fontSize as number) * 0.00118 * height }]}>{children}</Text>;
}