import * as React from "react";
import TodoItem from "./TodoItem";
import TodoActions from "../actions/TodoActions";
import {TodoState} from "./TodoApp";

export interface MainSectionProps
{
	allTodos:TodoState[];
	areAllComplete:boolean;
}

export interface MainSectionState
{

}

export default class MainSection extends React.Component<MainSectionProps, MainSectionState>
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