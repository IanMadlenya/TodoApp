namespace TodoApp.components
{
	import LinkableHashMap = weavejs.core.LinkableHashMap;
	import WeavePath = weavejs.path.WeavePath;
	import WeaveReactUtils = weavejs.util.WeaveReactUtils;
	import LinkableWatcher = weavejs.core.LinkableWatcher;
	import DynamicComponent = weavejs.ui.DynamicComponent;

	interface FooterProps
	{
		allTodos:LinkableHashMap;
	}

	interface FooterState
	{

	}

	export class Footer extends React.Component<FooterProps, FooterState>
	{
		constructor(props:FooterProps)
		{
			super(props);
			DynamicComponent.setDependencies(this, [props.allTodos]);
		}

		get allTodos()
		{
			return this.props.allTodos;
		}
		/**
		 * Event handler to delete all completed TODOs
		 */
		_onClearCompletedClick=()=>
		{
			TodoApp.App.destroyCompleted(this.allTodos);
		}

		render()
		{

			var total = this.allTodos.getNames().length;

			if (total === 0) {
				return null;
			}

			var completed = 0;

			this.allTodos.getObjects().forEach((todo:Todo) => {
				if(todo.complete.value)
					completed++;
			});

			var itemsLeft = total - completed;
			var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
			itemsLeftPhrase += 'left';

			// Undefined and thus not rendered if no completed items are left.
			var clearCompletedButton:JSX.Element;
			if (completed) {
				clearCompletedButton =
					<button
						id="clear-completed"
						onClick={this._onClearCompletedClick}>
						Clear completed ({completed})
					</button>;
			}

			return (
				<footer id="footer">
        			<span id="todo-count">
						<strong>
							{itemsLeft}
						</strong>
							{itemsLeftPhrase}
			        </span>
					{clearCompletedButton}
				</footer>
			);
		}
	}
}