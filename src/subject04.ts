import axios from "axios";

interface User {
    id: number;
    name: string;
}

interface Todo {
    userId: number;
    id: number;
    completed: boolean;
}

interface UserStat {
    name: string;
    completedTasks: number;
}

export async function getUserTodoStat(): Promise<UserStat[]> {
    try {

        const [userRes, todoRes] = await Promise.all([
            axios.get<User[]>('https://jsonplaceholder.typicode.com/users'),
            axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        ]);

        const users = userRes.data;
        const todos = todoRes.data;

        const totalCompletedTask = todos.reduce((sum, task) => {
            if (task.completed) {
                sum[task.userId] = (sum[task.userId] || 0) + 1;
            }
            return sum;
        }, {} as Record<number, number>);

        return users.map(userstat => ({ name: userstat.name, completedTasks: totalCompletedTask[userstat.id] ?? 0 }))
    } catch (error) {
        return [];
    }
}

// getUserTodoStat().then(check => console.log(check));