import {useEffect, useReducer} from "react";
import {todoReducer} from "./todoReducer";

const initialState = [];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    /*
   * useReduce
   * Tiene 3 parametros
   * metodo reducer -> todoReducer()
   * stado inicial -> initialState
   * datos iniciales -> init
   * */
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        //Para guardar datos en el localstorage
        //Solo se puede guardar strings
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    //Cuando se emita onNeewTodo llame handleNewTodo
    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        //dispatch -> Es la función que se va ha usar para enviar la acción
        dispatch(action);

    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }
        dispatch(action);
    }

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }
        dispatch(action);
    }

    const getPendingTodos = () => {
        return todos.filter(todo => (!todo.done)).length;
    }

    return {
        ...todos,
        todos,
        todosCount: todos.length,
        pendingTodosCount: getPendingTodos(),
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}