import { DefaultTheme } from "@emotion/react";
import { ThemeType } from './theme/theme'

declare module '@emotion/react' {
    export interface DefaultTheme extends ThemeType{};
    export interface Theme extends ThemeType{};
}
