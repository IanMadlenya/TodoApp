namespace TodoApp.components
{

	export interface TodoTextInputProps
	{
		onSave:Function;
		className?:string;
		id?: string;
		placeholder?: string;
		value?:string;
	}

	export interface TodoTextInputState
	{
		value:string;
	}

	export class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState>
	{

		constructor(props:TodoTextInputProps)
		{
			super(props);
			this.state = {
				value: this.props.value || ''
			}
		}

		/**
		 * Invokes the callback passed in as onSave, allowing this component to be
		 * used in different ways.
		 */
		private save=()=>
		{
			this.props.onSave(this.state.value);
			this.setState({
				value: ''
			});
		}

		/**
		 *
		 * @param event
		 * @private
		 */
		private onChange=(event:React.FormEvent)=>
		{
			this.setState({
				value: (event.target as HTMLInputElement).value
			});
		}

		/**
		 * @param event
		 * @private
		 */
		private onKeyDown=(event:React.KeyboardEvent)=>
		{
			if (event.keyCode === weavejs.util.KeyboardUtils.KEYCODES.ENTER) {
				this.save();
			}
		}

		render()
		{
			return (
				<input
					className={this.props.className}
					id={this.props.id}
					placeholder={this.props.placeholder}
					onBlur={this.save}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					value={this.state.value}
					autoFocus={true}
				/>
			);
		}
	}
}