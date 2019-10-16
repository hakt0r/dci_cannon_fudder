import React from 'react';

class AddPlayer extends React.Component {
  state = {name:""};

  update = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  add = ()=>{
    this.props.addPlayer(this.state.name)
    this.setState({name:""});
  }

  render(){
    return (
      <div className="AddPlayer">
        <input id="name" onChange={this.update} />
        <button onClick={this.add}>Add Player</button>
      </div> );
  }
}

export default AddPlayer;
