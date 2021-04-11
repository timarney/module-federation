import React from "react";
import ReactDOM from "react-dom";

import {Scheduler} from "@cdssnc/scheduler/main";

import "./index.css";

const App = () => (
    <Scheduler />
);

ReactDOM.render(<App />, document.getElementById("app"));
