// https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/albums

import axios from "axios";

interface Users {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface Albums {
    userId: number;
    id: number;
    title: string;
}

interface UserwithAlbums{
    id : number;
    name: string;
    albums : string[];
}

export async function getUsersWithAlbums(): Promise<UserwithAlbums[]> {
    try {
        const [userRes, albumRes] = await Promise.all([
            axios.get<Users[]>('https://jsonplaceholder.typicode.com/users'),
            axios.get<Albums[]>('https://jsonplaceholder.typicode.com/albums')
        ]);

        const users = userRes.data;
        const albums = albumRes.data;

        return users.map(user => {
            const checkUser = albums.filter(album => album.userId === user.id);
            const albumTitles = checkUser.map(album => album.title);
            return { id : user.id, name : user.name, albums : albumTitles};
        });
    } catch (error) {
        return [];
    }
}

getUsersWithAlbums().then(check => console.log(check));