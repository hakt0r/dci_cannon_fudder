import React from 'react';

class Highscore extends React.Component {
  render(){
    let i = 0;
    return (
      <table className="Highscore">
        <thead>
          <tr>
            <td>Name</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
        { this.props.highscore.map( (entry)=> {
          return (
            <tr key={i++}><td>{entry.name}</td><td>{entry.score}</td></tr>
          );
        })}
        </tbody>
      </table> );
  }
}

export default Highscore;
