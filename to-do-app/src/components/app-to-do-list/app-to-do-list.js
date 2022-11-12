import React from 'react';
import ToDoItem from '../app-to-do-item/app-to-do-item';

import './app-to-do-list.css';

const ToDoList = ({data, onDelete, onToggleAsap, onToggleDone}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <ToDoItem
                 key={id}
                 /*task={item.task}*/
                 {...itemProps} // spread
                 onRemove={() => onDelete(id)}
                 onProgress={() => onToggleAsap(id)}
                 onComplete={() => onToggleDone(id)}/> 
        )
    })

    return (
        <ul className="app-list list-group shadow">
           {elements}
        </ul>
    )
}

export default ToDoList;