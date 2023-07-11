import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    'box-sizing': 'border-box',
    'scroll-behavior': 'smooth',
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
    backgroundColor: "$gray900",
    color: "$gray100",
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
});
