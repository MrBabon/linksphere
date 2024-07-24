import { Text, useWindowDimensions } from "react-native"
import { s } from "./TxtInria.style"

export function TxtInriaLight({children, style}){
    const {height} = useWindowDimensions()
    const fontSize = style?.fontSize || s.text_light.fontSize
    return <Text style={[s.text_light, style, { fontSize: fontSize * 0.00118 * height }]}>{children}</Text>
}

export function TxtInria({children, style}){
    const {height} = useWindowDimensions()
    const fontSize = style?.fontSize || s.text.fontSize
    return <Text style={[s.text, style, { fontSize: fontSize * 0.00118 * height }]}>{children}</Text>
}

export function TxtInriaItalic({children, style}){
    const {height} = useWindowDimensions()
    const fontSize = style?.fontSize || s.text_italic.fontSize
    return <Text style={[s.text_italic, style, { fontSize: fontSize * 0.00118 * height }]}>{children}</Text>
}

export function TxtInriaBold({children, style}){
    const {height} = useWindowDimensions()
    const fontSize = style?.fontSize || s.text_bold.fontSize
    return <Text style={[s.text_bold, style, { fontSize: fontSize * 0.00118 * height }]}>{children}</Text>
}