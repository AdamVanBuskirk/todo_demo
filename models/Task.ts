export interface Task {
    id: number;
    description: string;
    dueDate: string;
    priority: number; /* 0=Low 1=Medium 2=High */
    complete: boolean;
}