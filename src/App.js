import Layout from "./layout/Layout";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import {theme} from './layout/theme/theme'
import './App.module.css'

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Layout>تجارت الکترونیک</Layout>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
