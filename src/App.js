import React, { Component } from 'react'

const Heroes = ({heroes , id}) => {
    return (
        <div>
            <h1>Hero List</h1>
            <select name={heroes} key={id} onChange={event => handleChange(event)}>
                {heroes.map(hero =>
                    <option>{hero.localized_name}
                    </option>
                )};
            </select>
        </div>
    )
};
const Hero = ({selectedHero}) => {
    return(
        <div>
            <h1>
                Does this work? {selectedHero}
            </h1>
        </div>
    )
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
            selectedHero: null
        };
    }
    componentDidMount() {
        let initialHeroes = [];
        fetch('https://api.opendota.com/api/heroStats')
            .then(res => res.json())
            .then((data) => {
                initialHeroes = data.map((heroes) => {
                    return heroes
                });
                console.log(initialHeroes);
                this.setState({
                    heroes: initialHeroes,
                })
            })
            .catch(console.log)
    }


    handleChange = selectedHero => this.setState({selectedHero});

    render() {
        const {selectedHero} = this.state;
        return (
            <>
                <h1>Here Comes Angular {selectedHero}</h1>
                <Heroes selectedHero={selectedHero} heroes={this.state.heroes} handleChange={this.handleChange} />
                {selectedHero && <Hero selectedHero={selectedHero}/>}
                <Hero />
            </>
        )
    }
}


export default App