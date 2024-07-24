import { SvgXml } from 'react-native-svg';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';




const Globe = ({ url, color = "#368FE6" }) => {
    const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"><path d="M10 19c4.438 0 8-3.526 8-7.964C18 6.598 14.438 3 10 3c-4.438 0-8 3.598-8 8.036S5.562 19 10 19zM3 8h14M3 14h14"/><path d="M10 19c2.219 0 4-3.526 4-7.964C14 6.598 12.219 3 10 3c-2.219 0-4 3.598-4 8.036S7.781 19 10 19z"/></g></svg>`
    const { userInfo } = useContext(AuthContext);
    const website = userInfo.website
    return url ? (
        <SvgXml xml={svgMarkup} width="27" height="20" />    
    ) : (
        null
    )
}
export default Globe;