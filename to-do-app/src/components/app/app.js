import React from 'react';
import Header from '../app-header/header';
import Filter from '../app-filter/filter';
import Search from '../app-search/search';
import ToDoList from '../app-to-do-list/app-to-do-list';
import AddTask from '../app-task-add/app-task.add';

import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {task: 'створити нову поліфонічну партію', asap: false, done: false, id: 1},
                {task: 'звести паркан навколо будинку', asap: false, done: true, id: 2},
                {task: 'написати про "без меж"', asap: false, done: false, id: 3},
                {task: 'знайти нових корисних дурнів в соц.мережах', asap: true, done: false, id: 4},
                {task: 'докупити решту ЗМІ', asap: false, done: false, id: 5},
                {task: 'відпочити на Мальдівах, бо втомився від новин', asap: false, done: false, id: 6}
            ],
            row: '',
            filter: 'all'
        }
        this.maxId = 7;
        
    }
 

    deleteTask = id => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            }
            // return {
            //     data: data.filter(item => item.id !== id)
            // }
        })

    }

    addTask = (task) => {
        const newTask = {
            task,
            asap: false,
            done: false,
            id: this.maxId++
        };

        this.setState(({data}) => {
            const newArr = [...data, newTask];
            return {
                data: newArr
            }
        })
    }

    onToggleAsap = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, asap: !old.asap};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, done: !item.done};
                }
                return item;
            })
        }))
    }

    searchTask = (items, row) => {
        if (row.length === 0) return items;

        return items.filter(item => item.task.indexOf(row) > -1);
    }

    onUpdateSearch = (row) => {
        this.setState({row: row})
    }

    filterTask = (items, filter) => {
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

    onFilterSelect = (filter) => {
        this.setState({filter})
    }


   render() {
    const tasks = this.state.data.length;
    const priority = this.state.data.filter(item => {
        if (item.done) return;
        return item.asap;
    }).length;
    const filteredData = this.filterTask(this.searchTask(this.state.data, this.state.row), this.state.filter);

    return (
        <div className="app shadow">
            <Header>
                <h1>To-Do-List</h1>
                <h2>Кількість завдань: {tasks}</h2>
                <h2>Першочергові завдання: {priority}</h2>
            </Header>
            <div className="search shadow">
                <Search onUpdateSearch={this.onUpdateSearch}/>
                <Filter filter={this.state.filter}
                        onFilterSelect={this.onFilterSelect}/>
            </div>
           <ToDoList
             data={filteredData}
             onDelete={this.deleteTask}
             onToggleAsap={this.onToggleAsap}
             onToggleDone={this.onToggleDone}/>
            <AddTask onAdd={this.addTask}/>
        </div>
    )
   }
}

export default App;