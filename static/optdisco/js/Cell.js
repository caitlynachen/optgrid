import React from 'react';

export default class Cell extends React.Component {


    getValue(){

        if (this.props.value.isPlayer) {
            return "💣";
        }
        return null;
    }

    render(){
        let className = "cell" + 
        (this.props.value.isMine ? " is-mine" : "") + 
        (this.props.value.isWall ? " is-wall" : "") + 
        (this.props.value.isPlayer ? " is-player" : "") + 
        (this.props.value.isGoal ? " is-goal" : "");

        return (
            <div className={className} style={{background: this.props.value.color}}>
                {this.getValue()}
            </div>
        );
    }
}
