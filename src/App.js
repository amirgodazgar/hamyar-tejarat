import Layout from "./layout/Layout";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./layout/theme/theme";
import "./App.module.css";
import Home from "./pages/home/Home";
import Auth from "./components/auth/Auth";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        {/* <Layout>
          <Home/>
        </Layout> */}

        <Auth />
        
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
