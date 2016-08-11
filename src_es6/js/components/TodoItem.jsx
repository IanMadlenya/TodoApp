import * as React from "react";
import classNames from "classnames";
import Todo from "../Todo";
import TodoActions from "../actions/TodoActions";
import TodoTextInput from "./TodoTextInput";
export default class TodoItem extends React.Component {
    /**
     * Copyright (c) 2014-2015, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     */
    constructor(props) {
        super(props);
        this.onToggleComplete = () => {
            TodoActions.toggleComplete(this.props.todo.id);
        };
        this.onDoubleClick = () => {
            this.setState({ isEditing: true });
        };
        /**
         * Event handler called within TodoTextInput.
         * Defining this here allows TodoTextInput to be used in multiple places
         * in different ways.
         * @param  {string} text
         */
        this.onSave = (text) => {
            TodoActions.updateText(this.props.todo.id, text);
            this.setState({ isEditing: false });
        };
        this.state = {
            isEditing: false
        };
    }
    /**
     * @return {object}
     */
    render() {
        var input;
        if (this.state.isEditing) {
            input =
                <TodoTextInput className="edit" onSave={this.onSave} value={this.props.todo.text}/>;
        }
        // List items should get the class 'editing' when editing
        // and 'completed' when marked as completed.
        // Note that 'completed' is a classification while 'complete' is a state.
        // This differentiation between classification and state becomes important
        // in the naming of view actions toggleComplete() vs. destroyCompleted().
        return (<li className={classNames({
            'completed': this.props.todo.complete,
            'editing': this.state.isEditing
        })}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={this.props.todo.complete} onChange={this.onToggleComplete}/>
					<label onDoubleClick={this.onDoubleClick}>
						{this.props.todo.text}
					</label>
					<button className="destroy" onClick={this.props.onDestroyClick}/>
				</div>
				{input}
			</li>);
    }
}
Weave.registerClass(Todo, "weavejs.app.TodoApp.Todo", null, "Todo");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9kb0l0ZW0uanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjX3RzL2pzL2NvbXBvbmVudHMvVG9kb0l0ZW0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU87T0FFdkIsVUFBVSxNQUFNLFlBQVk7T0FDNUIsSUFBSSxNQUFNLFNBQVM7T0FDbkIsV0FBVyxNQUFNLHdCQUF3QjtPQUN6QyxhQUFhLE1BQU0saUJBQWlCO0FBYTNDLHNDQUFzQyxLQUFLLENBQUMsU0FBUztJQUVwRDs7Ozs7OztPQU9HO0lBRUgsWUFBWSxLQUFtQjtRQUU5QixNQUFNLEtBQUssQ0FBQyxDQUFDO1FBTU4scUJBQWdCLEdBQUM7WUFFeEIsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUE7UUFFTyxrQkFBYSxHQUFDO1lBRXJCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUE7UUFFRDs7Ozs7V0FLRztRQUNLLFdBQU0sR0FBQyxDQUFDLElBQVc7WUFFMUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQTtRQXpCQSxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1osU0FBUyxFQUFFLEtBQUs7U0FDaEIsQ0FBQztJQUNILENBQUM7SUF3QkQ7O09BRUc7SUFDSCxNQUFNO1FBQ0wsSUFBSSxLQUFpQixDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxQixLQUFLO2dCQUNKLENBQUMsYUFBYSxDQUNiLFNBQVMsQ0FBQyxNQUFNLENBQ2hCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDcEIsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzNCLENBQUM7UUFDTCxDQUFDO1FBRUQseURBQXlEO1FBQ3pELDRDQUE0QztRQUM1Qyx5RUFBeUU7UUFDekUsMEVBQTBFO1FBQzFFLHlFQUF5RTtRQUN6RSxNQUFNLENBQUMsQ0FDTixDQUFDLEVBQUUsQ0FDRixTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDdEIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztTQUM5QixDQUFDLENBQUMsQ0FFSDtJQUFBLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQ3BCO0tBQUEsQ0FBQyxLQUFLLENBQ0wsU0FBUyxDQUFDLFFBQVEsQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FDZixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDbEMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBRWpDO0tBQUEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUN4QztNQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUN0QjtLQUFBLEVBQUUsS0FBSyxDQUNQO0tBQUEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUNoRTtJQUFBLEVBQUUsR0FBRyxDQUNMO0lBQUEsQ0FBQyxLQUFLLENBQ1A7R0FBQSxFQUFFLEVBQUUsQ0FBQyxDQUNMLENBQUM7SUFDSCxDQUFDO0FBQ0YsQ0FBQztBQUNELEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtUb2RvU3RhdGV9IGZyb20gXCIuL1RvZG9BcHBcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgVG9kbyBmcm9tIFwiLi4vVG9kb1wiO1xuaW1wb3J0IFRvZG9BY3Rpb25zIGZyb20gXCIuLi9hY3Rpb25zL1RvZG9BY3Rpb25zXCI7XG5pbXBvcnQgVG9kb1RleHRJbnB1dCBmcm9tIFwiLi9Ub2RvVGV4dElucHV0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9kb0l0ZW1Qcm9wc1xue1xuXHR0b2RvOlRvZG9TdGF0ZTtcblx0b25EZXN0cm95Q2xpY2s/OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRvZG9JdGVtU3RhdGVcbntcblx0aXNFZGl0aW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUb2RvSXRlbVByb3BzLCBUb2RvSXRlbVN0YXRlPlxue1xuXHQvKipcblx0ICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG5cdCAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cdCAqXG5cdCAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuXHQgKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcblx0ICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG5cdCAqL1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzOlRvZG9JdGVtUHJvcHMpXG5cdHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGlzRWRpdGluZzogZmFsc2Vcblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBvblRvZ2dsZUNvbXBsZXRlPSgpPT5cblx0e1xuXHRcdFRvZG9BY3Rpb25zLnRvZ2dsZUNvbXBsZXRlKHRoaXMucHJvcHMudG9kby5pZCk7XG5cdH1cblxuXHRwcml2YXRlIG9uRG91YmxlQ2xpY2s9KCk9PlxuXHR7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNFZGl0aW5nOiB0cnVlfSk7XG5cdH1cblxuXHQvKipcblx0ICogRXZlbnQgaGFuZGxlciBjYWxsZWQgd2l0aGluIFRvZG9UZXh0SW5wdXQuXG5cdCAqIERlZmluaW5nIHRoaXMgaGVyZSBhbGxvd3MgVG9kb1RleHRJbnB1dCB0byBiZSB1c2VkIGluIG11bHRpcGxlIHBsYWNlc1xuXHQgKiBpbiBkaWZmZXJlbnQgd2F5cy5cblx0ICogQHBhcmFtICB7c3RyaW5nfSB0ZXh0XG5cdCAqL1xuXHRwcml2YXRlIG9uU2F2ZT0odGV4dDpzdHJpbmcpPT5cblx0e1xuXHRcdFRvZG9BY3Rpb25zLnVwZGF0ZVRleHQodGhpcy5wcm9wcy50b2RvLmlkLCB0ZXh0KTtcblx0XHR0aGlzLnNldFN0YXRlKHtpc0VkaXRpbmc6IGZhbHNlfSk7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybiB7b2JqZWN0fVxuXHQgKi9cblx0cmVuZGVyKCkge1xuXHRcdHZhciBpbnB1dDpKU1guRWxlbWVudDtcblx0XHRpZiAodGhpcy5zdGF0ZS5pc0VkaXRpbmcpIHtcblx0XHRcdGlucHV0ID1cblx0XHRcdFx0PFRvZG9UZXh0SW5wdXRcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJlZGl0XCJcblx0XHRcdFx0XHRvblNhdmU9e3RoaXMub25TYXZlfVxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLnRvZG8udGV4dH1cblx0XHRcdFx0Lz47XG5cdFx0fVxuXG5cdFx0Ly8gTGlzdCBpdGVtcyBzaG91bGQgZ2V0IHRoZSBjbGFzcyAnZWRpdGluZycgd2hlbiBlZGl0aW5nXG5cdFx0Ly8gYW5kICdjb21wbGV0ZWQnIHdoZW4gbWFya2VkIGFzIGNvbXBsZXRlZC5cblx0XHQvLyBOb3RlIHRoYXQgJ2NvbXBsZXRlZCcgaXMgYSBjbGFzc2lmaWNhdGlvbiB3aGlsZSAnY29tcGxldGUnIGlzIGEgc3RhdGUuXG5cdFx0Ly8gVGhpcyBkaWZmZXJlbnRpYXRpb24gYmV0d2VlbiBjbGFzc2lmaWNhdGlvbiBhbmQgc3RhdGUgYmVjb21lcyBpbXBvcnRhbnRcblx0XHQvLyBpbiB0aGUgbmFtaW5nIG9mIHZpZXcgYWN0aW9ucyB0b2dnbGVDb21wbGV0ZSgpIHZzLiBkZXN0cm95Q29tcGxldGVkKCkuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxsaVxuXHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuXHRcdFx0XHQnY29tcGxldGVkJzogdGhpcy5wcm9wcy50b2RvLmNvbXBsZXRlLFxuXHRcdFx0XHQnZWRpdGluZyc6IHRoaXMuc3RhdGUuaXNFZGl0aW5nXG5cdFx0XHRcdH0pfVxuXHRcdFx0PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInZpZXdcIj5cblx0XHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInRvZ2dsZVwiXG5cdFx0XHRcdFx0XHR0eXBlPVwiY2hlY2tib3hcIlxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17dGhpcy5wcm9wcy50b2RvLmNvbXBsZXRlfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25Ub2dnbGVDb21wbGV0ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxsYWJlbCBvbkRvdWJsZUNsaWNrPXt0aGlzLm9uRG91YmxlQ2xpY2t9PlxuXHRcdFx0XHRcdFx0e3RoaXMucHJvcHMudG9kby50ZXh0fVxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJkZXN0cm95XCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkRlc3Ryb3lDbGlja30vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0e2lucHV0fVxuXHRcdFx0PC9saT5cblx0XHQpO1xuXHR9XG59XG5XZWF2ZS5yZWdpc3RlckNsYXNzKFRvZG8sIFwid2VhdmVqcy5hcHAuVG9kb0FwcC5Ub2RvXCIsIG51bGwsIFwiVG9kb1wiKTtcblxuIl19