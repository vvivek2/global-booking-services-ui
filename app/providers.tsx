"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const muiCache = createCache({ key: "css", prepend: true });
const theme = createTheme();

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
