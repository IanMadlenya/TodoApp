import * as weavejs from "weavejs";
import {Weave} from "weavejs";

import LinkableString = weavejs.core.LinkableString;
import LinkableBoolean = weavejs.core.LinkableBoolean;

export default class Todo
{
	text = Weave.linkableChild(this, LinkableString);
	complete = Weave.linkableChild(this, LinkableBoolean);
}
Weave.registerClass(Todo, "weavejs.app.TodoApp.Todo", null, "Todo");