import { Grid, Pagination, TextField, Typography } from '@mui/material'

import { useProduct } from './hooks/useProduct'
import { NoData } from './components/NoData'
import { TableBox } from './components/TableBox'

const App = (): JSX.Element => {
  const productData = useProduct()

  return (
        <Grid
          container
          direction="column"
          sx={{ width: 'full', justifyContent: 'center', alignItems: 'center', margin: '24px 0 24px 0' }}
        >
            <Typography variant="h3" sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '5px' }}> Products </Typography>
            <TextField
              type="number"
              label="Filter by ID"
              value={ productData.productID }
              onChange={ productData.handleChangeSearch }
              error={ productData.isValid }
              sx={{ minWidth: 360, margin: '24px 0 24px 0' }}
            />
          {
            productData.products.length === 0
              ? <NoData />
              : (
                <TableBox
                  products={ productData.products }
                  productID={ productData.productID }
                />
                )
          }
          <Pagination
              count={ productData.maxPage }
              page={ productData.currentPage }
              onChange={ productData.handleChangePage }
              sx={{ margin: '12px 0 0 0' }}
            />
        </Grid>
  )
}

export default App
