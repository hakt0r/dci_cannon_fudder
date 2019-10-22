import React from 'react';

class AddPlayer extends React.Component {
  state = { name: "" };

  update = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  keydown = (e)=>{
    if ( e.key === "Enter" ){
      this.add();
      document.getElementById('name').focus();
    }
  }

  add = ()=> {
    if ( this.state.name.trim() === "" ){
      this.props.flashError("Please enter a user name"); }
    else if ( this.props.playerNames.includes(this.state.name) ){
      this.props.flashError("Name is taken, choose another one");
      return; }
    this.props.addPlayer(this.state.name)
    this.setState({name:""});
  }

  render(){
    return (
      <div className="AddPlayer">
        <input className="center-relative-h" id="name" onKeyDown={this.keydown} onChange={this.update} value={this.state.name} />
        <button className="center-relative-h" onClick={this.add}>Add Player</button>
      </div> );
  }
}

export default AddPlayer;
