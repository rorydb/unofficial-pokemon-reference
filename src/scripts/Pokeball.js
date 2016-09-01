var TopHalf = React.createClass({
  render: function () {
    return <div className="top"></div>;
  }
});

var BottomHalf = React.createClass({
  render: function () {
    return <div className="bottom"></div>;
  }
});

var InnerCircle = React.createClass({
  showClickHint: function() {
    var hint = setTimeout(function() {
      var circleMessage = document.querySelector('.circle small');
      if (circleMessage) {
        circleMessage.style.display = "inline";
      } else {
        return;
      }
    }, 3000);
  },
  componentDidMount: function() {
    this.showClickHint();
  },
  render: function () {
    return (
      <div className="circle">
        <small>click</small>
      </div>
    )
  }
});

var Pokeball = React.createClass({
  handleClick: function openPokeball() {
    var pokeball = document.querySelector('.pokeball');

    if (pokeball.classList.contains('moving')) { return; }

    pokeball.classList.add('moving');
    setTimeout(function() {
      pokeball.parentNode.removeChild(pokeball);
    }, 400);
  },
  render: function () {
    return (
      <div className="pokeball" onClick={this.handleClick}>
        <TopHalf />
        <BottomHalf/>
        <InnerCircle/>
      </div>
    );
  }
});