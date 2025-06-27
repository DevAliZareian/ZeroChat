import { extendTheme } from "@chakra-ui/react";
import "@fontsource/plus-jakarta-sans/latin.css";
import colors from "./colors";

const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  },
});

export default theme;
