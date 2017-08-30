import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  handleChange = (changedType) => {
    this.setState({
      filters: {
        type: changedType
      }
    })
  }

  fetchThis = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
    } else if (this.state.filters.type === "cat") {
      fetch("/api/pets?type=cat") 
    } else if (this.state.filters.type === "dog") {
      fetch("/api/pets?type=dog")
    } else if (this.state.filters.type === "micropig") {
      fetch("/api/pets?type=micropig")
    }

  }


  adoptedPet = (id) => {
  this.setState({
    adoptedPets: [...this.state.adoptedPets, id]
  })
}

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters} onChangeType={this.handleChange} onFindPetsClick={this.fetchThis}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptedPet}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;