import React, { useState, useEffect } from 'react';
import './styles/styles.css'

import getAllData from './api/getAllData';
import { Box, CircularProgress, Grid, TextField } from "@mui/material";

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
                // console.log(response)
            } catch (error) {
                console.error(error);
                setLoading(false);

            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    )

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            setId(inputValue);
        }
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <TextField
                label="Filter by ID"
                type="number"
                value={id}
                onChange={handleChange}
                inputProps={{ min: "0", max: "12" }}
            />
            {
                data.filter(item => !id || item.id === Number(id)).map( item => (
                        <Grid key={ item.id } item xs={12} height="100px" width="2/3" >
                            <p> { item.name } </p>
                        </Grid>
                    ))
            }
        </Grid>
    );
};

export default App;
