import type React from 'react'

interface ProductProps {
  id?: number
  year?: number
  color?: string
  name?: string
  pantone_value?: string
}

interface PaginationProps {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: ProductProps[]
}

interface AppProps {
  products: ProductProps[]
  productID: string
  currentPage: number
  maxPage: number
  isValid: boolean
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePage: (event: React.ChangeEvent<unknown>, currentPage: number) => void
}
