namespace TodoApp.components
{
	import DynamicComponent = weavejs.ui.DynamicComponent;

	export interface MainSectionProps
	{
		store:TodoStore;
	}

	export interface MainSectionState
	{
	}

	export class MainSection extends React.Component<MainSectionProps, MainSectionState>
	{
		constructor(props:MainSectionProps)
		{
			super(props);
		}

		private onToggleCompleteAll=()=>
		{
			this.props.store.toggleCompleteAll();
		}

		render()
		{
			DynamicComponent.setDependencies(this, [this.props.store.todos.childListCallbacks]);

			var todos = this.props.store.todos.getObjects(Todo).map(todo => {
				var name = this.props.store.todos.getName(todo);
				return <TodoItem key={name} store={this.props.store} todo={todo}/>;
			});

			return (
				<section id="main">
					<input
						id="toggle-all"
						type="checkbox"
						onChange={this.onToggleCompleteAll}
						checked={this.props.store.checkAllComplete()}
					/>
					<label htmlFor="toggle-all">Mark all as complete</label>
					<ul id="todo-list">{todos}</ul>
				</section>
			);
		}
	}
}