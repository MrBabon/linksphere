import { SvgXml } from 'react-native-svg';
import useOpenUrl from '../../hooks/useOpenUrl';
import { TouchableOpacity } from 'react-native';



const Instagram = ({ url, style, color = "#3A3A3A" }) => {
    const openUrl = useOpenUrl(url)
    const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><path fill="${color}" fill-rule="evenodd" d="M2 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6Zm4-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6Zm6 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Zm10.5-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd"/></svg>`
    
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
export default Instagram;