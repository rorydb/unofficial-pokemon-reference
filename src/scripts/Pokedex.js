var PokemonListEntry = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string
  },
  render: function() {
    return <li><span className="number">{this.props.id}</span> <span className="name">{this.props.name}</span></li>
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
      return num + "";
    }
  },
  render: function () {
    var self = this;
    return (
      <ul className="pokemon-list col-xs-12 col-sm-4 col-sm-offset-1">
        {this.props.listOfPokemon["pokemon"].map(function(entry) {
          return <PokemonListEntry key={parseInt(entry.id)} id={self.leadingZeroes(parseInt(entry.id))} name={entry.name}/>
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
    if (num < 10) {
      return "00" + num;
    } else if (num < 100) {
      return "0" + num;
    } else {
      return num;
    }
  },
  render: function() {
    var self = this;
    return (
      <figure className="poke-portrait col-xs-6">
        <img src={this.props.picture} alt={"Sprite of " + this.props.name} />
        <figcaption>No. {this.leadingZeroes(parseInt(this.props.id))}</figcaption>
      </figure>
    )
  }
});

var PokemonOverview = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
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
            <tr>
              <td colSpan="2">{this.props.type.toUpperCase()}</td>
            </tr>
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
  getInitialState: function() {
    return {
      "id": "1",
      "name": "LorumIpsum",
      "sprite": "data/sprites/1.png",
      "type": "Water",
      "height": "5'3\"",
      "weight": "29.0 lb",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi illo impedit magni repellendus voluptatibus! Alias at eius facere. Consequuntur dolor eligendi ex illo illum laboriosam nulla odit quis vel veritatis!"
    }
  },
  render: function() {
    return (
      <section className="pokemon-info col-xs-12 col-sm-5 col-sm-offset-1">
        <div className="row">
          <PokePortrait id={this.state.id} picture={this.state.sprite} name={this.state.name} />
          <PokemonOverview name={this.state.name} type={this.state.type} height={this.state.height} weight={this.state.weight} />
        </div>
        <div className="row">
          <PokemonDescription description={this.state.description} />
        </div>
      </section>
    )
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
  render: function () {
    return (
      <div className="pokedex container">
        <PokemonList listOfPokemon={this.state.pokemon}/>
        <PokemonInfo />
      </div>
    );
  }
});