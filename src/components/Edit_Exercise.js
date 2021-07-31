import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../pages/styles.css'; 
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios'
// import firebase from "../services/Firebase.js";
import firebase from 'firebase'
import createToken from "../services/communication";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import Split_day from "../components/Split_day.js";



// function Split_table(props){
//   const dropfunc = e => {
//     e.preventDefault();
//     const split_day_id = e.dataTransfer.getData('split_day_id');
//     const split_day_e = document.getElementById(split_day_id);
//     split_day_e.style.display = 'block';
//     e.target.appendChild(split_day_e);
//   }
//   const dragoverfunc = e => {
//     e.preventDefault();
//   }
//   return(
//     <div
//       id={props.id}
//       className = "container"
//       onDrop = {dropfunc}
//       onDragOver = {dragoverfunc}
//     >
//       {props.children}
//     </div>
//   )
// }

// const getItems = async (count) => {
//   var token = firebase.auth().currentUser.getIdToken();
//   axios({
//     method: 'get',
//     url: `https://workout-sprinter-api.herokuapp.com/api/split/${firebase.auth().currentUser.uid}`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     }
//   }).then((res) => {
//     console.log(res);
//     console.log(res.data.StartDate);
//     //{focus,startYear, startMonth, startDate, length, workouts}
//     const date = new Date();
//     date.setFullYear(res.data.StartYear,res.data.StartMonth,res.data.StartDate);
//     console.log(date);
//     return Array.from({ length: 3 }, (v, k) => k).map(k => ({
//       id: Math.random().toString(20),
//       content: `split day ${k}`,
//       number: k,
//       iddd: res.data.Workouts[k],
//     }))
//   }).catch((error) => {
//     console.log(error);
//   });
//   return Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: Math.random().toString(20),
//     content: `split day ${k}`,
//     number: k,
//   }))
// };

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = () => ({
  borderRadius: 25,
  userSelect: 'none',
  padding: 16,
  margin: `0 8px 0 0`,
  background: '#4CAF50',
  border: `2px solid #678f5b`,
  width: `150px`,
});

