import { SvgXml } from 'react-native-svg';



const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="800" height="800" viewBox="0 0 512 512"><path fill="#FFD115" d="M82.952 134.729c4.174 78.441 20.438 348.879 21.201 361.577l.944 15.694h301.806l.944-15.694c.765-12.698 17.029-283.136 21.201-361.577H82.952zm84.65 326.36-14.599-279.58 33.346-1.741 14.599 279.58-33.346 1.741zm105.094-.87h-33.391V180.194h33.391v280.025zm71.699.87-33.346-1.741 14.603-279.58 33.346 1.741-14.603 279.58zM316.325 44.522V0H195.68l-.003 44.522H61.217v55.703h389.565V44.522H316.325zm-33.39 0h-53.866v-11.13h53.866v11.13z"/></svg>`
    
const Garbage = () => <SvgXml xml={svgMarkup} width="20" height="20" />;

export default Garbage;