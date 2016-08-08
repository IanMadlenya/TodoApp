$(function () {
	var weave = new Weave();
	ReactDOM.render(<TodoApp.App weave={weave}/>, document.getElementById("todo-app"));
});
