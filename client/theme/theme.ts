export type ThemeType = typeof light;

export const light = {
    primary: "#f45511",
    text: "white",
    background: `linear-gradient(to right top, #b2a6fa, #d8a0e8, #f09dd2, #fca0bc, #ffa6a9, #ffad9d, #ffb692, #ffc08a, #ffcc81, #ffd97a, #ffe874, #f9f871);`,
    secondary: '#FFA0C3',
    hover: 'rgba(256, 256, 256, 0.15)',
}

export const dark: ThemeType = {
    primary: 'tomato',
    text: 'white',
    background: `#15191D`,
    secondary: '#1B2025',
    hover: 'rgba(256, 256, 256, 0.05)',
}

const theme = dark; 
export default theme;

