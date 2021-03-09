import logo from './logo.svg';
import './bulma.css';
import './App.css';
import React from 'react';
import { useState } from 'react';
import ColorPicker from './ColorPicker'


function App() {
    const TodoItem = ({todo, setTodo, deleteTodo, ...props}) => {
        const [isEditable, setIsEditable] = useState(false);

        const setValue = (value) => setTodo({isDone: todo.isDone, value: value});
        const setIsDone = (checked) => setTodo({isDone: checked, value: todo.value});

        return (
            <div className={todo.isDone ? 'panel-block list-item itemIsDone' : 'panel-block list-item' }>
                <div className='full-width'>
                    <label className="checkbox">
                        <input
                            type='checkbox'
                            checked={todo.isDone}
                            onChange={e => setIsDone(e.target.checked)}
                        />
                    </label>
                    {isEditable ?
                        <input
                            autoFocus
                            value={todo.value}
                            onChange={e => setValue(e.target.value)}
                            onBlur={e => setIsEditable(false)}
                            className='input is-small item-input'
                        /> :
                        <label onClick={() => setIsEditable(true)}>{todo.value}</label>
                    }
                </div>
                <button
                    onClick={deleteTodo}
                    className='is-small delete'>
                </button>
            </div>
        )
    }

    const TodoItemList = ({list, setList, deleteList, ...props}) => {

        const [newTodoItem, setNewTodoItem] = useState('');

        const addTodo = (todo) => {
            setList({
                name: list.name,
                color: list.color,
                todos: list.todos.concat([{value: todo, isDone: false}])
            });
            setNewTodoItem('');
        }

        const handleColorChange = ({ hex }) => setList({name: list.name, color: hex, todos: list.todos});

        return (
            <div className='column is-one-quarter'>
                <div className='panel'>
                    <div className='panel-heading'
                         style={{'background-color': list.color}}>
                            <div className='level'>
                                <div className='level-left'>
                                    <label>{list.name}</label>
                                </div>
                                <div className='level-right'>
                                    <div className='level-item'>
                                        <ColorPicker
                                            color={list.color}
                                            onChangeComplete={ handleColorChange }
                                        />
                                    </div>
                                    <button
                                        onClick={deleteList}
                                        className='level-item delete'>
                                    </button>
                                </div>
                            </div>
                    </div>
                    <div className='panel-block'>
                        <div className='full-width'>
                            <div className='field has-addons'>
                                <div className='control is-expanded'>
                                    <input
                                        className='input'
                                        type='text'
                                        placeholder='New task...'
                                        onChange={e => setNewTodoItem(e.target.value)}
                                    />
                                </div>
                                <div className='control'>
                                    <button className='button'  onClick={() => addTodo(newTodoItem)}>
                                    <span className='icon is-small'>
                                        <i className='fas fa-plus'/>
                                    </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {list.todos.map((todo, i) =>
                        <TodoItem
                            key={i}
                            todo={list.todos[i]}
                            setTodo={val => setList({
                                name: list.name,
                                color: list.color,
                                todos: list.todos.slice(0, i).concat([val]).concat(list.todos.slice(i + 1))})}
                            deleteTodo={() => setList({
                                name: list.name,
                                color: list.color,
                                todos: list.todos.slice(0, i).concat(list.todos.slice(i + 1))})}
                        />)}
                </div>
            </div>
        )
    }

    const [todoLists, setTodoLists] = useState([]);

    const [newTodoList, setNewTodoList] = useState('');

    const addNewTodoListHandler = (listName) => {
        setTodoLists(todoLists.concat([{
            name: listName,
            color: '#ededed',
            todos: []
        }]));
        setNewTodoList('');
    }

    return (
        <div className="App">
            <div className='container'>
                <div className='columns is-multiline'>
                    {todoLists.map((list, i) =>
                        <TodoItemList
                            key={i}
                            list={todoLists[i]}
                            setList = {val => setTodoLists(todoLists.slice(0, i).concat([val]).concat(todoLists.slice(i + 1)))}
                            deleteList={e => setTodoLists(todoLists.slice(0, i).concat(todoLists.slice(i + 1)))}
                        />)}
                    <div className='column is-one-quarter'>
                        <div className='panel full-height'>
                            <div className='panel-heading'>
                                Add new list
                            </div>
                            <div className='add-new-list'>
                                <div className='block'>
                                    <input
                                        value={newTodoList}
                                        className='input'
                                        placeholder='List name...'
                                        onChange={e => setNewTodoList(e.target.value)}
                                    />
                                </div>
                                <div className='block'>
                                    <button className='button full-width full-height'
                                            onClick={() => addNewTodoListHandler(newTodoList)}>
                                        <i className="fas fa-plus fa-2x"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
