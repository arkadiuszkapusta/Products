import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import getAllData from './api/getAllData';
import { Box, Card, CardContent, CircularProgress, Collapse, Grid, Pagination, PaginationItem, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import './styles/styles.css'
import '@fontsource/roboto/500.css';

const App: React.FC = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    // api data
    const [data, setData] = useState<[{id: number, name: string, color: string, pantone_value: string, year: number}]>(null);
    // loading
    const [loading, setLoading] = useState<boolean>(true);
    // id searchable
    const [id, setId] = useState<number>(null);
    // pagination
    const [page, setPage] = useState<number>( parseInt(queryParams.get("page")) || 0 );
    // show/hide data
    const [showId, setShowId] = useState<number | null>(null);
    // error
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllData( page );
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, [ page ]);

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh'}}>
                <CircularProgress/>
            </Box>
        )
    }

    const handleChangeSearch = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            setId(inputValue);
        }
    };

    const handleChangePage = (event, page) => {
        setPage(page);
        navigate({ pathname: "/", search: `?page=${page}` })
    };

    const handleShowData = ( id ) => {
        setShowId(showId === id ? null : id);
    };

    return (
        <Grid
            container
            direction="column"
            sx={{ width: 'full', justifyContent: 'center', alignItems: 'center', margin: '24px 0 24px 0' }}
        >
            <Typography variant="h3" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}> Dashboard </Typography>
            <TextField
                type="number"
                label="Filter by ID"
                value={ id === null ? '' : id }
                onChange={ handleChangeSearch }
                sx={{ minWidth: 360, margin: '24px 0 24px 0'  }}
            />
            {
                data.filter(item => !id || item.id === Number(id)).map( item => (
                        <Grid key={ item.id } item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ minWidth: 360, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 0 12px 0' }} >
                                <CardContent sx={{ bgcolor: item.color, width: '100%', height: '100%', textAlign: 'center' }}>
                                    <Typography variant="h6"> ID number: { item.id } </Typography>
                                    <Typography variant="h6"> Name: { item.name } </Typography>
                                    <Typography variant="h6"> Year: { item.year } </Typography>
                                    {
                                        showId === item.id && (
                                            <Collapse in timeout="auto" unmountOnExit>
                                                <Typography variant="h6"> Pantone_value: {item.pantone_value} </Typography>
                                                <Typography variant="h6"> Color: {item.color} </Typography>
                                            </Collapse>
                                        )
                                    }
                                    <AddIcon onClick={() => handleShowData(item.id)} />
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                )
            }
            <Pagination
                count={ 3 }
                page={ page }
                onChange={ handleChangePage }
                sx={{ margin: '12px 0 0 0' }}
            />
        </Grid>
    );
}

export default App;
