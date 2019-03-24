import React, { Component } from 'react';
import PropTypes from 'proptypes';

const CharacterInfo = ({character: { name, height, mass }}) => {
  return (
      <tr>
          <td>{name}</td>
          <td>{height} cm</td>
          <td>{mass} kg</td>
      </tr>
  )
}
CharacterInfo.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired
}

const Characters = ({ characters }) => {
  return (
    <table className='tg'>
      <tr>
        <th>Name</th>
        <th>Height</th>
        <th>Mass</th>
      </tr>
        {characters.length === 0 ? 
          <div>Loading...</div> : 
        characters.map(character => <CharacterInfo character={character}/>) }
    </table>
  )
}
Characters.propTypes = {
  characters: PropTypes.array.isRequired
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: []
    }
  }

  fetchData = (link) => {
    fetch(link)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        characters: data.results,
        prev: data.previous,
        next: data.next
      })
    })
  }

  componentDidMount() {
    this.fetchData('https://swapi.co/api/people/?page=1')
  }

  moreResults = (link) => {
    this.fetchData(`${link}`)
  }

  render() {
    const { characters, prev, next } = this.state;
    return (
      <div id='app' className='tc'>
        <h1 className='f1'>STARWARS</h1>
        <Characters characters={characters} />
        <div id="pagination">
          {prev && <button onClick={() => this.moreResults(prev)}>Prev</button>}
          {next && <button onClick={() => this.moreResults(next)}>Next</button>}
        </div> 
      </div>
    )
  }
}

export default App;
