import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Contact } from "./containers/contactPage";
import { AddContact } from "./containers/contactPage/add-contact";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/contact/add" component={AddContact} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/" component={Contact} />
      </Switch>
    </BrowserRouter>
  );
}
