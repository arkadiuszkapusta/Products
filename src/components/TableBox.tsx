import type React from 'react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { type ProductProps } from '../types/product'
import { CardBox } from './CardBox'

interface Props {
  products: ProductProps[]
  productID: string
}

export const TableBox: React.FC<Props> = ({ products, productID }) => {
  const headlineTitle = ['', 'id', 'name', 'year']

  const [productInfo, setProductInfo] = useState<number | undefined>(undefined)

  const handleShowProductInfo = (index: number): void => {
    setProductInfo(prevProductInfo => prevProductInfo === index - 1 ? undefined : index - 1)
  }

  return (
    <Grid item xs={12} sx={{ width: '80%', justifyContent: 'center', alignItems: 'center', padding: '0 0 24px 0' }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">

          <TableHead sx={{ backgroundColor: '#eeeeee', border: '1px solid #cccccc' }}>
            <TableRow>
              {
                headlineTitle.map(title => (
                  <TableCell key={uuid()} align="center" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{title}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>

          {
            products.filter(item => productID === '' || productID === String(item.id)).map(item => (
              <TableBody key={ item.id }>
                <TableRow key={ item.name } sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: item.color }}>
                  <TableCell align="center">
                    <IconButton aria-label="expand row" size="small" sx={{ margin: 'auto' }} onClick={ () => { item.id !== undefined && handleShowProductInfo(item.id) } }>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">{ item.id }</TableCell>
                  <TableCell align="center">{ item.name }</TableCell>
                  <TableCell align="center">{ item.year }</TableCell>
                </TableRow>
              </TableBody>
            ))
          }
        </Table>
      </TableContainer>
      {
        productInfo !== undefined && (
          <CardBox
            {...products.find(item => item.id !== undefined && item.id - 1 === productInfo)}
          />
        )
      }
    </Grid>
  )
}
