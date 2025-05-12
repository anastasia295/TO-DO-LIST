import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PRIORITIES, TAGS } from '../../constants/constants';
import MultiSelect from '../../shared/MultiSelect';
import { Modal } from '../../shared/Modal';
import styles from './index.module.css';
import { TFormProps } from '../../types/types';

export const Form: React.FC<TFormProps> = ({
    addTodo,
    setIsOpen,
    isOpen,
    editTodo,
    todo,
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<number>(1);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setDueDate(todo.dueDate);
            setPriority(todo.priority);
            setTags(todo.tags);
        } else {
            resetForm();
        }
    }, [todo]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo) {
            editTodo?.(todo.id, {
                id: todo.id,
                title,
                description,
                dueDate,
                priority,
                tags,
            });
        } else {
            const id = uuidv4();
            if (addTodo) {
                addTodo({
                    id,
                    title,
                    description,
                    dueDate,
                    priority,
                    tags,
                });
            }
        }
        setIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority(1);
        setTags([]);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <h1 className={styles.title}>
                            {todo ? 'Редактируйте задачу' : 'Добавьте задачу'}
                        </h1>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название задачи"
                            required
                            autoFocus
                            aria-required="true"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Введите описание задачи"
                            aria-label="Описание задачи"
                        />
                        <MultiSelect
                            options={TAGS}
                            value={tags}
                            onChange={setTags}
                            placeholder="Выберите теги"
                            aria-label="Выберите теги для задачи"
                        />
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            aria-required="true"
                        />
                        <select
                            className={styles.select}
                            value={priority}
                            onChange={(e) => setPriority(+e.target.value)}
                            aria-label="Выберите приоритет задачи"
                        >
                            {PRIORITIES.map(({ value, name }) => (
                                <option key={value} value={value}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <button className={styles.button} type="submit">
                            {todo ? 'Сохранить изменения' : 'Добавить задачу'}
                        </button>
                    </form>
                </Modal>
            )}
        </>
    );
};
