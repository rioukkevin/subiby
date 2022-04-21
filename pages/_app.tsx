import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../components/Auth/AuthProvider";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import { MantineProvider } from "@mantine/core";
import { customTheme } from "../services/theme";

dayjs.extend(relativeTime);
dayjs.locale("en");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MantineProvider theme={customTheme}>
        <Component {...pageProps} />
      </MantineProvider>
    </AuthProvider>
  );
}

export default MyApp;
