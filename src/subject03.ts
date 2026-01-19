import axios from "axios";


interface User{
    id : number;
    name : string;
    email : string;
}
export async function getUserEmail(): Promise<string[]>{
    try{

        const res = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        const users = res.data;

        // User endsWith('') = ลงท้าย

        const filterEmail = users.filter(user => user.email.toLowerCase().endsWith('.biz'));
        const userResult: string[] = filterEmail.map(user => user.email.toLowerCase());

        return userResult;

    }catch(error){
       return [];
    }
}


// getUserEmail().then(check => console.log(check));