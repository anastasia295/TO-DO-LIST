import { useEffect, useState } from 'react';
import './App.css';
import { Form } from './components/Form';
import List from './components/List';
import FilterBar from './components/FilterBar';
import { TTodo } from './types/types';
import { filterTodos } from './utils/filterTodos';
import { loadTodos, saveTodos } from './store/localstorage';

function App() {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [priority, setPriority] = useState(0);
    const [deadline, setDeadline] = useState(0);
    const [tags, setTags] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const filteredTodos = filterTodos(todos, search, priority, deadline, tags);

    useEffect(() => {
        loadTodos(setTodos);
    }, []);

    const addTodo = (todo: TTodo) => {
        const isDuplicate = todos.some(
            (existingTodo) =>
                existingTodo.title === todo.title &&
                existingTodo.dueDate === todo.dueDate
        );

        if (isDuplicate) {
            setErrorMessage(
                'Задача с таким названием и сроком выполнения уже существует'
            );
            return;
        }

        const newTodos = [...todos, todo];
        saveTodos(newTodos, setTodos);
        setErrorMessage('');
    };

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        saveTodos(newTodos, setTodos);
    };

    const editTodo = (id: string, updatedTodo: TTodo) => {
        saveTodos(
            todos.map((t) => (t.id === id ? updatedTodo : t)),
            setTodos
        );
    };

    return (
        <div className="wrapper">
            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}
            <FilterBar
                search={search}
                setSearch={setSearch}
                setIsOpen={setIsOpen}
                setPriority={setPriority}
                setDeadline={setDeadline}
                deadline={deadline}
                priority={priority}
                tags={tags}
                setTags={setTags}
            />
            <Form
                addTodo={addTodo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                todos={todos}
            />
            <List
                todos={filteredTodos}
                setTodos={setTodos}
                onDelete={deleteTodo}
                editTodo={editTodo}
            />
        </div>
    );
}

export default App;
