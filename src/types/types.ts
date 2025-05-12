export type TTodo = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: number;
    tags: string[];
};

export type TFilterBarProps = {
    search: string;
    setIsOpen: (isOpen: boolean) => void;
    setSearch: (search: string) => void;
    setPriority: (priority: number) => void;
    setDeadline: (deadline: number) => void;
    priority: number;
    deadline: number;
    tags: string[];
    setTags: (tags: string[]) => void;
};

export type TTodoCommonProps = {
    editTodo?: (id: string, todo: TTodo) => void;
    todo?: TTodo;
};

export type TTodoListProps = {
    todos?: TTodo[];
    setTodos?: (todo: TTodo[]) => void;
    onDelete: (id: string) => void;
    onDragStart?: (e: React.DragEvent<HTMLLIElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLLIElement>) => void;
    onDrop?: (e: React.DragEvent<HTMLLIElement>) => void;
} & TTodoCommonProps;

export interface TFormProps extends TTodoCommonProps {
    addTodo?: (todo: TTodo) => void;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    todos?: TTodo[];
}

export type TOption = {
    value: string;
    label: string;
};

export type TMultiSelectProps = {
    options: TOption[];
    value?: string[];
    onChange: (selectedOptions: string[]) => void;
    placeholder?: string;
};

export type TModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};
