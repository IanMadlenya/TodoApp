namespace TodoApp.actions
{
	import TodoStore = TodoApp.store.TodoStore;

	export class TodoActions
	{
		public static create(text:string)
		{
			TodoStore.getInstance().create(text)
		}

		public static destroy(id:string)
		{
			TodoStore.getInstance().destroy(id);
		}

		public static destroyCompleted()
		{
			TodoStore.getInstance().destroyCompleted();
		}

		public static updateText(id:string, text:string)
		{
			TodoStore.getInstance().updateText(id, text);
		}

		public static toggleCompleteAll()
		{
			TodoStore.getInstance().toggleCompleteAll();
		}

		public static toggleComplete(id:string)
		{
			TodoStore.getInstance().toggleComplete(id);
		}
	}
}

