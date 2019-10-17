import React from 'react';

class AddPlayer extends React.Component {
  state = {name:""};

  update = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  add = async ()=>{
    if ( this.state.name.trim() === "" ){
      await this.props.controller.flashError("Please enter a user name");
      return;
    }
    if ( this.props.list.includes(this.state.name) ){
      await this.props.controller.flashError("Name is taken, choose another one");
      return;
    }
    this.props.addPlayer(this.state.name)
    this.setState({name:""});
  }

  render(){
    return (
      <div className="AddPlayer">
        <input className="center-relative-h" id="name" onChange={this.update} value={this.state.name} />
        <button className="center-relative-h" onClick={this.add}>Add Player</button>
      </div> );
  }
}

export default AddPlayer;
