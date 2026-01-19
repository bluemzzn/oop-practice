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

// U have to write the filter before return the result and use the filterTitle variable in return value

export async function getShortPosts(): Promise<ObjectWant[]> {
    try {
        const res = await axios.get<Posts[]>("https://jsonplaceholder.typicode.com/posts");
        const posts = res.data;

        const filterTitle =  posts.filter(post => post.title.length < 15);
        if(filterTitle.length === 0){
            return [];
        }

        /* if u want to console.log to check the result 
            const shortPost = posts.map().....
            console.log(shortPost)
            return shortPost;

            or new method(easier)
            call function --- getShor   tPosts().then(result => console.log(result));
        */
       
        return filterTitle.map(post => ({ id : post.id, title : post.title}));
        
    } catch (error) {
        return [];
    }
}


// getShortPosts().then(result => console.log(result));