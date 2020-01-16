import React, {useEffect, useState} from 'react'
import axios from 'axios'
require("regenerator-runtime/runtime");

const App = () => {
    const [hero,selectedHero] = useState(
        'Select a Hero'
    );
    const [heroDets, selectedheroDets] = useState(
        'Movement Speed'
    );
    const handleChange = event => {
        // event is an object which contains the value and id from the child component.
        selectedHero(event.value);
        selectedheroDets(event.id);
    };
    return(
        <HeroSelect heroDetails={heroDets} heroSelect={hero} onChangeHeadline={handleChange} />
    );

};
const HeroSelect = ({heroSelect, heroDetails, onChangeHeadline}) => {
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
    const getSelected=event=>{
        // added an extra function here, which passes the value and id to the app component.
        onChangeHeadline({value: event.target.value, id:data.heroes[event.target.selectedIndex].move_speed})
    };
    return (
        <div>
            <select id={heroDetails} value={heroSelect} onChange={getSelected} >
                {data.heroes.map(item => (
                    <option id={item.move_speed}>
                        {item.localized_name}
                    </option>
                ))}
            </select>
            <h1>{heroSelect}</h1>
            <h1>{heroDetails}</h1>
        </div>

    )
};
export default App