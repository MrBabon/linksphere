import { SvgXml } from 'react-native-svg';


const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 32 32"><path fill="#FFD115" fill-rule="evenodd" d="M22 17h-5v5a1.001 1.001 0 0 1-2 0v-5h-5a1.001 1.001 0 0 1 0-2h5v-5a1.001 1.001 0 0 1 2 0v5h5a1.001 1.001 0 0 1 0 2ZM16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0Z"/></svg>`;
const PlusCircle = () => <SvgXml xml={svgMarkup} width="27" height="27" />;

export default PlusCircle;