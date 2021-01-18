import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Contact } from "./containers/contactPage";
import { AddContact } from "./containers/contactPage/add-contact";
import { EditContact } from "./containers/contactPage/edit-contact";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/contact/add" component={AddContact} />
        <Route path="/contact/edit/:id" component={EditContact} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/" component={Contact} />
      </Switch>
    </BrowserRouter>
  );
}
