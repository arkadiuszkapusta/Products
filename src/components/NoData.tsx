import type React from 'react'
import { useState, useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingBox: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vh' }}>
    <CircularProgress />
  </Box>
)

const ErrorBox: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vh' }}>
      <Typography variant="h6" sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '5px' }}>
        Sorry, no data found...
      </Typography>
    </Box>
  )
}

export const NoData: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
      setShowError(true)
    }, 3000)
    return () => { clearTimeout(timer) }
  }, [])

  if (showLoading) {
    return <LoadingBox />
  }
  if (showError) {
    return <ErrorBox />
  }
  return null
}
