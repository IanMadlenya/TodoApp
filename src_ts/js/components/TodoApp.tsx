import * as React from "react";
import MainSection from "./MainSection";
import Header from "./Header";
import TodoStore from "../store/TodoStore";
import Footer from "./Footer";

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

export default class TodoApp extends React.Component<TodoAppProps, TodoAppState>
{
	constructor(props:TodoAppProps)
	{
		super(props);
		this.state = this.getTodoState();
	}
	/**
	 * Retrieve the current TODO data from the TodoStore
	 */
	private getTodoState() {
		return {
			allTodos: TodoStore.getAll(),
			areAllComplete: TodoStore.getAreAllComplete()
		}
	}

	componentDidMount()
	{
		TodoStore.addChangeListener(this.onChange);
	}

	componentWillUnmount()
	{
		TodoStore.removeChangeListener(this.onChange);
	}

	private onChange=()=>
	{
		this.setState(this.getTodoState());
	}

	render()
	{
		return (
			<div style={{display: "flex", flex: 1, flexDirection: "column"}}>
				<Header/>
				<MainSection allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete}/>
				<Footer allTodos={this.state.allTodos}/>
			</div>
		);
	}
}