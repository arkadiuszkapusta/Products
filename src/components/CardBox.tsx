import type React from 'react'
import { useState } from 'react'
import { Card, CardContent, Collapse, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'

interface Props {
  color: string
  id: number
  name: string
  year: number
  pantoneValue: string
}

export const CardBox: React.FC<Props> = ({
  color,
  id,
  name,
  year,
  pantoneValue
}): React.ReactElement => {
  const [showId, setShowId] = useState<number | null>(null)

  const handleShowData = (id): void => {
    setShowId(showId === id ? null : id)
  }

  return (
      <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ minWidth: 360, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 0 12px 0' }} >
          <CardContent sx={{ bgcolor: color, width: '100%', height: '100%', textAlign: 'center' }}>
            <Typography variant="h6"> ID number: { id } </Typography>
            <Typography variant="h6"> Name: { name } </Typography>
            <Typography variant="h6"> Year: { year } </Typography>
            {
              showId === id && (
                <Collapse in timeout="auto" unmountOnExit>
                  <Typography variant="h6"> Pantone value: { pantoneValue } </Typography>
                  <Typography variant="h6"> Color: { color } </Typography>
                </Collapse>
              )
              }
            {
              showId === null ? <AddIcon onClick={() => { handleShowData(id) }} /> : <ClearIcon onClick={() => { handleShowData(id) }} />
            }
          </CardContent>
        </Card>
      </Grid>
  )
}
