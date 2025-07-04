import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
