namespace TodoApp.components
{
	import LinkableHashMap = weavejs.core.LinkableHashMap;
	import WeavePath = weavejs.path.WeavePath;
	import WeaveReactUtils = weavejs.util.WeaveReactUtils;
	import LinkableWatcher = weavejs.core.LinkableWatcher;
	import DynamicComponent = weavejs.ui.DynamicComponent;
	import TodoActions = TodoApp.actions.TodoActions;

	interface FooterProps
	{
		allTodos:TodoState[];
	}

	interface FooterState
	{

	}

	export class Footer extends React.Component<FooterProps, FooterState>
	{
		constructor(props:FooterProps)
		{
			super(props);
		}

		/**
		 * Event handler to delete all completed TODOs
		 */
		_onClearCompletedClick=()=>
		{
			TodoActions.destroyCompleted();
		}

		render()
		{
			var total = this.props.allTodos.length;

			if (total === 0) {
				return null;
			}

			var completed = 0;

			this.props.allTodos.forEach((todo:TodoState) => {
				if(todo.complete)
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