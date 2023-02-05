import type React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import getAllData from './api/getAllData'
import { Box, CircularProgress, Grid, Pagination, TextField, Typography } from '@mui/material'

import './styles/styles.css'
import '@fontsource/roboto/500.css'
import { CardBox } from './components/CardBox'

const App: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const pageParam = queryParams.get('page')
  const navigate = useNavigate()

  let page = 1
  if (typeof pageParam === 'string') page = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam)

  // api data
  const [data, setData] = useState<Array<{ id: number, name: string, color: string, pantoneValue: string, year: number }>>([])
  // loading
  const [loading, setLoading] = useState<boolean>(true)
  // id searchable
  const [id, setId] = useState<string>('')
  // pagination
  const [currentPage, setCurrentPage] = useState<number>(page)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await getAllData(currentPage)
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData().catch(error => {
      console.error(error.message)
    })
  }, [currentPage])

  if (loading) {
    return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh' }}>
            <CircularProgress/>
          </Box>
    )
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value
    setId(inputValue)
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, currentPage: number): void => {
    setCurrentPage(Number(currentPage))
    navigate({ pathname: '/', search: `?page=${Number(currentPage)}` })
  }

  return (
        <Grid
          container
          direction="column"
          sx={{ width: 'full', justifyContent: 'center', alignItems: 'center', margin: '24px 0 24px 0' }}
        >
            <Typography variant="h3" sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '5px' }}> Dashboard </Typography>
            <TextField
              type="number"
              label="Filter by ID"
              value={ id === null ? '' : id }
              onChange={handleChangeSearch}
              sx={{ minWidth: 360, margin: '24px 0 24px 0' }}
            />
          {
            data
              .filter(item => id === '' || item.id === Number(id))
              .map(item => (
                <CardBox
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  year={item.year}
                  color={item.color}
                  pantoneValue={item.pantoneValue}
                />
              ))
          }
          <Pagination
              count={ 3 }
              page={ currentPage }
              onChange={ handleChangePage }
              sx={{ margin: '12px 0 0 0' }}
            />
        </Grid>
  )
}

export default App
