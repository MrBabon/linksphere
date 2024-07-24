import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
import useOpenUrl from '../../hooks/useOpenUrl';



const Facebook = ({ url, style, color = "#3A3A3A" }) => {
    const openUrl = useOpenUrl(url)
    const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="${color}"><path fill="none" d="M0 0h20v20H0z"/><path d="M8.46 18h2.93v-7.3h2.45l.37-2.84h-2.82V6.04c0-.82.23-1.38 1.41-1.38h1.51V2.11c-.26-.03-1.15-.11-2.19-.11-2.18 0-3.66 1.33-3.66 3.76v2.1H6v2.84h2.46V18z"/></svg>`

    const iconStyle = {
        width: 20,
        height: 20,
        marginHorizontal: 10,
        ...style
    };

    return url ? (
        <TouchableOpacity onPress={openUrl}>
            <SvgXml xml={svgMarkup} style={iconStyle} />    
        </TouchableOpacity>
    ) : (
        null
    )
}
export default Facebook;