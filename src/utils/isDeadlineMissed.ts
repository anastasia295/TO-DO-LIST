export const isDeadlineMissed = (date: string) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const dueDate = new Date(date)
    return dueDate.getTime() < today.getTime();
};
