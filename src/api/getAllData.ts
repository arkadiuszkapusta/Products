import axios from 'axios';

async function getDataPage1() {
    try {
        const response = await axios.get('https://reqres.in/api/products?page=1');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getDataPage2() {
    try {
        const response = await axios.get('https://reqres.in/api/products?page=2');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAllData() {
    try {
        const dataPage1 = await getDataPage1();
        const dataPage2 = await getDataPage2();
        return [...dataPage1.data, ...dataPage2.data];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getAllData;
