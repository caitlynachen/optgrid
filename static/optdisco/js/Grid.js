import React from 'react';
import Cell from './Cell';
import Battery from './Battery';
import { Redirect } from "react-router-dom";
import ChallengeTwo from './ChallengeTwo';
import data from '../data.js';

const MAX_BATTERY = 20;

export default class Grid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      height: this.props.height,
      width: this.props.width,
      coord: this.props.coord,
      walls: this.props.walls,
      water: this.props.water,
      goals: this.props.goals,
      boardData: this.initBoardData(this.props.height, this.props.width, this.props.coord, this.props.walls, this.props.water, this.props.goals),
      gameWon: false,
      battery: MAX_BATTERY,
      curroute: [],
      route: [],
      level: this.props.level,
      redirect: null,
      enable: this.props.enable,
      challenge: this.props.challenge,
      test: false,
      success: 0,
      color: [],
    };
  }

    // Gets initial board data
    initBoardData(height, width, coord, walls, water, goals) {
        let data = [];

        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let j = 0; j < width; j++) {
                data[i][j] = {
                    x: i,
                    y: j,
                    color: '',
                    isWall: false,
                    isPlayer: false,
                    isGoal: false,
                };
            }
        }
        data = this.plantWater(data, water);
        data = this.plantWalls(data, walls);
        data = this.plantGoals(data, goals);
        data = this.plantPlayer(data, coord);
        return data;
    }

    plantWater(data, water) {
      //change logic in cell and app
        for (let i = 0; i < water.length; i++) {
          let x = water[i][0];
          let y = water[i][1];
          let color = this.getColor(water[i][2]);
          data[x][y].color = color;
        }
        return (data);
    }

    getColor(color) {
      if (color == 0) {
        return 'blue';
      } else {
        return 'red';
      }
    }

    plantWalls(data, walls) {
      //shouldn't be able to go through
        for (let i = 0; i < walls.length; i++) {
          data[walls[i][0]][walls[i][1]].isWall = true;
        }
        return (data);
    }

    plantGoals(data, goals) {
        for (let i = 0; i < goals.length; i++) {
          data[goals[i][0]][goals[i][1]].isGoal = true;
        }
        return (data);
    }

    plantPlayer(data, coord) {
        data[coord[0]][coord[1]].isPlayer = true;
        
        return (data);
    }

    checkGoal(battery, x,y, goals) {
      if (battery <= 0) {
        // alert("You Lost!");

      this.setState(prevState => ({
        level: prevState.level++
      }));  
      this.newLevel(this.state.level);

      }
      for (let i = 0; i < goals.length; i++) {
        let reachedGoal = x == goals[i][0] && y == goals[i][1];
          if (reachedGoal) {
            // alert("You Won!");
            this.setState(prevState => ({
              level: prevState.level++,
              success: prevState.success++,
            }));

            this.newLevel(this.state.level);
          }
        }
    }

    newLevel(level) {
      let curroute = this.state.curroute;
      let route = this.state.route.concat(curroute);
      // alert(this.state.level);

      if (level >= 2) {
        this.setState({
          test: true,
        });
      }
      if (level >= 5) {
        //save total route to json
        const myObjStr = JSON.stringify(route);

        if (this.state.challenge == 1) {
          this.setState({ redirect: "/ChallengeTwo" });
        } else {
          this.setState({ redirect: "/Introduction" });

        }
        //next challenge
      } else {
        //change out with correct index
        var grid = data.grids[1];

        let coord = grid.coord;
        let walls = grid.walls;
        let water = grid.water;
        let goals = grid.goals;

        setTimeout(() => {
        this.resetGrid(
              this.state.height,
              this.state.width,
              coord,
              walls,
              water,
              goals,
              level,
              route
          );
        }, 100); 
      }
    }

  resetGrid(height, width, coord, walls, water, goals, level, route) {
      let updatedData = this.initBoardData(height, width,
        coord, walls, water, goals
      );

        this.setState({
          height: height,
          width: width,
          coord: coord,
          walls: walls,
          water: water,
          goals: goals,
          boardData: updatedData,
          gameWon: false,
          battery: MAX_BATTERY,
          curroute: [],
          route: route,
          level: level,
        });
    }

  isWall(newX, newY, walls) {
    for (let i = 0; i < walls.length; i++) {
      if (walls[i][0] == newX && walls[i][1] == newY) {
        return true;
      }
    }
    return false;
  }

  passMove() {
    setTimeout(() => {
      this.moveTo(4,4);
      setTimeout(() => {
        this.moveDown(this.state.boardData, this.state.coord[0], this.state.coord[1], this.state.walls, this.state.battery);
        setTimeout(() => {
          this.moveRight(this.state.boardData, this.state.coord[0], this.state.coord[1], this.state.walls, this.state.battery);
        }, 500);
      }, 500);
    }, 500);
  }

  failMove() {
    setTimeout(() => {
      this.moveTo(4,4);
      setTimeout(() => {
        this.moveLeft(this.state.boardData, this.state.coord[0], this.state.coord[1], this.state.walls, this.state.battery);
        setTimeout(() => {
          this.moveUp(this.state.boardData, this.state.coord[0], this.state.coord[1], this.state.walls, this.state.battery);
        }, 500);
      }, 500);
    }, 500);
  }

  test() {
    this.setState({
      enable: true,
      test: true,
    });
    document.addEventListener("keydown", this.handleKey, false);

  }

  moveRight(data, x, y, walls, battery, goals) {
    data[x][y].isPlayer = false;

    if (y < this.props.width - 1 && !this.isWall(x, y+1, walls)) {
        y += 1;
        battery -= 1;
        this.updatePlayer(data, x, y, battery);
    }
  }

  moveLeft(data, x, y, walls, battery, goals) {
    data[x][y].isPlayer = false;
    if (y >= 1 && !this.isWall(x, y-1, walls)) {
      y -= 1;
      battery -= 1;
      this.updatePlayer(data, x, y, battery);
    }
  }
  
  moveUp(data, x, y, walls, battery, goals) {
    data[x][y].isPlayer = false;
    if (x >= 1 && !this.isWall(x-1, y, walls)) {
      x -= 1;
      battery -= 1;
      this.updatePlayer(data, x, y, battery);
    }
  }

  moveDown(data, x, y, walls, battery, goals) {
    data[x][y].isPlayer = false;
    if (x < this.props.height - 1 && !this.isWall(x+1, y, walls)) {
      x += 1;
      battery -= 1;
      this.updatePlayer(data, x, y, battery);
    }
  }

  moveTo(newX, newY) {
    let data = this.state.boardData;
    data[this.state.coord[0]][this.state.coord[1]].isPlayer = false;
    this.updatePlayer(data, newX, newY, this.state.battery + 1);

  }

  updatePlayer(data, x, y, battery) {
    if (battery >= 0) {
        data[x][y].isPlayer = true;
        //save route
        this.state.curroute.push([x, y]);

        if (data[x][y].color) {
          this.state.color.push(data[x][y].color);
        }
      }

    this.setState({
      coord: [x,y],
      boardData: data,
      battery: battery,
    });

    this.checkGoal(battery, x, y, this.state.goals);
  }
  
  setTestRound = (clickEvent) => {
    this.newLevel(2);
  }

  handleKey = e => {
    let updatedData = this.state.boardData;
    let x = this.state.coord[0];
    let y = this.state.coord[1];
    let walls = this.state.walls;
    let battery = this.state.battery;

    if(e.key === 'ArrowRight') {
      this.moveRight(updatedData, x, y, walls, battery);
    }

    if(e.key === 'ArrowLeft') {
      this.moveLeft(updatedData, x, y, walls, battery);
    }

    if(e.key === 'ArrowUp') {
      this.moveUp(updatedData, x, y, walls, battery);
    }

    if(e.key === 'ArrowDown') {
      this.moveDown(updatedData, x, y, walls, battery);
    }
  }

  componentDidMount(){
    if (this.state.enable) {
      document.addEventListener("keydown", this.handleKey, false);

    }
  }
  componentWillUnmount(){
    if (this.state.enable) {
      document.removeEventListener("keydown", this.handleKey, false);
    }
  }

    renderBoard(data) {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <Cell value={dataitem} />
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                    </div>);
            })
        });

    }

    // Component methods

    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
        return (
            <div className="board">
              {this.state.test ?
                  <h2 class="title">Trial: {this.state.level - 1} / 3</h2>
                :null }

                {
                    this.renderBoard(this.state.boardData)
                }
                <Battery
                    battery={this.state.battery}
                    max_battery={MAX_BATTERY}
                />
                {!this.state.test && this.state.challenge == 1 && this.state.success >= 2 ?
                    <button id="test" className="nes-btn is-primary" onClick={this.setTestRound}> End Tutorial </button>
                :null }
            </div>
        );
    }
}