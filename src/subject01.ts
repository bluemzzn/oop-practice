import axios from "axios";

interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface ObjectWant {
    id: number;
    title: string;
}

export async function getShortPosts(): Promise<ObjectWant[]> {
    try {
        const res = await axios.get<Posts[]>("https://jsonplaceholder.typicode.com/posts");
        const posts = res.data;

        if(posts.length < 15){
            return [];
        }
        /* if u want to console.log to check the result 
            const shortPost = posts.map().....
            console.log(shortPost)
            return shortPost;
        */
       
        return posts.map(post => ({ id : post.id, title : post.title}));
        
    } catch (error) {
        throw new Error("Cannot Fetch Posts");
    }
}


getShortPosts().then(result => console.log(result));