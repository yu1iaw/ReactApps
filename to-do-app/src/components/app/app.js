import React, { useEffect, useState } from 'react';
import Header from '../app-header/header';
import Filter from '../app-filter/filter';
import Search from '../app-search/search';
import ToDoList from '../app-to-do-list/app-to-do-list';
import AddTask from '../app-task-add/app-task.add';

import './app.css';

const App = () => {
    const addData = [
        {task: 'створити нову поліфонічну партію', asap: false, done: false, id: 1},
        {task: 'звести паркан навколо будинку', asap: false, done: true, id: 2},
        {task: 'написати про "без меж"', asap: false, done: false, id: 3},
        {task: 'знайти нових корисних дурнів в соц.мережах', asap: true, done: false, id: 4},
        {task: 'докупити решту ЗМІ', asap: false, done: false, id: 5},
        {task: 'відпочити на Мальдівах, бо втомився від новин', asap: false, done: false, id: 6}
    ];
    const initData = JSON.parse(sessionStorage.getItem('tasks')) || addData;

    const [data, setData] = useState(initData);
    const [row, setRow] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        sessionStorage.setItem('tasks', JSON.stringify(data));
    }, [data])


    const deleteTask = id => {
        const newArr = data.filter(item => item.id !== id)
        setData(newArr);
    }

    const addTask = (task, id) => {
        const newTask = {
            task,
            asap: false,
            done: false,
            id: id
        };

        setData(data => [...data, newTask]);
    }

    const onToggleAsap = (id) => {
        const index = data.findIndex(elem => elem.id === id);
        const old = data[index];
        const newItem = {...old, asap: !old.asap};
        const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

        setData(newArr);
    }

    const onToggleDone = (id) => {
        const toggleArr = data.map(item => {
            if (item.id === id) {
                return {...item, done: !item.done};
            }
            return item;
        })
      
        setData(toggleArr);
    }

    const searchTask = (items, row) => {
        if (row.length === 0) return items;

        return items.filter(item => item.task.indexOf(row) > -1);
    }

    const onUpdateSearch = (row) => {
        setRow(row);
    }

    const filterTask = (items, filter) => {
        switch(filter) {
            case 'priority':
                return items.filter(item => {
                    if (item.done) return;
                    return item.asap;
                });
            case 'complete':
                return items.filter(item => item.done);
            default:
                return items;
        }
    }

    const onFilterSelect = (filter) => {
        setFilter(filter);
    }


    const tasks = data.length;
    const priority = data.filter(item => {
        if (item.done) return;
        return item.asap;
    }).length;
    const filteredData = filterTask(searchTask(data, row), filter);

    return (
        <div className="app shadow">
            <Header>
                <h1>To-Do-List</h1>
                <h2>Кількість завдань: {tasks}</h2>
                <h2>Першочергові завдання: {priority}</h2>
            </Header>
            <div className="search shadow">
                <Search onUpdateSearch={onUpdateSearch}/>
                <Filter filter={filter}
                        onFilterSelect={onFilterSelect}/>
            </div>
           <ToDoList
             data={filteredData}
             onDelete={deleteTask}
             onToggleAsap={onToggleAsap}
             onToggleDone={onToggleDone}/>
            <AddTask onAdd={addTask}/>
        </div>
    ) 
}

export default App;