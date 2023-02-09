import axios from 'axios'
import { type PaginationProps } from '../types/product'

export async function getProducts (page: number, perPage = 5): Promise<PaginationProps> {
  try {
    const response = await axios.get(`https://reqres.in/api/products?page=${page}&per_page=${perPage}`)

    if (page < 1) {
      return { data: [], page: 0, per_page: perPage, total: 0, total_pages: 0 }
    }

    if (page > response.data.total_pages) {
      return { data: [], page, per_page: perPage, total: response.data.total, total_pages: response.data.total_pages }
    }
    return response.data
  } catch (error) {
    throw new Error('An error occurred while fetching the data.')
  }
}
