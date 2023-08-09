declare const colors: {
    readonly white: "#FFF";
    readonly black: "#000";
    readonly gray100: "#E1E1E6";
    readonly gray200: "#A9A9B2";
    readonly gray400: "#7C7C8A";
    readonly gray500: "#505059";
    readonly gray600: "#323238";
    readonly gray700: "#29292E";
    readonly gray800: "#202024";
    readonly gray900: "#121214";
    readonly ignite300: "#00B37E";
    readonly ignite500: "#00875F";
    readonly ignite700: "#015F43";
    readonly ignite900: "#00291D";
};

declare const space: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    40: string;
    64: string;
    80: string;
};

declare const radii: {
    px: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
};

declare const fonts: {
    default: string;
    code: string;
};

declare const fontSizes: {
    readonly xxs: "0.625rem";
    readonly xs: "0.75rem";
    readonly sm: "0.875rem";
    readonly md: "1rem";
    readonly lg: "1.125rem";
    readonly xl: "1.25rem";
    readonly '2xl': "1.5rem";
    readonly '4xl': "2rem";
    readonly '5xl': "2.25rem";
    readonly '6xl': "3rem";
    readonly '7xl': "4rem";
    readonly '8xl': "4.5rem";
    readonly '9xl': "6rem";
};

declare const fontWeights: {
    regular: string;
    medium: string;
    bold: string;
};

declare const lineHeights: {
    shorter: string;
    short: string;
    base: string;
    tall: string;
};

export { colors, fontSizes, fontWeights, fonts, lineHeights, radii, space };
