import * as React from "react";
import * as weavejs from "weavejs";
import classNames from "classnames";
import TodoTextInput from "./TodoTextInput";
import TodoActions from "../actions/TodoActions";
import Dispatcher from "../dispatcher/Dispatcher";

var CenteredIcon = weavejs.ui.CenteredIcon;

export interface HeaderProps
{
}

export interface HeaderState
{
}

export default class Header extends React.Component<HeaderProps, HeaderState>
{
	private onSave=(text:string)=>
	{
		TodoActions.create(text);
	}

	private undo=()=>
	{
		Dispatcher.history.undo();
	}

	private redo=()=>
	{
		Dispatcher.history.redo();
	}

	render()
	{
		return (
			<header id="header">
				<h1>todos</h1>
				<TodoTextInput
					id="new-todo"
					placeholder="What needs to be done?"
					onSave={this.onSave}
				/>
				<div style={{float: "right"}}>
					<CenteredIcon aria-label="Undo"
								  onClick={this.undo}
								  className={classNames("weave-icon")}
								  iconProps={{className: "fa fa-arrow-left"}}/>

					<CenteredIcon aria-label="Redo"
								  onClick={this.redo}
								  className={classNames("weave-icon")}
								  iconProps={{className:"fa fa-arrow-right"}}/>
				</div>
			</header>
		);
	}
}