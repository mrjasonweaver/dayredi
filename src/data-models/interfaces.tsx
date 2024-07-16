interface List {
    id: string;
    name: string;
    tasks: Task[];
}

interface Task {
    id: string;
    name: string;
    completed: boolean;
    displayTime: string;
    timer: number;
    timerStart: number;
    timestamp: number;
}

export type { List, Task };
