namespace TodoApp.components
{
	import LinkableHashMap = weavejs.core.LinkableHashMap;
	import LinkableBoolean = weavejs.core.LinkableBoolean;
	import LinkableWatcher = weavejs.core.LinkableWatcher;
	import WeaveReactUtils = weavejs.util.WeaveReactUtils;
	import TodoItem = TodoApp.components.TodoItem;
	import WeaveComponentRenderer = weavejs.ui.WeaveComponentRenderer;
	import DynamicComponent = weavejs.ui.DynamicComponent;
	import TodoActions = TodoApp.actions.TodoActions;

	export interface MainSectionProps
	{
		allTodos:TodoState[];
		areAllComplete:boolean;
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
		}

		private onToggleCompleteAll=()=>
		{
			TodoActions.toggleCompleteAll();
		}

		private onDestroyClick=(id:string)=>
		{
			TodoActions.destroy(id);
		}

		render()
		{
			var todos = this.props.allTodos.map((todo:TodoState) => {
				return <TodoItem key={todo.id} todo={todo} onDestroyClick={() => this.onDestroyClick(todo.id)}/>;
			});

			return (
				<section id="main">
					<input
						id="toggle-all"
						type="checkbox"
						onChange={this.onToggleCompleteAll}
						checked={this.props.areAllComplete}
					/>
					<label htmlFor="toggle-all">Mark all as complete</label>
					<ul id="todo-list">{todos}</ul>
				</section>
			);
		}
	}
}