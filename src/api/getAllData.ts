import axios from 'axios'

async function getAllData (page = 1, perPage = 5): Promise<any> {
  try {
    const response = await axios.get(`https://reqres.in/api/products?page=${page}&per_page=${perPage}`)

    if (page < 1 || page > 3) confirm('Page not exist, back to page between 1 and 3')

    return response.data
  } catch (error) {
    throw new Error('An error occurred while fetching the data.')
  }
}

export default getAllData
