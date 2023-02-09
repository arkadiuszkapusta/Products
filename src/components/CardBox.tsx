import type React from 'react'
import { v4 as uuid } from 'uuid'

import { Grid, Typography } from '@mui/material'

import { type ProductProps } from '../types/product'

export const CardBox: React.FC<ProductProps> = ({ color, id, name, year, pantone_value }): JSX.Element => {
  const productData = [
    { headline: '', value: 'Product Information' },
    { headline: 'ID', value: id },
    { headline: 'Name', value: name },
    { headline: 'Year', value: year },
    { headline: 'Color', value: color },
    { headline: 'Pantone', value: pantone_value }
  ]

  return (
    <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', padding: '24px 0 0 0' }}>
      <Grid container sx={{ bgcolor: color, width: '100%', height: '100%', textAlign: 'center', borderRadius: 2, padding: '10px 0 10px 0' }}>
        {
          productData.map(data => (
            <Grid key={uuid()} item xs={2}>
              <Typography variant="h6" sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }}> { data.headline } </Typography>
              <Typography variant="h6"> { data.value } </Typography>
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}
