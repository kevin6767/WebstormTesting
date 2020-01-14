import React, {useEffect, useState} from 'react'
import axios from 'axios'
require("regenerator-runtime/runtime");

const App = () => {
    const [hero, selectedHero] = useState(
        'Select a Hero'
    );
    const handleChange = event => selectedHero(event.target.value);
    return(
        <HeroSelect heroSelect={hero} onChangeHeadline={handleChange} />
    );

};
const HeroSelect = ({heroSelect, onChangeHeadline}) => {
    const [data, setData] = useState({heroes: []});
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.opendota.com/api/heroStats',
            );
            setData({...data, heroes: result.data});
        };
        fetchData();
    }, []);
    return (
        <div>
            <h1>{heroSelect}</h1>
            <select value={heroSelect} onChange={onChangeHeadline} >
                {data.heroes.map(item => (
                    <option>
                        {item.localized_name}
                    </option>
                ))}
            </select>
        </div>
    )
};
export default App