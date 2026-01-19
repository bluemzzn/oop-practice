// https://jsonplaceholder.typicode.com/todos

import axios from "axios";

interface TodoItem{
    userId : number;
    id : number;
    title : string;
    completed : boolean;
}

interface TodoResult{
    id : number;
    task : string; //change from title 
    status : 'Done' | 'Pending'; //Union type
}


export async function mapTodoStatus(): Promise<TodoResult[] >{
    try{
        const res = await axios.get<TodoItem[]>("https://jsonplaceholder.typicode.com/todos");
        const todos = res.data;

        if(todos.length === 0){
            return [];
        }

        return todos.map(todo => ({id : todo.id, task : todo.title, status : todo.completed? 'Done' : 'Pending'}));

    }catch(error){
        return [];
    }
}

// mapTodoStatus().then(result => console.log(result));