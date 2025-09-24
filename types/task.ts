export interface GetTask {
    sortOrder?: 'asc' | 'desc'; // порядок сортировки
    sortBy?: '_id' | 'name' | 'date' | 'createdAt' | 'updatedAt'; // поле для сортировки
    isDone?: boolean; // фильтрация по выполненности
}