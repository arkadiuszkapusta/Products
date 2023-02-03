import axios from 'axios';

async function getAllData(page = 1, per_page = 5) {
    try {
        const response = await axios.get(`https://reqres.in/api/products?page=${page}&per_page=${per_page}`);

        if ( page < 1 || page > 3 ) confirm('Page not exist, back to page between 1 and 3');

        return response.data;
    } catch (error) {
        throw new Error("An error occurred while fetching the data.");
    }
}

export default getAllData;