const getListStyle = () => ({
  background: '#282c34',
  display: 'flex',
  padding: 8,
  overflow: 'hidden',
});

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        props: props,
        startDate: new Date(),
        content: `New Workout`,
        iddd: props.exercise_id,
        muscleGroup: "Default",
        //focusTypes: [1, 0, 0, 0, 0],
        name: "New Workout",
        sets: 0,
        repititions: 0,
        duration: 0,
        resistance: 0,
    };
    this.asyncalicious = this.asyncalicious.bind(this);
    this.updateex = this.updateex.bind(this);
    this.textexist = this.textexist.bind(this);
    this.deleteAlertButton = this.deleteAlertButton.bind(this);
    this.createnewsplit = this.createnewsplit.bind(this);
    this.onchangeMuscleGroup = this.onchangeMuscleGroup.bind(this);
    this.onchangefocusTypes = this.onchangefocusTypes.bind(this);
    this.onchangeRepititions = this.onchangeRepititions.bind(this);
    this.onchangeSets = this.onchangeSets.bind(this);
    this.onchangeDuration = this.onchangeDuration.bind(this);
    this.onchangeResistance = this.onchangeResistance.bind(this);
    this.asyncalicious();
  }

  componentDidMount(){
    this.asyncalicious();
  }

  asyncalicious = async () => {
    var token = await firebase.auth().currentUser.getIdToken();
    var namey = "~empty name";
    var muscleGroup;
    //var focusTypes;
    var sets;
    var repititions;
    var duration;
    var resistance;
    console.log(this.state.props.exercise_id);
    await axios({
        method: 'get',
        url: `https://workout-sprinter-api.herokuapp.com/api/exercise/${firebase.auth().currentUser.uid}/${this.state.props.exercise_id}`,
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if(res == null){
        }
        namey = res.data.Name;
        muscleGroup = res.data.MuscleGroup;
        //focusTypes = res.data.FocusTypes;
        sets = res.data.Sets;
        repititions = res.data.Repititions;
        duration = res.data.Duration;
        resistance = res.data.Resistance;
    });
    this.setState({
        content: namey,
        iddd: this.state.props.exercise_id,
        muscleGroup: muscleGroup,
        //focusTypes: focusTypes,
        sets: sets,
        repititions: repititions,
        duration: duration % 60,
        duration0: Math.floor(duration / 60),
        resistance: resistance,
    });
  }

  deleteAlertButton(){
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure you want to delete the last workout day on the list?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => {}
        },
        {
          label: 'Delete',
          onClick: () => this.dec_days()
        }
      ]
    });
  }


  createnewsplit = async () => {
    var token = await firebase.auth().currentUser.getIdToken();
    const date = new Date();
    var obj = {
      //focus: "Focus",
      startDate: date.getDate(),
      length: 0,
      workouts: [],
      startYear: date.getFullYear(),
      startMonth: date.getMonth(),
    };
    var js = JSON.stringify(obj);
    axios({
      method: 'post',
      url: `https://workout-sprinter-api.herokuapp.com/api/split/${firebase.auth().currentUser.uid}/create`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: js
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }


  updateex = async () => {
    var token = await firebase.auth().currentUser.getIdToken();
    var obj = {
      name: this.state.content,
      muscleGroup: this.state.muscleGroup,
      //focusTypes: this.state.focusTypes,
      sets: this.state.sets,
      repititions: this.state.repititions,
      duration: this.state.duration + this.state.duration0 * 60,
      resistance: this.state.resistance,
    };
    var js = JSON.stringify(obj);
    axios({
      method: 'patch',
      url: `https://workout-sprinter-api.herokuapp.com/api/exercise/${firebase.auth().currentUser.uid}/${this.state.props.exercise_id}/update`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: js
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }

  async textexist(e){
    this.setState({
      content: e.target.value,
    });
    await this.updateex();
  }


  async onchangeMuscleGroup(e){
    this.setState({
        muscleGroup: e.target.value,
    });
    await this.updateex();
  }

  async onchangefocusTypes(e, index){
    // var focusTypes = this.state.focusTypes;
    // if(focusTypes[index]){
    //   focusTypes[index] = 0;
    // }else{
    //   focusTypes[index] = 1;
    // }
    // this.setState({
    //     focusTypes: focusTypes,
    // });
    // await this.updateex();
  }

  async onchangeSets(e){
    var intyy = 0;
    if(e.target.value){
      var removezeros = parseInt(e.target.value, 10);
      for (let i = 0; i < removezeros; i++) {  //to remove zeros after. beautiful. Still doesn't work ;-;
        intyy += 1;
      }
    }
    this.setState({
      sets: intyy,
    });
    await this.updateex();
  }

  async onchangeRepititions(e){
    var intyy = 0;
    if(e.target.value){
      var removezeros = parseInt(e.target.value, 10);
      for (let i = 0; i < removezeros; i++) {  //to remove zeros after. beautiful. Still doesn't work ;-;
        intyy += 1;
      }
    }
    this.setState({
        repititions: intyy,
    });
    await this.updateex();
  }

  async onchangeDuration(e, index){
    var durationtt = 0;
    if(index == 0){
        if(e.target.value){
            durationtt = parseInt(e.target.value, 10);
        }else{
            durationtt = 0;
        }
        this.setState({
            duration0: durationtt,
        });
      }else{
        if(e.target.value){
            durationtt = parseInt(e.target.value, 10);
        }else{
            durationtt = 0;
        }
        this.setState({
            duration: durationtt,
        });
      }
    await this.updateex();
  }

  async onchangeResistance(e){
    var intyy = 0;
    if(e.target.value){
      var removezeros = parseInt(e.target.value, 10);
      for (let i = 0; i < removezeros; i++) {  //to remove zeros after. beautiful. Still doesn't work ;-;
        intyy += 1;
      }
    }
    this.setState({
        resistance: intyy,
    });
    await this.updateex();
  }


  render() {
    return (
        <div>
            {/* <Sidebar isOpen={isOpen} toggle={toggle} {...SidebarCalendar}/>
            <Navbar toggle={toggle} {...NavBarCalendar}/> */}
            <div className ="title_part">
                <div className="header_split">
                    Edit Exercise
                </div>
                <div>
                    <a href="/edit" className="button">Edit Split</a>
                </div>
            </div>
            <div style={getListStyle()}>
                <div style ={getItemStyle()}>
                    Exercise Name:
                    <p style={{fontSize: 2 }}></p>
                    <input type="text" id="namey"  value={this.state.content} onChange={this.textexist} style={{width:100}}></input>
                    <p style={{fontSize: 2 }}></p>
                    MuscleGroup:
                    <p style={{fontSize: 2 }}></p>
                    <input type="text" id="mg"  value={this.state.muscleGroup} onChange={this.onchangeMuscleGroup} style={{width:100}}></input>
                    <p style={{fontSize: 2 }}></p>
                    {/* FocusTypes:
                    <p style={{fontSize: 2 }}></p>
                    <input type="checkbox" id="FocusTypes1"  value="FocusTypes1c" checked={this.state.focusTypes[1]} onChange={ (e) => {this.onchangefocusTypes(e,1)}}></input>Strength
                    <p style={{fontSize: 2 }}></p>
                    <input type="checkbox" id="FocusTypes2"  value="FocusTypes2c" checked={this.state.focusTypes[2]} onChange={ (e) => {this.onchangefocusTypes(e,2)}}></input>Muscle Growth
                    <p style={{fontSize: 2 }}></p>
                    <input type="checkbox" id="FocusTypes3"  value="FocusTypes3c" checked={this.state.focusTypes[3]} onChange={ (e) => {this.onchangefocusTypes(e,3)}}></input>Weight Loss
                    <p style={{fontSize: 2 }}></p>
                    <input type="checkbox" id="FocusTypes4"  value="FocusTypes4c" checked={this.state.focusTypes[4]} onChange={ (e) => {this.onchangefocusTypes(e,4)}}></input>Cardio
                    <p style={{fontSize: 2 }}></p> */}
                    Sets:
                    <p style={{fontSize: 2 }}></p>
                    <input type="number" id="sets"  min="1" max="999999" value={this.state.sets} onChange={this.onchangeSets} style={{width:100}}></input>
                    <p style={{fontSize: 2 }}></p>
                    Repititions:
                    <p style={{fontSize: 2 }}></p>
                    <input type="number" id="repititions"  min="1" max="999999" value={this.state.repititions} onChange={this.onchangeRepititions} style={{width:100}}></input>
                    <p style={{fontSize: 2 }}></p>
                    Resistance:
                    <p style={{fontSize: 2 }}></p>
                    <input type="number" id="resistance"  min="0" max="59" value={this.state.resistance} onChange={this.onchangeResistance} style={{width:100}}></input>
                    <p style={{fontSize: 2 }}></p>
                    Duration:
                    <p style={{fontSize: 2 }}></p>
                    <input type="number" id="durationm" min="0" max="999999" value={this.state.duration0} onChange={(e) => {this.onchangeDuration(e, 0)}} style={{width:40}}></input>min
                    <input type="number" id="durations" min="0" max="59" value={this.state.duration} onChange={(e) => {this.onchangeDuration(e, 1)}} style={{width:40}}></input>sec
                    <p style={{fontSize: 2 }}></p>
                </div>
            </div>
        </div>
    );
  }
}


export default Exercise;