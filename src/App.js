import React, { Component } from 'react'

const Heroes = ({heroes , id}) => {
    return (
        <div>
            <h1>Hero List</h1>
            <select name={heroes} key={id} onChange={this.handleChange} value={this.state.value}>
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
            selectedHero: null,
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);

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


    handleChange(event) {
        this.setState({value: event.target.value});
    }

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