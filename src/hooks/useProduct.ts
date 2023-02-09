import type React from 'react'
import { useEffect, useState } from 'react'
import { getProducts } from '../api/getProducts'
import { useNavigate, useParams } from 'react-router-dom'
import { type AppProps, type ProductProps } from '../types/product'

export const useProduct = (): AppProps => {
  const { page } = useParams()
  const navigate = useNavigate()
  const pageNumber = page !== null && page !== undefined ? parseInt(page, 10) : 1

  // products
  const [products, setProducts] = useState<ProductProps[] | []>([])
  // id searchable
  const [productID, setProductID] = useState<string>('')
  // pagination page
  const [currentPage, setCurrentPage] = useState<number>(pageNumber)
  // max page
  const [maxPage, setMaxPage] = useState<number>(3)
  // input validation
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const page = query.get('page') ?? '1'
    const currentPage = parseInt(page, 10)
    setCurrentPage(currentPage)
  }, [])

  useEffect(() => {
    const fetchData = (): void => {
      getProducts(currentPage)
        .then((response) => {
          setProducts(response.data)
          setMaxPage(response.total_pages)
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
    fetchData()
  }, [currentPage])

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value
    const regex = /^[0-9]/

    if (inputValue === '' || inputValue.match(regex) != null) {
      setIsValid(false)
      setProductID(inputValue)
    } else {
      setIsValid(true)
    }
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, currentPage: number): void => {
    setCurrentPage(currentPage)
    navigate({ pathname: '/', search: `?page=${currentPage}` })
  }

  return {
    products,
    productID,
    currentPage,
    maxPage,
    isValid,
    handleChangeSearch,
    handleChangePage
  }
}
