import React from 'react';


export default class Cell extends React.Component {

	render(){
		let battery = this.props.battery;
    	let max_battery = this.props.max_battery;

        return (
            <div id="battery">
    			<h2>Battery Level:</h2>
    			<progress className="nes-progress is-primary" max={max_battery} value={battery}></progress> 
    			<p> {battery} / {max_battery} </p>
			</div>
        );
    }


}