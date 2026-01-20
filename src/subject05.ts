// https://jsonplaceholder.typicode.com/users

import axios from "axios";

/* "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      no geo
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }*/

interface User {
    id: number;
    name: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}
interface UserAddress {
    id: number;
    name: string;
    fullAddress: string;
}

export async function getUserAddresses(): Promise<UserAddress[]> {
    try {
        const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
        const userdata = res.data;
        // u don't have to create more variable just use template literal in map function instead.
        return userdata.map(user => ({ id: user.id, name: user.name, fullAddress: `${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})` }));
    }
    catch (error) {
        return [];
    }
}

getUserAddresses().then(check => console.log(check));