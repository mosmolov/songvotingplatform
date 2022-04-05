import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history"

import VotingCard from "./components/VotingCard"
import AdminPanel from "./components/Admin"

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={VotingCard} />
                    <Route path="/Admin" component={AdminPanel} />
                </Switch>
            </Router>
        )
    }
}
