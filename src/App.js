import React, {Component, useEffect, useState} from 'react'
import axios from 'axios'
require("regenerator-runtime/runtime");

const App = () => {
    const [data, setData] = useState({heroes: []});
    useEffect(() =>
        async function f() {
            const result = await axios(
                    'https://api.opendota.com/api/heroStats',
                );
                    setData(result.data);
            },[]);
    return(
        <h2>{data.heroes}</h2>
    )
};
export default App