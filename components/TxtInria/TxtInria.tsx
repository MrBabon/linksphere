import { Text, TextStyle, useWindowDimensions } from 'react-native';
import { s } from './TxtInria.style';

interface TxtProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export function TxtInriaLight({ children, style }: TxtProps) {
    const { height } = useWindowDimensions();
    const fontSize = (Array.isArray(style) ? style.find(st => st?.fontSize !== undefined)?.fontSize : style?.fontSize) || s.text_light.fontSize;
    return <Text style={[s.text_light, style, { fontSize: (fontSize as number) * 0.00118 * height }]}>{children}</Text>;
}
  
export function TxtInria({ children, style }: TxtProps) {
    const { height } = useWindowDimensions();
    const fontSize = (Array.isArray(style) ? style.find(st => st?.fontSize !== undefined)?.fontSize : style?.fontSize) || s.text.fontSize;
    return <Text style={[s.text, style, { fontSize: (fontSize as number) * 0.00118 * height }]}>{children}</Text>;
}
  
export function TxtInriaItalic({ children, style }: TxtProps) {
    const { height } = useWindowDimensions();
    const fontSize = (Array.isArray(style) ? style.find(st => st?.fontSize !== undefined)?.fontSize : style?.fontSize) || s.text_italic.fontSize;
    return <Text style={[s.text_italic, style, { fontSize: (fontSize as number) * 0.00118 * height }]}>{children}</Text>;
}
  
export function TxtInriaBold({ children, style }: TxtProps) {
    const { height } = useWindowDimensions();
    const fontSize = (Array.isArray(style) ? style.find(st => st?.fontSize !== undefined)?.fontSize : style?.fontSize) || s.text_bold.fontSize;
    return <Text style={[s.text_bold, style, { fontSize: (fontSize as number) * 0.00118 * height }]}>{children}</Text>;
}