//Aqui dentro desse arquivo somente vai ter código totalmente TS
//Arquivo que só tem tipagem

import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme;

//Sobrescrvendo Tipagem de bibiçioteca 
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
