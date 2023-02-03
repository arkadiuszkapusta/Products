import axios from 'axios';

async function getAllData(page = 1, per_page = 5) {
    try {
        const response = await axios.get(`https://reqres.in/api/products?page=${page}&per_page=${per_page}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getAllData;
