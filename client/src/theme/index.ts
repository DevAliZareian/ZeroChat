import { extendTheme, type StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";
import "@fontsource/plus-jakarta-sans/latin.css";
import colors from "./colors";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "layout.background",
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "text.primary",
      },
    }),
  },
});

export default theme;
