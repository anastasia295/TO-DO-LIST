import React, { useState } from 'react';
import DeleteIcon from '../../assets/delete.svg';
import EditIcon from '../../assets/edit.svg';
import { Form } from '../Form';
import styles from './index.module.css';
import { PRIORITIES_MAP } from '../../constants/constants';
import { isDeadlineMissed } from '../../utils/isDeadlineMissed';
import { TTodoListProps } from '../../types/types';

const Card: React.FC<TTodoListProps> = ({
    todo,
    onDelete,
    editTodo,
    onDragStart,
    onDragOver,
    onDrop,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEdit = () => {
        setIsOpen(true);
    };

    const handleDelete = () => {
        if (todo?.id) {
            onDelete(todo.id);
        }
    };

    let isMissed;
    if (todo?.dueDate) {
        isMissed = isDeadlineMissed(todo.dueDate);
    }

    return (
        <>
            <Form
                editTodo={editTodo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                todo={todo}
            />
            <li
                className={styles.card}
                aria-describedby={`todo-description-${todo?.id}`}
                draggable
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <h2 className={styles.title}>{todo?.title}</h2>
                <p className={styles.description}>{todo?.description}</p>
                <p className={styles.tags}>Теги: {todo?.tags.join(', ')}</p>
                <div className={styles.lastRow}>
                    <p className={styles.priority}>
                        Приоритет: {todo && PRIORITIES_MAP[todo.priority]}
                    </p>
                    <p
                        className={`${styles.dueDate}${isMissed ? ` ${styles.missedDeadline}` : ''}`}
                    >
                        Срок до: {todo?.dueDate}
                    </p>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.actionButton}
                        onClick={handleEdit}
                        aria-label="Редактировать задачу"
                    >
                        <img width={30} src={EditIcon} alt="редактировать" />
                    </button>
                    <button
                        className={styles.actionButton}
                        onClick={handleDelete}
                        aria-label="Удалить задачу"
                    >
                        <img width={30} src={DeleteIcon} alt="удалить" />
                    </button>
                </div>
            </li>
        </>
    );
};

export default Card;
