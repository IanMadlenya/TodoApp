namespace TodoApp.store
{
	import LinkableHashMap = weavejs.core.LinkableHashMap;
	import LinkableBoolean = weavejs.core.LinkableBoolean;
	import TodoActions = TodoApp.actions.TodoActions;

	export class TodoStore
	{
		private store:Weave = new Weave();

		private static TODO = "todo";
		private static ARE_ALL_COMPLETE = "areAllComplete";

		constructor() /* private */
		{
			this.store.root.requestObject(TodoStore.TODO, LinkableHashMap, true);
			this.store.root.requestObject(TodoStore.ARE_ALL_COMPLETE, LinkableBoolean, true);
			this.todos.addImmediateCallback(this, this.handleComplete, true);
		}

		static instance:TodoStore;

		static getInstance()
		{
			if(TodoStore.instance)
				return TodoStore.instance;

			TodoStore.instance = new TodoStore();
			return TodoStore.instance;
		}

		get todos()
		{
			return this.store.root.getObject(TodoStore.TODO) as LinkableHashMap;
		}

		get areAllComplete()
		{
			return this.store.root.getObject(TodoStore.ARE_ALL_COMPLETE) as LinkableBoolean;
		}

		private handleComplete()
		{
			if(this.checkAllComplete())
				this.areAllComplete.value = true;
		}

		private checkAllComplete()
		{
			var todoList = this.todos.getObjects();
			if(!todoList.length)
				return false;

			for(var todo of todoList)
			{
				if(!todo.complete.value)
					return false;
			}
			return true;
		}

		private updateAll(value:boolean)
		{
			this.todos.getObjects().forEach((todo:Todo) => {
				todo.complete.value = value;
			});
		}

		public create(text:string)
		{
			var todos = this.todos;

			text = text.trim();
			if (text !== '')
			{
				var newTodo = todos.requestObject(todos.generateUniqueName("Todo"), Todo) as Todo;
				newTodo.text.value = text;
			}
		}

		public destroy(id:string)
		{
			this.todos.removeObject(id);
		}

		public destroyCompleted()
		{
			this.todos.getObjects().forEach((todo:Todo)  => {
				if(todo.complete.value)
					this.todos.removeObject(this.todos.getName(todo));
			});
		}

		public updateText(id:string, text:string)
		{
			var todo = this.todos.getObject(text) as Todo;
			todo.text.value = text;
		}

		public toggleCompleteAll()
		{
			if(this.checkAllComplete())
				this.updateAll(false);
			else
				this.updateAll(true);
		}

		public toggleComplete(id:string)
		{
			var todo = this.todos.getObject(id) as Todo;
			todo.complete.value = true;
		}

		public undo=()=>
		{
			this.store.history.undo();
		}

		public redo=()=>
		{
			this.store.history.redo();
		}
	}
}