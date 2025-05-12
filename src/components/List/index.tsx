import Card from "../Card";
import styles from "./index.module.css";
import { TTodo, TTodoListProps } from "../../types/types";
import { saveTodos } from "../../store/localstorage";

const List: React.FC<TTodoListProps> = ({
  todos,
  onDelete,
  editTodo,
  setTodos,
}) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    const draggedIndex = Number(e.dataTransfer.getData("text/plain"));

    const updatedTasks = todos?.slice() ?? [];

    if (draggedIndex !== index) {
      const [movedTask] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(index, 0, movedTask);
      setTodos?.(updatedTasks);
      saveTodos(updatedTasks, setTodos);
    }
  };
  return (
    <div className={styles.list}>
      {todos?.map((todo: TTodo, index: number) => (
        <Card
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          editTodo={editTodo}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        />
      ))}
    </div>
  );
};

export default List;
