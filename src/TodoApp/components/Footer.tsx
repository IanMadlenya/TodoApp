namespace TodoApp.components
{
	import DynamicComponent = weavejs.ui.DynamicComponent;

	interface FooterProps
	{
		store:TodoStore;
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
			this.props.store.destroyCompleted();
		}

		render()
		{
			DynamicComponent.setDependencies(this, [this.props.store]);

			var todos = this.props.store.todos.getObjects(Todo);

			// do not render footer if there are no items
			if (todos.length == 0)
				return null;

			// count the number of completed items
			var completed = 0;
			todos.forEach(todo => {
				if (todo.complete.value)
					completed++;
			});

			var itemsLeft = todos.length - completed;
			var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
			itemsLeftPhrase += 'left';

			// Undefined and thus not rendered if no completed items are left.
			var clearCompletedButton:JSX.Element;
			if (completed)
			{
				clearCompletedButton = (
					<button
						id="clear-completed"
						onClick={this._onClearCompletedClick}>
						Clear completed ({completed})
					</button>
				);
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