import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyles } from "./styles/global";
import { Router } from "./Router";
import { CycleContextProvider } from "./context/CyclesContext";
 

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
