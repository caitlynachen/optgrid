import React from 'react';
import Grid from './Grid';
import ReactDOM from 'react-dom';
import data from '../data.js';
const { Component } = React;

export default class ChallengeTwo extends React.Component {


    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {
            test: false,
        };
    }

    passClick = () => {
        this.child.current.passMove();
    };
    failClick = () => {
        this.child.current.failMove();
    };
    testClick = () => {
        this.setState({
            test: true,
        });
        this.child.current.test();
    }; 

    render(){
        let demo = false;

        var grid = data.grids[0];

        let coord = grid.coord;
        let walls = grid.walls;
        let water = grid.water;
        let goals = grid.goals;

        var ft = data.functions[0];
        let rule = ft.rule;


        return (
            <div>
            <h1>Learning Phase</h1>
            <div className="flex-row">
              <section id="side-bar">
               <div id="instructions" className="nes-container">
                  <div class="nes-container">
                    <h2 class="title">Objective:</h2>
                    <p>Learn the task from professor bot.</p>
                    </div>
                <div class="nes-container">
                    <h2>How to learn:</h2>
                    <p>Ask for passing or failing examples.</p>
                </div>
                { !this.state.test ?
                    <div class="nes-container" id="training">
                        <h2 class="title"><img src={require("../imgs/professor_bot.svg")}/> Request an example:</h2>
                        <button id="posDemo" class="nes-btn is-success" 
                            name="posDemo" type="button" 
                            onClick={this.passClick}
                        >
                        Passing Example
                        </button>
                        <button id="negDemo" class="nes-btn is-error" 
                            name="negDemo" type="button"
                            onClick={this.failClick}
                        >
                        Failing Example
                        </button>
                     </div> 
                 : null }
         { !this.state.test ?
        
        <div class="nes-container">
            <h2>Are you ready to be tested?</h2>
            <button id="ready-button" class="nes-btn"
                    name="ready" type="button"
                    disabled={this.state.ready}
                    onClick={this.testClick}
            >
                Yes!
            </button>
        </div>
        : null }
        </div>
    </section>
    <div className="nes-container">
        <Grid coord={coord} walls={walls} water={water} goals={goals} height={10} width={10} ref={this.child} enable={false} level={2} challenge={2}/>
    </div>
    </div>
        </div>
        );
    }
}
