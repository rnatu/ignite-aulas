import { styled } from "..";

export const NavigationWrapper = styled("div", {
  width: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",

  display: "flex",
  alignItems: "center",

  position: "relative",

  ".arrow": {
    position: "absolute",
    cursor: "pointer",
  },

  ".arrow.left": {
    left: 0,
  },

  ".arrow.right": {
    right: 0,
  },
});

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  minHeight: 656,
  gap: "48px",

  
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",
  cursor: "pointer",
  overflow: "hidden",

  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0, 0, 0, 0.6)",

    transform: "translateY(100%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    div: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },

    strong: {
      fontSize: "$lg",
      color: "$gray100",
    },

    span: {
      fontSize: "$xl",
      fontWeight: "bold",
      color: "$green300",
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});
