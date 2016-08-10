namespace TodoApp
{
	import LinkableString = weavejs.core.LinkableString;
	import LinkableBoolean = weavejs.core.LinkableBoolean;

	export class Todo
	{
		text = Weave.linkableChild(this, LinkableString);
		complete = Weave.linkableChild(this, LinkableBoolean);
	}

	Weave.registerClass(Todo, "TodoApp.Todo", null, "Todo");
}
