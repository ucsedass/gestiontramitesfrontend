import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: `'Open Sans', monospace`,
      body: `'Raleway', monospace`,
    },
  });
  return (
    <>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
