export const TAGS = [
    { label: 'Работа', value: 'Работа' },
    { label: 'Личное', value: 'Личное' },
    { label: 'Хобби', value: 'Хобби' },
    { label: 'Семья', value: 'Семья' },
    { label: 'Друзья', value: 'Друзья' },
];

export const PRIORITIES = [
    { value: 1, name: 'Низкий' },
    { value: 2, name: 'Средний' },
    { value: 3, name: 'Высокий' },
];

export const PRIORITIES_MAP = PRIORITIES.reduce((acc, item) => {
    acc[item.value] = item.name;
    return acc;
}, {} as Record<number, string>);

export const PRIORITY_FILTER = [
    { value: 0, name: 'Все приоритеты' },
].concat(PRIORITIES);

export const DATE_FILTER = [
    { value: 0, name: 'Все сроки' },
    { value: 1, name: 'Пропущенные' },
    { value: 2, name: 'Сегодняшние' },
    { value: 3, name: 'Будущие' },
];
