import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import { ALL_COUNTRIES } from '../config';
import List from '../components/List';
import Card from '../components/Card';
import Controls from '../components/Controls';

const HomePage = ({setCountries, countries}) => {
    const [filteredCountries, setFilteredCountries] = useState(countries)
    const navigate = useNavigate()
    useEffect(() => {
        if(!countries.length)
      axios.get(ALL_COUNTRIES).then(({data}) => setCountries(data));

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        handleSearch()

        // eslint-disable-next-line
    }, [countries])

    const handleSearch = (search, region) => {
        let data = [...countries];

        if(region) {
            data = data.filter(c => c.region.includes(region))
        }
        if(search) {
            data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        }

        setFilteredCountries(data)
    }
    return ( 
        <>
            <Controls onSearch={handleSearch} />
            <List>
                {filteredCountries.map(c => {
                const countryInfo = {
                    img: c.flags.png,
                    name: c.name,
                    info: [
                    {
                        title: 'Population',
                        description: c.population.toLocaleString()
                    },
                    {
                        title: 'Region',
                        description: c.region
                    },
                    {
                        title: 'Capital',
                        description: c.capital
                    }
                    ]
                };

                return (
                    <Card key={c.name} onClick={() => navigate(`/country/${c.name}`) } {...countryInfo} />
                )
                })}
            </List>
        </>
     );
}
 
export default HomePage;