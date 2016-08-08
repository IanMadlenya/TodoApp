namespace TodoApp
{
	import Todo = TodoApp.Todo;
	import LinkableHashMap = weavejs.core.LinkableHashMap;
	import Header = TodoApp.components.Header;
	import MainSection = TodoApp.components.MainSection;
	import Footer = TodoApp.components.Footer;
	import LinkableBoolean = weavejs.core.LinkableBoolean;

	export interface TodoAppProps
	{
		weave:Weave;
	}

	export interface TodoAppState
	{

	}

	export class App extends React.Component<TodoAppProps, TodoAppState>
	{
		allTodos:LinkableHashMap;
		areAllComplete:LinkableBoolean;

		constructor(props:TodoAppProps)
		{
			super(props);
			this.allTodos = (this.props.weave || new Weave()).root.requestObject("todos", LinkableHashMap);
			this.areAllComplete = (this.props.weave || new Weave()).root.requestObject("areAllComplete", LinkableBoolean);
			this.allTodos.addGroupedCallback(this, this.markAllAsComplete);
		}

		public static areAllComplete(todos:LinkableHashMap)
		{
			var todoList = todos.getObjects();
			if(!todoList.length)
				return false;

			for(var todo of todoList)
			{
				if(!todo.complete.value)
					return false;
			}
			return true;
		}

		private markAllAsComplete()
		{
			if(TodoApp.App.areAllComplete(this.allTodos))
				this.areAllComplete.value = true;
			else
				this.areAllComplete.value = false;
		}

		//  Actions
		//  Collection of static functions that can be called
		//  from the sub components
		public static create(text:string, todos:LinkableHashMap)
		{
			text = text.trim();
			if (text !== '')
			{
				var newTodo = todos.requestObject(todos.generateUniqueName("Todo"), Todo) as Todo;
				newTodo.text.value = text;
			}
		}

		public static destroy(id:string, todos:LinkableHashMap)
		{
			todos.removeObject(id);
		}

		public static destroyCompleted(todos:LinkableHashMap)
		{
			todos.getObjects().forEach((todo:Todo)  => {
				if(todo.complete.value)
					todos.removeObject(todos.getName(todo));
			});
		}

		public static updateAll(value:boolean, todos:LinkableHashMap)
		{
			todos.getObjects().forEach((todo:Todo) => {
				todo.complete.value = value;
			});
		}

		public static toggleCompleteAll(todos:LinkableHashMap)
		{
			if(TodoApp.App.areAllComplete(todos))
				TodoApp.App.updateAll(false, todos);
			else
				TodoApp.App.updateAll(true, todos);
		}

		public undo=()=>
		{
			this.props.weave.history.undo();
		}

		public redo=()=>
		{
			this.props.weave.history.redo();
		}

		render()
		{
			return (
				<div style={{display: "flex", flex: 1, flexDirection: "column"}}>
					<Header onCreate={(text:string) => TodoApp.App.create(text, this.allTodos)} undo={this.undo} redo={this.redo}/>
					<MainSection allTodos={this.allTodos} areAllComplete={this.areAllComplete}/>
					<Footer allTodos={this.allTodos}/>
				</div>
			);
		}
	}
}