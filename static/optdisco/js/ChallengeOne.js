import React from 'react';
import Grid from './Grid';
import data from '../data.js';
import ReactDOM from 'react-dom';


export default class ChallengeOne extends React.Component {

	render(){
		 //change out with correct index

		var grid = data.grids[0];

		let coord = grid.coord;
		let walls = grid.walls;
		let water = grid.water;
		let goals = grid.goals;

		var ft = data.functions[0];
		let rule = ft.rule;

		return (
			<div>
				<h1>Challenge One</h1>
		      <div className="flex-row">
		      <section id="side-bar">
		        <div id="instructions" className="nes-container">
		            <h2>Rules</h2>
		            <p className="nes-container">
		                In the following experiment, you will be asked
		                to control a robot moving in the 2d gridworld
		                on the right.
		            </p>
		            <p className="nes-container">
		                <strong>Rule:</strong> {rule}
		            </p>
		            <p className="nes-container">
		                <strong>Note:</strong> Running out of battery
		                or touching a yellow recharge tile will reset
		                the world.
		            </p>
		        </div>
		        <div className="nes-container">
		        <h2>Controls</h2>
		        <figure>
		          <img src={require("../imgs/Qwerty.svg")}/>
		          <figcaption>Use arrow keys to move the agent.</figcaption>
		        </figure>
		          </div>
		      </section>
		        <div className="nes-container">
		          <Grid coord={coord} walls={walls} water={water} goals={goals} height={10} width={10} enable={true} challenge={1} level={0}/>
		        </div>
		      </div>
      </div>
      );
	}
}