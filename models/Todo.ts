import { Task } from '../models/Task';

export interface Todo {
    id: number;
    name: string;
    tasks: Array<Task>
}
