import { Text, useWindowDimensions } from "react-native"
import { s } from "./TxtJost.style"

export function TxtJost({children, style}){
    const {height} = useWindowDimensions()
    const fontSize = style?.fontSize || s.text.fontSize
    return <Text style={[s.text, style, { fontSize: fontSize * 0.00118 * height }]}>{children}</Text>
}

export function TxtJostSemiBold({children, style}){
    const {height} = useWindowDimensions()
    const fontSize = style?.fontSize || s.text_semibold.fontSize
    return <Text style={[s.text_semibold, style, { fontSize: fontSize * 0.00118 * height }]}>{children}</Text>
}

export function TxtJostBold({children, style}){
    const {height} = useWindowDimensions()
    const fontSize = style?.fontSize || s.text_bold.fontSize
    return <Text style={[s.text_bold, style, { fontSize: fontSize * 0.00118 * height }]}>{children}</Text>
}