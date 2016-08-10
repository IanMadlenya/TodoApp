namespace TodoApp
{
	import LinkableHashMap = weavejs.core.LinkableHashMap;
	import ILinkableObject = weavejs.api.core.ILinkableObject;

	export class TodoStore implements ILinkableObject
	{
		public todos = Weave.linkableChild(this, new LinkableHashMap(Todo));

		public checkAllComplete():boolean
		{
			return this.todos.getObjects().every(todo => todo.complete.value);
		}

		private updateAll(value:boolean)
		{
			this.todos.getObjects().forEach(todo => todo.complete.value = value);
		}

		public create(text:string)
		{
			text = text.trim();
			if (text)
			{
				var newTodo = this.todos.requestObject(null, Todo);
				newTodo.text.value = text;
			}
		}

		public destroy(item:string | Todo)
		{
			var name = typeof item === 'string' ? item as string : this.todos.getName(item as ILinkableObject);
			this.todos.removeObject(name);
		}

		public destroyCompleted()
		{
			this.todos.getObjects().forEach((todo:Todo) => {
				if (todo.complete.value)
					this.todos.removeObject(this.todos.getName(todo));
			});
		}

		public toggleCompleteAll()
		{
			if (this.checkAllComplete())
				this.updateAll(false);
			else
				this.updateAll(true);
		}
	}

	Weave.registerClass(TodoStore, "TodoApp.TodoStore");
}