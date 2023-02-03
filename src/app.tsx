import React, { useState, useEffect } from 'react';
import getAllData from './api/getAllData';

const App: React.FC = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllData();
                setData(response);
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div> ... </div>
    );
};

export default App;
