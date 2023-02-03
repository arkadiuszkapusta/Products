import React, { useState, useEffect } from 'react';
import './styles/styles.css'
import '@fontsource/roboto/500.css';

import getAllData from './api/getAllData';
import {Box, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@mui/material";

const App: React.FC = () => {

    // api data
    const [data, setData] = useState<any>([]);
    // loading
    const [loading, setLoading] = useState(true);
    // id searchable
    const [id, setId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllData();
                setData(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);

            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh' }}>
            <CircularProgress />
        </Box>
    )

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            setId(inputValue);
        }
    };

    console.log(data)

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Typography variant="h3"> Dashboard </Typography>
            <TextField
                label="Filter by ID"
                type="number"
                value={id}
                onChange={handleChange}
                sx={{ minWidth: 360 }}
            />
            {
                data.filter(item => !id || item.id === Number(id)).map( item => (
                        <Grid key={ item.id } item xs={12} >
                            <Card sx={{ minWidth: 360, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <CardContent sx={{ bgcolor: item.color, width: '100%', height: '100%', textAlign: 'center' }}>
                                    <Typography variant="h6"> ID number: { item.id } </Typography>
                                    <Typography variant="h6"> Name: { item.name } </Typography>
                                    <Typography variant="h6"> Year: { item.year } </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                )
            }
        </Grid>
    );
};

export default App;
