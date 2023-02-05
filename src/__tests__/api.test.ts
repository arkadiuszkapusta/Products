import axios from 'axios'
import getAllData from '../api/getAllData'

jest.mock('axios')

describe('getAllData', () => {
  it('fetches data from API and returns it', async () => {
    const response = {
      data: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' }
      ]
    };

    (axios.get as jest.Mock).mockResolvedValue(response)

    const result = await getAllData()

    expect(axios.get).toHaveBeenCalledWith('https://reqres.in/api/products?page=1&per_page=5')
    expect(result).toEqual(response.data)
  })

  it('throws an error if API call fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'))

    try {
      await getAllData()
    } catch (error) {
      expect(error.message).toBe('An error occurred while fetching the data.')
    }
  })
})
