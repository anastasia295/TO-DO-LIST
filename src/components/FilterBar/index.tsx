import MultiSelect from '../../shared/MultiSelect';
import { TAGS } from '../../constants/constants';
import styles from './index.module.css';
import { DATE_FILTER, PRIORITY_FILTER } from '../../constants/constants';
import { TFilterBarProps } from '../../types/types';

const FilterBar = ({
    search,
    setIsOpen,
    setSearch,
    setPriority,
    setDeadline,
    priority,
    deadline,
    tags,
    setTags,
}: TFilterBarProps) => {
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(+e.target.value);
    };

    const handleDeadlineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDeadline(+e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <input
                    className={styles.search}
                    type="text"
                    placeholder="Поиск"
                    value={search}
                    onChange={handleSearch}
                    aria-label="Введите текст для поиска задач"
                />
                <button
                    className={styles.button}
                    onClick={handleOpen}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpen();
                        }
                    }}
                    aria-label="Добавить задачу"
                >
                    Добавить
                </button>
            </div>
            <div className={styles.row}>
                <select
                    className={styles.select}
                    value={priority}
                    onChange={handlePriorityChange}
                    aria-label="Выберите приоритет задачи"
                >
                    {PRIORITY_FILTER.map(({ value, name }) => (
                        <option key={value} value={value}>
                            {name}
                        </option>
                    ))}
                </select>
                <select
                    className={styles.select}
                    value={deadline}
                    onChange={handleDeadlineChange}
                    aria-label="Выберите срок задачи"
                >
                    {DATE_FILTER.map(({ value, name }) => (
                        <option key={value} value={value}>
                            {name}
                        </option>
                    ))}
                </select>
                <MultiSelect
                    options={TAGS}
                    value={tags}
                    onChange={setTags}
                    placeholder="Теги"
                />
            </div>
        </div>
    );
};

export default FilterBar;
