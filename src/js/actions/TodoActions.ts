namespace TodoApp.actions
{
	import TodoStore = TodoApp.store.TodoStore;

	export class TodoActions
	{
		public static create(text:string)
		{
			TodoStore.create(text)
		}

		public static destroy(id:string)
		{
			TodoStore.destroy(id);
		}

		public static destroyCompleted()
		{
			TodoStore.destroyCompleted();
		}

		public static updateText(id:string, text:string)
		{
			TodoStore.updateText(id, text);
		}

		public static toggleCompleteAll()
		{
			TodoStore.toggleCompleteAll();
		}

		public static toggleComplete(id:string)
		{
			TodoStore.toggleComplete(id);
		}
	}
}

