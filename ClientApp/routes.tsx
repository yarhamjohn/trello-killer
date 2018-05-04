import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/Home";
import { Forecast } from "./components/pages/Forecast";
import { Counter } from "./components/pages/Counter";
import { Board } from "./components/pages/Board";

export const routes = <Layout>
    <Route exact path="/" component={ Home } />
    <Route path="/counter" component={ Counter } />
    <Route path="/forecast" component={ Forecast } />
    <Route path="/board" component={ Board } />
</Layout>;
