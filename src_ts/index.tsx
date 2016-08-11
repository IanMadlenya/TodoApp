import * as React from "react";
import * as ReactDOM from "react-dom";
import TodoApp from "./js/components/TodoApp";

$(function () {
	ReactDOM.render(<TodoApp/>, document.getElementById("todo-app"));
});
