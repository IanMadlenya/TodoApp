/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
namespace TodoApp.components
{
	import TodoTextInput = TodoApp.components.TodoTextInput;
	import CenteredIcon = weavejs.ui.CenteredIcon;

	export interface HeaderProps
	{
		onCreate:(text:string)=>void;
		undo:()=>void;
		redo:()=>void;
	}

	export interface HeaderState
	{

	}

	export class Header extends React.Component<HeaderProps, HeaderState>
	{
		private onSave=(text:string)=>
		{
			this.props.onCreate(text);
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
									  onClick={this.props.undo}
									  className={classNames("weave-icon")}
									  iconProps={{className: "fa fa-arrow-left"}}/>

						<CenteredIcon aria-label="Redo"
									  onClick={this.props.redo}
									  className={classNames("weave-icon")}
									  iconProps={{className:"fa fa-arrow-right"}}/>
					</div>
				</header>
			);
		}
	}
}