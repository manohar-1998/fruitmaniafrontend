import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Producttable from "./pages/Producttable";
import Orders from "./pages/Orders";
import Navigation from "./pages/Navigation";
import Addproduct from "./pages/Addproduct";
import Signin from "./pages/Signin";
import Productedit from "./pages/Productedit";
import AdminRoute from "./pages/auth/AdminRoute";
import { isAuthenticated, SettingAuthenticateToken} from "./pages/auth";
import PieChart from "./pages/Piechart";

function App() {
  return (
      <Router>
        {SettingAuthenticateToken(isAuthenticated().token)}
        <Switch>
          <Route exact path="/" component={Signin} />
          <div> 
            <Navigation />
            <AdminRoute exact path="/Producttable" component={Producttable} />
            <AdminRoute exact path="/Piechart" component={PieChart} />
            <AdminRoute exact path="/Orders" component={Orders} />
            <AdminRoute exact path="/Addproduct" component={Addproduct} />
            <AdminRoute exact path="/Productedit/:id" component={Productedit} />
            </div>
        </Switch>
      </Router>
  );
}
export default App;
