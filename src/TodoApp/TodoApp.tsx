namespace TodoApp
{

	import DynamicComponent = weavejs.ui.DynamicComponent;
	import Header = TodoApp.components.Header;
	import MainSection = TodoApp.components.MainSection;
	import Footer = TodoApp.components.Footer;

	export interface TodoAppProps
	{
	}

	export interface TodoState
	{
		id: string;
		text: string;
		complete: boolean;
	}

	export interface TodoAppState
	{
		allTodos: TodoState[];
		areAllComplete: boolean;
	}

	export class App extends React.Component<TodoAppProps, TodoAppState>
	{
		weave = Weave.disposableChild(this, Weave);
		todoStore = this.weave.root.requestObject("TodoStore", TodoStore, true);

		constructor(props:TodoAppProps)
		{
			super(props);
			DynamicComponent.setDependencies(this, [this.todoStore]);
		}

		render()
		{
			return (
				<div style={{display: "flex", flex: 1, flexDirection: "column"}}>
					<Header store={this.todoStore}/>
					<MainSection store={this.todoStore}/>
					<Footer store={this.todoStore}/>
				</div>
			);
		}
	}
}