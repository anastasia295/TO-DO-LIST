import { TTodo } from '../types/types';

export const filterTodos = (
    todos: TTodo[],
    search: string,
    priority: number,
    deadline: number,
    tags: string[]
): TTodo[] => {
    return todos.filter((todo) => {
        const matchesSearch =
            todo.title.toLowerCase().includes(search.toLowerCase()) ||
            (todo.description &&
                todo.description.toLowerCase().includes(search.toLowerCase()));

        const matchesPriority = priority === 0 || todo.priority === priority;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        let isDeadlineMatch = true;

        if (deadline === 1) {
            isDeadlineMatch = dueDate < today;
        } else if (deadline === 2) {
            isDeadlineMatch = dueDate.getTime() === today.getTime();
        } else if (deadline === 3) {
            isDeadlineMatch = dueDate > today;
        }

        const matchesTags =
            tags.length === 0 || tags.some((tag) => todo.tags.includes(tag));

        return (
            matchesSearch && matchesPriority && isDeadlineMatch && matchesTags
        );
    });
};
