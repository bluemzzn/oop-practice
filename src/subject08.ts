// https://jsonplaceholder.typicode.com/comments
// https://jsonplaceholder.typicode.com/posts

import axios from "axios";

interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Comments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface PostScore {
    postId: number;
    title: string;
    score: number;
}


export async function getPostPopularity(): Promise<PostScore[]> {
    try {
        const [postRes, commentRes] = await Promise.all([
            axios.get<Posts[]>('https://jsonplaceholder.typicode.com/posts'),
            axios.get<Comments[]>('https://jsonplaceholder.typicode.com/comments')
        ]);



        const posts = postRes.data;
        const comments = commentRes.data;
        //count comment 
        const commentCount = comments.reduce((sum, count) => {
            sum[count.postId] = (sum[count.postId] || 0) + 1
            return sum;
        }, {} as Record<number, number>);

        return posts.map(post => {
            const cCount = commentCount[post.id] || 0; 
            const score = (post.body.length * 2) + (cCount * 10); 

            return {
                postId: post.id, // ใช้ post.id นะครับ
                title: post.title,
                score: score
            };
        });
    } catch (error) {
        return [];
    }
}
