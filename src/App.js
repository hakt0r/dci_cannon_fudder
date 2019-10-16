/*
  CannonFudderJS

  (c) 2019 Sebastian Glaser
  (c) 2019 DCI Digital Career Institute

  ReactJS example to illustrate various aspects
  of using react in the wild.
*/

import './App.css';
import logo        from './logo.svg';
import React       from 'react';
import Controls    from './controls.js'
import AddPlayer   from './addPlayer.js'
import Waiting     from './waitingList.js'
import Battlefield from './battlefield.js'

Array.prototype.random = function (){
  return this[Math.floor(Math.random()*this.length)];
}

const GRAV = 9.81;
const RAD  = Math.PI / 180;

class App extends React.Component {

  state = {
    player:[],
    currentPlayer:null
  }

  addPlayer = (name)=> {
    let newPlayer = {
      name:name,
      health:100,
      points:0,
      angle:45,
      power:100
    };
    Object.assign(newPlayer,this.getStartingPosition());
    this.state.player.push( newPlayer );
    this.state.currentPlayer = this.state.currentPlayer || newPlayer;
    this.forceUpdate()
  }

  turnLeft = ()=> {
    if ( ! this.state.currentPlayer ) return;
    this.state.currentPlayer.angle -= 5;
    this.forceUpdate()
  }

  turnRight = ()=> {
    if ( ! this.state.currentPlayer ) return;
    this.state.currentPlayer.angle += 5;
    this.forceUpdate()
  }

  lessPower = ()=> {
    if ( ! this.state.currentPlayer ) return;
    this.state.currentPlayer.power -= 5;
    this.forceUpdate()
  }

  morePower = ()=> {
    if ( ! this.state.currentPlayer ) return;
    this.state.currentPlayer.power += 5;
    this.forceUpdate()
  }

  fire = async ()=> {
    if ( ! this.state.currentPlayer ) return;
    let time = 0;
    let player = this.state.currentPlayer;
    let angleCorrected = ( 360 + 360 - player.angle ) % 360;
    let startX = player.x + Math.cos(angleCorrected*RAD)*6;
    let startY = player.y - Math.sin(angleCorrected*RAD)*6;
    let cannonball = {
      x: startX,
      y: startY
    }
    await new Promise( (resolve)=> {
      let timer = setInterval( () => {
        time += 0.033;
        cannonball.x = startX + ( player.power * time * Math.cos( player.angle * RAD ));
        cannonball.y = startY + ( player.power * time * Math.sin( player.angle * RAD )) - ( GRAV * Math.pow(time,2) / 2);
        requestAnimationFrame(()=>{
          if ( this.paintStage(cannonball) ){
            clearTimeout(timer);
            resolve();
          }
        });
      }, 16);
    });
  }

  componentDidUpdate = () => {
    this.paintStage(false)
  }

  render(){
    window.App = this;
    let current = this.state.currentPlayer;
    let others = this.state.player.filter( (player) => { return player !== current });
    return (
      <div className="App">
        <div className="Header">
        </div>
        <Controls
          player={current}
          turnLeft={this.turnLeft}
          turnRight={this.turnRight}
          lessPower={this.lessPower}
          morePower={this.morePower}
          fire={this.fire}
        />
        <div className="WaitingPlayers">
          <Waiting list={others} />
        </div>
        <div className="Settings">
          <AddPlayer addPlayer={this.addPlayer}/>
          <button>Restart Game</button>
        </div>
        <Battlefield controller={this}/>
      </div>
    );
  }
}

export default App;
