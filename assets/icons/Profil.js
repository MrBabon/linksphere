import { SvgXml } from 'react-native-svg';




const Profil = ({ color = "#3A3A3A" }) => {
    const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" stroke="${color}" stroke-width="3" viewBox="0 0 64 64"><circle cx="32" cy="18.14" r="11.14"/><path d="M54.55 56.85A22.55 22.55 0 0 0 32 34.3 22.55 22.55 0 0 0 9.45 56.85Z"/></svg>`
    
    return <SvgXml xml={svgMarkup} width="38" height="38" />;
}

export default Profil;