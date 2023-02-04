import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import getAllData from './api/getAllData';
import { Box, CircularProgress, Grid, Pagination, TextField, Typography} from "@mui/material";

import './styles/styles.css'
import '@fontsource/roboto/500.css';
import { CardBox } from './components/CardBox';

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
    // error
    const [error, setError] = useState<string>("");

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
              onChange={ handleChangeSearch }
              sx={{ minWidth: 360, margin: '24px 0 24px 0'  }}
            />
            {
                data.filter(item => !id || item.id === Number(id)).map( item => (
                  <CardBox
                    key={ item.id }
                    id={ item.id }
                    name={ item.name }
                    year={ item.year }
                    color={ item.color }
                    pantone_value={ item.pantone_value }
                  />
                ))
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
