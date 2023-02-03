import React from 'react'
import {Card, CardContent, Typography} from "@mui/material";

export const CardBox = () => {
    return (
        <Card sx={{ minWidth: 360, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 0 12px 0' }} >
            <CardContent sx={{ bgcolor: 'green', width: '100%', height: '100%', textAlign: 'center' }}>
                <Typography variant="h6"> ID number: </Typography>
                <Typography variant="h6"> Name: </Typography>
                <Typography variant="h6"> Year: </Typography>
            </CardContent>
        </Card>
    )
}
