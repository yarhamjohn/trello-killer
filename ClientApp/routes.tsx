import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { Forecast } from "./pages/Forecast";
import { Counter } from "./pages/Counter";
import { TrelloKiller } from "./pages/TrelloKiller";

export const routes = <Layout>
    <Route exact path="/" component={ Home } />
    <Route path="/counter" component={ Counter } />
    <Route path="/forecast" component={ Forecast } />
    <Route path="/trellokiller" component={ TrelloKiller } />
</Layout>;
