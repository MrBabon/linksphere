import { SvgXml } from 'react-native-svg';




const Close = ({ color="#FBD160" }) => {
    
    const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 16-4-4m0 0L8 8m4 4 4-4m-4 4-4 4"/></svg>`
    return (
        <SvgXml xml={svgMarkup} width="38" height="38" />
    )
}

export default Close;