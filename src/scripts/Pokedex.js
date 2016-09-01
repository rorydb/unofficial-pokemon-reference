var PokemonListEntry = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string
  },
  render: function() {
    return <li><span className="number">{this.props.id}</span> &mdash; {this.props.name}</li>
  }
});

var PokemonList = React.createClass({
  propTypes: {
    listOfPokemon: React.PropTypes.object
  },
  leadingZeroes: function(num) {
    if (num < 10) {
      return "00" + num;
    } else if (num < 100) {
      return "0" + num;
    } else {
      return num;
    }
  },
  render: function () {
    var self = this;
    return (
      <ul className="pokemon-list">
        {this.props.listOfPokemon["pokemon"].map(function(entry) {
          return <PokemonListEntry key={parseInt(entry.id)} id={self.leadingZeroes(entry.id)} name={entry.name}/>
        })}
      </ul>
    );
  }
});


var Pokedex = React.createClass({
  getInitialState: function() {
    return {
      "pokemon": {"pokemon":[]}
    }
  },
  componentDidMount: function() {
    var self = this;

    xhr = new XMLHttpRequest();
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
  render: function () {
    return (
      <div className="pokedex">
        <PokemonList listOfPokemon={this.state.pokemon}/>
      </div>
    );
  }
});