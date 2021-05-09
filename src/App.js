import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./layout/theme/theme";
import "./App.module.css";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import VerifyEmail from "./components/auth/verifyEmail/VerifyEmail";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Switch>
          <Route path="/Register" component={Auth} />
          <Route path="/adminPanel" component={AdminPanel} />
          <Route path="/Account/VerifyEmail" component={VerifyEmail} />
          <Route path="/Account/ResetPassword" component={ResetPassword} />

          <Layout>
            <Route exact path="/" component={Home} />
          </Layout>
        </Switch>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
