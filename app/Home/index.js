import { s } from './styles';
import backgroundImg from '../../assets/images/background.jpg';
import { TxtInria, TxtInriaBold } from "../../components/TxtInria/TxtInria";
import { TxtJostSemiBold } from "../../components/TxtJost/TxtJost";
import { View, ImageBackground, TouchableOpacity} from "react-native";
import { Link } from 'expo-router';


export default function Home() {
  return (
    <>
      <ImageBackground source={backgroundImg} style={s.background_img} imageStyle={s.img}>
        <View style={s.container_name}>
          <TxtJostSemiBold style={s.name}>LinkSphere</TxtJostSemiBold>
        </View>
      </ImageBackground>
      <View style={s.btn_container}>
        <View style={s.container_login}>
          <Link href="/Login" asChild>
            <TouchableOpacity>
              <TxtInriaBold>Login</TxtInriaBold>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={s.container_sign}>
          <Link href={"/Register"} asChild>
          <TouchableOpacity>
            <TxtInria style={s.txt_sign}>Sign Up</TxtInria>
          </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View style={s.yellow}></View>
    </>
  )
}
