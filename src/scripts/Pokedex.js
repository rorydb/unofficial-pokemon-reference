var PokemonListEntry = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string
  },
  render: function() {
    return <li onClick={this.props.updatePokemon.bind(null, this.props.id)}><span className="number">{this.props.no}</span> <span className="name">{this.props.name}</span></li>
  }
});

var PokemonList = React.createClass({
  propTypes: {
    listOfPokemon: React.PropTypes.object
  },
  leadingZeroes: function(num) {
    while (num.length < 3) {
      num = "0" + num;
    }
    return num;
  },
  render: function () {
    var self = this;
    return (
      <ul className="pokemon-list col-xs-12 col-sm-4 col-sm-offset-1">
        {this.props.listOfPokemon["pokemon"].map(function(entry) {
          return <PokemonListEntry
                    updatePokemon={self.props.updatePokemon}
                    key={parseInt(entry.id)}
                    id={entry.id}
                    no={self.leadingZeroes(entry.id)}
                    name={entry.name}
          />
        })}
      </ul>
    );
  }
});

var PokePortrait = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    picture: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },
  leadingZeroes: function(num) {
    while (num.length < 3) {
      num = "0" + num;
    }
    return num;
  },
  render: function() {
    var self = this;
    return (
      <figure className="poke-portrait col-xs-6">
        <img src={this.props.picture} alt={"Sprite of " + this.props.name} />
        <figcaption>No. {this.leadingZeroes(this.props.id)}</figcaption>
      </figure>
    )
  }
});

var PokemonOverview = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.array.isRequired,
    height: React.PropTypes.string.isRequired,
    weight: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="overview col-xs-6">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">{this.props.name.toUpperCase()}</td>
            </tr>
            {this.props.type.map(function(pokemonType, i) {
              return (
                <tr key={i}>
                  <td colSpan="2">{pokemonType}</td>
                </tr>
              );
            })}
            <tr>
              <td>HT</td>
              <td>{this.props.height}</td>
            </tr>
            <tr>
              <td>WT</td>
              <td>{this.props.weight}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

var PokemonDescription = React.createClass({
  propTypes: {
    description: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="pokemon-description col-xs-12">
        <p>{this.props.description}</p>
      </div>
    );
  }
});

var PokemonInfo = React.createClass({
  render: function() {
    return (
      <section className="pokemon-info col-xs-12 col-sm-5 col-sm-offset-1">
        <div className="row">
          <PokePortrait
            id={this.props.pokemon.id}
            picture={this.props.pokemon.sprite}
            name={this.props.pokemon.name}
          />
          <PokemonOverview
            name={this.props.pokemon.name}
            type={this.props.pokemon.type}
            height={this.props.pokemon.height}
            weight={this.props.pokemon.weight}
          />
        </div>
        <div className="row">
          <PokemonDescription
            description={this.props.pokemon.description}
          />
        </div>
      </section>
    )
  }
});


var Pokedex = React.createClass({
  getInitialState: function() {
    return {
      "pokemon": {"pokemon":[]},
      "currentPokemon": new Pokemon("---","-------",[{type: {name: "----"}}],"-'-\"","---","------------------")
    }
  },
  componentDidMount: function() {
    var self = this;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/genOne.json');
    xhr.addEventListener('load', function() {
      self.setState({
        "pokemon": JSON.parse(xhr.response)
      });
    });

    xhr.addEventListener('error', function() {
      console.log("something went wrong")
    });

    xhr.send();
  },

  // TODO: Comment this
  updatePokemon: function(id) {
    var self = this;

    if (localStorage.getItem(id)) {
      self.setState({
        currentPokemon: JSON.parse(localStorage.getItem(id))
      });

      return;
    } else {

    }
    var requestPath = "http://pokeapi.co/api/v2/pokemon/" + id;

    var pokemonRequest = new XMLHttpRequest();

    pokemonRequest.open('GET', requestPath);
    pokemonRequest.addEventListener('load', function() {
      var pokemonDetails = JSON.parse(pokemonRequest.response);

      var descriptionPath = "https://pokeapi.co/api/v2/pokemon-species/" + pokemonDetails.id;
      pokemonDescriptionRequest = new XMLHttpRequest();

      pokemonDescriptionRequest.open('GET', descriptionPath);
      pokemonDescriptionRequest.addEventListener('load', function() {
        var resp = JSON.parse(pokemonDescriptionRequest.response);

        var description = resp.flavor_text_entries[resp.flavor_text_entries.length - 1].flavor_text;

        var pk = new Pokemon(pokemonDetails.id, pokemonDetails.name, pokemonDetails.types, pokemonDetails.height, pokemonDetails.weight, description);

        localStorage.setItem(id,JSON.stringify(pk));

        self.setState({
          "currentPokemon": pk
        });
      });

      pokemonDescriptionRequest.send();

    });

    pokemonRequest.addEventListener('error', function() {
      console.log("something went wrong")
    });

    pokemonRequest.send();
  },
  render: function () {
    return (
      <div className="pokedex container">
        <PokemonList
          listOfPokemon={this.state.pokemon}
          updatePokemon={this.updatePokemon}
        />
        <PokemonInfo pokemon={this.state.currentPokemon}/>
      </div>
    );
  }
});