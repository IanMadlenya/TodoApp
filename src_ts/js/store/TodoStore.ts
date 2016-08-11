import * as weavejs from "weavejs";
import {Weave} from "weavejs";
import Dispatcher from "../dispatcher/Dispatcher";
import Todo from "../Todo";

import LinkableHashMap = weavejs.core.LinkableHashMap;
import LinkableBoolean = weavejs.core.LinkableBoolean;

class TodoStore
{
	private todos = Weave.linkableChild(this, new LinkableHashMap(Todo), this.handleComplete);
	private areAllComplete = Weave.linkableChild(this, LinkableBoolean);

	public addChangeListener(callback:Function)
	{
		Weave.getCallbacks(this).addGroupedCallback(this, callback);
	}

	public removeChangeListener(callback:Function)
	{
		Weave.getCallbacks(this).removeCallback(this, callback);
	}

	public getAll()
	{
		return this.todos.getObjects().map((todo:Todo) => {
			return {
				id: this.todos.getName(todo),
				text: todo.text.value,
				complete: todo.complete.value
			};
		});
	}

	public getAreAllComplete()
	{
		return this.areAllComplete.value;
	}

	private handleComplete()
	{
		if(this.checkAllComplete())
			this.areAllComplete.value = true;
		else
			this.areAllComplete.value = false;
	}

	private checkAllComplete()
	{
		var todoList = this.todos.getObjects();
		if(!todoList.length)
			return false;

		for(var todo of todoList)
		{
			if(!todo.complete.value)
				return false;
		}
		return true;
	}

	private updateAll(value:boolean)
	{
		this.todos.getObjects().forEach((todo:Todo) => {
			todo.complete.value = value;
		});
	}

	public create(text:string)
	{
		var todos = this.todos;

		text = text.trim();
		if (text !== '')
		{
			var newTodo = todos.requestObject(todos.generateUniqueName("Todo"), Todo) as Todo;
			newTodo.text.value = text;
		}
	}

	public destroy(id:string)
	{
		this.todos.removeObject(id);
	}

	public destroyCompleted()
	{
		this.todos.getObjects().forEach((todo:Todo)  => {
			if(todo.complete.value)
				this.todos.removeObject(this.todos.getName(todo));
		});
	}

	public updateText(id:string, text:string)
	{
		var todo = this.todos.getObject(text) as Todo;
		todo.text.value = text;
	}

	public toggleCompleteAll()
	{
		if(this.checkAllComplete())
			this.updateAll(false);
		else
			this.updateAll(true);
	}

	public toggleComplete(id:string)
	{
		var todo = this.todos.getObject(id) as Todo;
		todo.complete.value = !todo.complete.value;
	}
}
Weave.registerClass(TodoStore, "TodoAppTodoStore");
export default Dispatcher.root.requestObject("TodoStore", TodoStore, true);