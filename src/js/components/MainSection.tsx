namespace TodoApp.components
{
	import LinkableHashMap = weavejs.core.LinkableHashMap;
	import LinkableBoolean = weavejs.core.LinkableBoolean;
	import LinkableWatcher = weavejs.core.LinkableWatcher;
	import WeaveReactUtils = weavejs.util.WeaveReactUtils;
	import TodoItem = TodoApp.components.TodoItem;
	import WeaveComponentRenderer = weavejs.ui.WeaveComponentRenderer;
	import DynamicComponent = weavejs.ui.DynamicComponent;

	export interface MainSectionProps
	{
		allTodos:LinkableHashMap;
		areAllComplete:LinkableBoolean;
	}

	export interface MainSectionState
	{

	}

	export class MainSection extends React.Component<MainSectionProps, MainSectionState>
	{
		private get allTodos()
		{
			return this.props.allTodos;
		}

		constructor(props:MainSectionProps)
		{
			super(props);
			DynamicComponent.setDependencies(this, [props.allTodos, props.areAllComplete]);
		}

		private toggleCompleteAll=()=>
		{
			TodoApp.App.toggleCompleteAll(this.allTodos);
		}

		render()
		{
			var todos = this.allTodos.getObjects().map((todo:Todo) => {
				return <TodoItem key={this.allTodos.getName(todo)} todo={todo} onDestroyClick={() => TodoApp.App.destroy(this.allTodos.getName(todo), this.allTodos)}/>;
			});

			return (
				<section id="main">
					<input
						id="toggle-all"
						type="checkbox"
						onChange={this.toggleCompleteAll}
						checked={this.props.areAllComplete.value}
					/>
					<label htmlFor="toggle-all">Mark all as complete</label>
					<ul id="todo-list">{todos}</ul>
				</section>
			);
		}
	}
}