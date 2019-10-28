import React from 'react';

class AddPlayer extends React.Component {
  state = { name: "", health: 100 };

  update = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    switch ( name ) {
      case 'name':
        if ( ! value.match(/^[-._a-zA-Z0-9]{0,9}$/) ){
          console.log(`invalid name: :${value}:`)
          return; }
        break;
      case 'health':
        if ( ! value.match(/^[0-9]{0,3}$/) ){
          console.log(`invalid health: :${value}:`)
          return; }
        break;
      default:
    }
    this.setState({[name]: value});
  }

  keydown = (e)=>{
    if ( 'Enter' === e.key ){
      if ( e.shiftKey ){
        this.props.startGame()
      } else {
        this.add(e);
      }
    }
  }

  add = (e)=> {
    e.preventDefault();
    let { name, health } = this.state;
    if ( health === '' || !( 0 < health < 1000 ) ){
      this.props.flashError("Invalid health value");
      return; }
    if ( name.trim() === "" ){
      this.props.flashError("Please enter a user name");
      return; }
    else if ( this.props.playerNames.includes(name) ){
      this.props.flashError("Name is taken, choose another one");
      return; }
    this.props.addPlayer(this.state)
    this.setState({name:"",health:100});
    this.nameField.current.focus();
  }
  render(){
    this.nameField = React.createRef();
    this.healthField = React.createRef();
    return (
      <div className="AddPlayer">
        <form onSubmit={this.add}>
          <input ref={this.nameField} className="center-relative-h" name="name"   onKeyDown={this.keydown} onChange={this.update} value={this.state.name} />
          <input ref={this.healthField} className="center-relative-h" name="health" onKeyDown={this.keydown} onChange={this.update} value={this.state.health} />
          <button type="submit" className="center-relative-h">Add Player</button>
        </form>
      </div> );
  }
}

export default AddPlayer;
