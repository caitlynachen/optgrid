import React from 'react';
import Grid from './Grid';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';


export default class Introduction extends React.Component {
	render(){
		return (
			<div>
				<h1>Rules</h1>
				<div id="instructions" className="nes-container">
		            <h2>Instructions</h2>
		            <p className="nes-container">
		                In the following experiment, you will be asked
		                to control a robot moving in the 2D gridworld.
		            </p>
		            <p className="nes-container">
		                There will two tutorial rounds, followed by 
		                three actual rounds. Feel free to skip
		                to the actual rounds by clicking the button
		                at the bottom of the screen if you feel 
		                comfortable with completing the task.
		            </p>
		            <p className="nes-container">
		                <strong>Note:</strong> Try your best to 
		                complete the challenge as quickly and 
		                accurately (for higher rewards) as possible by following the 
		                rules.
		            </p>
		            <p className="nes-container">
		                <strong>Rewards = </strong> 
		                 Baseline + (# of correctly performed tasks) * C
		            </p>
		        </div>
		        <NavLink to="/ChallengeOne" className="nes-btn is-primary">Start Challenge</NavLink>
			</div>
		);
	}
}