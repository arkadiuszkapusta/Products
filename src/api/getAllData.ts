import axios from 'axios';

async function getDataPage1() {
    const response = await axios.get('https://reqres.in/api/products?page=1');
    return response.data;
}

async function getDataPage2() {
    const response = await axios.get('https://reqres.in/api/products?page=2');
    return response.data;
}

async function getAllData() {
    const dataPage1 = await getDataPage1();
    const dataPage2 = await getDataPage2();
    return [...dataPage1.data, ...dataPage2.data];
}

export default getAllData;
