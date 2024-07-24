import { SvgXml } from 'react-native-svg';


const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><path stroke="#F9447F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5M16 8l-4-4m0 0L8 8m4-4v12"/></svg>`;
const Share = () => <SvgXml xml={svgMarkup} width="27" height="27" />;

export default Share;