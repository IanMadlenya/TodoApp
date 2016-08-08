namespace TodoApp {
	import LinkableString = weavejs.core.LinkableString;
	import LinkableBoolean = weavejs.core.LinkableBoolean;

	export class Todo
	{
		id = Weave.linkableChild(this, LinkableString);
		text = Weave.linkableChild(this, LinkableString);
		complete = Weave.linkableChild(this, LinkableBoolean);
	}
	Weave.registerClass(Todo, "weavejs.app.TodoApp.Todo", null, "Todo");
}