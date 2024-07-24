import { SvgXml } from 'react-native-svg';



const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="800" height="800" viewBox="0 0 472.615 472.615" fill="#7F95E4"><path d="M472.615 12.908H0l180.081 189.721-.015 257.079 112.484-58.183-.016-198.896z"/></svg>`
    
const Filter = () => <SvgXml xml={svgMarkup} width="27" height="27" />;

export default Filter;