interface List {
    id: string;
    name: string;
    tasks: Task[];
}

interface Task {
    id: string;
    name: string;
    completed: boolean;
}

export type { List, Task };