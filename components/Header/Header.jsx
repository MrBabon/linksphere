import { s } from "./Header.style.js";
import { TouchableOpacity, View } from "react-native"
import ChevronLeft from "../../assets/icons/ChevronLeft";
import { TxtJost, TxtJostBold } from "../TxtJost/TxtJost";
import Send from "../../assets/icons/Send";
import Garbage from "../../assets/icons/Garbage";
import PlusCircle from "../../assets/icons/PlusCircle.js";

const Header = ({
    title,
    onBackPress,
    showBackButton,
    showChatroom,
    onChatPress,
    showAddEntreprise,
    onAddEntreprisePress,
    showDelete,
    onDeletePress,
    showTabs,
    tabs,
    onTabPress,
    children
  }) => {
    return (
        <View style={s.container_header}>
            <View style={s.header}>
                {showBackButton ? (
                    <TouchableOpacity onPress={onBackPress}>
                        <ChevronLeft/>
                    </TouchableOpacity>
                ) : (
                    <View style={s.placeholder} />
                
                )}
               <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>{title}</TxtJost>
                </View>
                {showChatroom ? (
                    <TouchableOpacity onPress={onChatPress}>
                        <Send/>
                    </TouchableOpacity>
                ) : showDelete ? (
                    <TouchableOpacity onPress={onDeletePress}>
                        <Garbage/>
                    </TouchableOpacity>
                ) : showAddEntreprise ? (
                    <TouchableOpacity onPress={onAddEntreprisePress}>
                        <PlusCircle/>
                    </TouchableOpacity>
                ) : (
                    <View style={s.placeholder} />
                )}
            </View>
            {showTabs && (
                <View>
                    {tabs.map((tab, index) => (
                        <TouchableOpacity key={index} onPress={() => onTabPress(tab)}>
                            {tab.active ? (
                                <TxtJostBold style={s.nav_txt_active}>{tab.label}</TxtJostBold>
                            ) : (
                                <TxtJost style={s.nav_txt}>{tab.label}</TxtJost>
                            )}
                            {tab.active && <View style={s.underline}></View>}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {children && (
                <View style={s.header_nav}>
                    {children}
                </View>
            )}
        </View>
    )
}

export default Header;
