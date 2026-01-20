// https://jsonplaceholder.typicode.com/comments

import axios from "axios";

interface Comments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface TopCommenter {
    email: string;
    count: number;
}

export async function getTopCommenterEmail(): Promise<TopCommenter | null> {
    try {
        const res = await axios.get<Comments[]>("https://jsonplaceholder.typicode.com/comments");
        const comments = res.data;

        if (comments.length === 0) {
            return null;
        }

        const emailCount = comments.reduce((sum, countemail) => {
            sum[countemail.email] = (sum[countemail.email] || 0) + 1;
            return sum;
        }, {} as Record<string, number>);

        // convert to array 
        const topEmail = Object.entries(emailCount).reduce((winner, current) => {
            return current[1] > winner[1] ? current : winner;
        });

        return {
            email: topEmail[0],
            count: topEmail[1]
        };

    }
    catch (error) {
        return null;
    }
}

getTopCommenterEmail().then(check => console.log(check));