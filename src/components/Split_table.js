import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../pages/styles.css'; 
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios'
import Firebase from "../services/Firebase.js";
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
//   var token = Firebase.auth.currentUser.getIdToken();
//   axios({
//     method: 'get',
//     url: `https://workout-sprinter-api.herokuapp.com/api/split/${Firebase.auth.currentUser.uid}`,
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

const getItemStyle = (isDragging, draggableStyle) => ({
  borderRadius: 25,
  userSelect: 'none',
  padding: 16,
  margin: `0 8px 0 0`,
  background: isDragging ? '#678f5b' : '#4CAF50',
  border: `2px solid #678f5b`,
  width: `166px`,
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: '#282c34',
  display: 'flex',
  padding: 8,
  overflow: 'hidden',
});

class Split_Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      props: props,
      startDate: new Date(),
    };
    this.asyncalicious = this.asyncalicious.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.dec_days = this.dec_days.bind(this);
    this.inc_days = this.inc_days.bind(this);
    this.updatedays = this.updatedays.bind(this);
    this.textexist = this.textexist.bind(this);
    this.deleteAlertButton = this.deleteAlertButton.bind(this);
    this.datepickfunc = this.datepickfunc.bind(this);
    this.createnewsplit = this.createnewsplit.bind(this);
    this.verytextexist = this.verytextexist.bind(this);
    this.onchangeMuscleGroup = this.onchangeMuscleGroup.bind(this);
    this.onchangefocusTypes = this.onchangefocusTypes.bind(this);
    this.onchangeRepititions = this.onchangeRepititions.bind(this);
    this.onchangeSets = this.onchangeSets.bind(this);
    this.onchangeDuration = this.onchangeDuration.bind(this);
    this.onchangeResistance = this.onchangeResistance.bind(this);
    this.onchangeUnworkable = this.onchangeUnworkable.bind(this);
    this.dropdownV = this.dropdownV.bind(this);
    this.dec_ex = this.dec_ex.bind(this);
    this.inc_ex = this.inc_ex.bind(this);
    this.deleteAlertButtonex = this.deleteAlertButtonex.bind(this);
    this.up_ex = this.up_ex.bind(this);
    this.down_ex = this.down_ex.bind(this);
    this.asyncalicious();
  }

  async up_ex(e, index){
    const items = Array.from(this.state.items);
    var thingy = items.find((obj) => {return obj.id == e.target.name;});
    //var itemvar = thingy.exercises.pop();
    if(index > 0){
      var b = thingy.exercises[index];
      thingy.exercises[index] = thingy.exercises[index-1];
      thingy.exercises[index-1] = b;
      this.setState({
        items: items,
      });
      await this.updateworkout(thingy);
    }
  }
  async down_ex(e, index){
    const items = Array.from(this.state.items);
    var thingy = items.find((obj) => {return obj.id == e.target.name;});
    //var itemvar = thingy.exercises.pop();
    if(index < thingy.exercises.length - 1){
      var b = thingy.exercises[index];
      thingy.exercises[index] = thingy.exercises[index+1];
      thingy.exercises[index+1] = b;
      this.setState({
        items: items,
      });
      await this.updateworkout(thingy);
    }
  }
  
  async onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.type === "type_day") {
      const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
      );

      this.setState({
        items,
      });
      await this.updatedays();
    }else if (result.type === "type_ex"){

    }
  }

  componentDidMount(){
    this.asyncalicious();
  }

  asyncalicious = async () => {
    var token = await Firebase.auth.currentUser.getIdToken();
    axios({
      method: 'get',
      url: `https://workout-sprinter-api.herokuapp.com/api/split/${Firebase.auth.currentUser.uid}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then( async (res) => {
      if(res == null){
        this.createnewsplit();
        this.asyncalicious();
        return;
      }
      console.log(res);
      console.log(typeof res.data.Workouts !== 'undefined');
      //{focus,startYear, startMonth, startDate, length, workouts}
      const date = new Date();
      date.setFullYear(res.data.StartYear,res.data.StartMonth,res.data.StartDate);
      console.log(date);
      var items1;
      if(typeof res.data.Workouts !== 'undefined'){
        items1 = await Promise.all(Array.from({ length: res.data.Workouts.length }, (v, k) => k).map( async (k) => {
          //{muscleGroup, focusTypes, name, sets, repititions, duration, resistance, exercises,split,unworkable}
          //var namey = "~empty name";
          //var muscleGroup;
          //var focusTypes;
          //var sets;
          //var repititions;
          var startTime;
          //var resistance;
          var exercises = [];
          //var split;
          var unworkable;
          await axios({
            method: 'get',
            url: `https://workout-sprinter-api.herokuapp.com/api/workout/${Firebase.auth.currentUser.uid}/${res.data.Workouts[k]}`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }).then((res) => {
            if(res == null){
            }
            console.log(res);
            //namey = res.data.Name;
            //muscleGroup = res.data.MuscleGroup;
            //focusTypes = res.data.FocusTypes;
            //sets = res.data.Sets;
            //repititions = res.data.Repititions;
            startTime = res.data.StartTime;
            //resistance = res.data.Resistance;
            //split = res.data.Split;
            unworkable = res.data.Unworkable;
            if(typeof res.data.Exercises !== 'undefined'){
              exercises = res.data.Exercises;
            }else{
            }
            
          });

          exercises = await Promise.all(Array.from({ length: exercises.length }, (v, k) => k).map( async (k) => {
            var namey = "~empty name";
            var muscleGroup;
            //var focusTypes;
            var sets;
            var repititions;
            var duration;
            var resistance;
            await axios({
              method: 'get',
              url: `https://workout-sprinter-api.herokuapp.com/api/exercise/${Firebase.auth.currentUser.uid}/${exercises[k]}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }).then((res) => {
              if(res != null && res.data != null){
                namey = res.data.Name;
                muscleGroup = res.data.MuscleGroup;
                //focusTypes = res.data.FocusTypes;
                sets = res.data.Sets;
                repititions = res.data.Repititions;
                duration = res.data.Duration;
                resistance = res.data.Resistance;
              }else{
                console.log("very bad thing happened");
              }
            });
            return{
              id: Math.random().toString(20),
              content: namey,
              iddd: exercises[k],
              muscleGroup: muscleGroup,
              //focusTypes: focusTypes,
              sets: sets,
              repititions: repititions,
              duration: duration,
              resistance: resistance,
            }
          }));
          
          console.log("thisoneee");
          console.log(exercises);
          return{
            id: Math.random().toString(20),
            //content: namey,
            number: k,
            iddd: res.data.Workouts[k],
            //muscleGroup: muscleGroup,
            //focusTypes: focusTypes,
            //sets: sets,
            //repititions: repititions,
            startTime: startTime % 60,
            startTime0: Math.floor(startTime / 60),
            //resistance: resistance,
            exercises: exercises,
            //split: split,
            unworkable: unworkable,
            V: "V",
            Vshow: "none",
          }
        }));
      }else{
        items1 = [];
      }
      //console.log("IUWHGRFWOIEURHGWOIERUGJHWEOIRLGUHWIER");
      //console.log(items1);
      this.setState({
        items: items1,
        startDate: date,
        //focus: res.data.Focus,
      });
    });
  }

  dec_days = async () => {
    const items = Array.from(this.state.items);
    if(items.length > 0){
      var token = await Firebase.auth.currentUser.getIdToken();
      var itemvar = items.pop();
      axios({
        method: 'delete',
        url: `https://workout-sprinter-api.herokuapp.com/api/workout/${Firebase.auth.currentUser.uid}/${itemvar.iddd}/delete`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res);
        this.setState({
          items,
        });
        this.updatedays();
      }).catch((error) => {
        console.log(error);
      });
      this.setState({
        items,
      });
    }
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

  inc_days = async () => {
    const items = Array.from(this.state.items);
    if(items.length < 9){
      var token = await Firebase.auth.currentUser.getIdToken();
      const date = new Date();
      var obj = {
        //muscleGroup: "Default",
        //focusTypes: [1, 0, 0, 0, 0],
        ///name: "New Workout",
        //sets: 0,
        //repititions: 0,
        startTime: 0,
        //resistance: 0,
        exercises: [],
        //split: 0,
        unworkable: 0
      };
      var js = JSON.stringify(obj);
      axios({
        method: 'post',
        url: `https://workout-sprinter-api.herokuapp.com/api/workout/${Firebase.auth.currentUser.uid}/create`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: js
      }).then((res) => {
        console.log(res);
        items.push({
          id: Math.random().toString(20),
          //content: `New Workout`,
          iddd: res.data.data.name,
          //muscleGroup: "Default",
          //focusTypes: [1, 0, 0, 0, 0],
          //name: "New Workout",
          //sets: 0,
          //repititions: 0,
          startTime: 0,
          //resistance: 0,
          exercises: [],
          //split: 0,
          unworkable: 0,
          Vshow: "none",
          V: "V"
        });
        this.setState({
          items,
        });
        this.updatedays();
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  dec_ex = async (e) => {
    const items = Array.from(this.state.items);
    var thingy = items.find((obj) => {return obj.id == e.target.name;});
    if(thingy.exercises.length > 0){
      var token = await Firebase.auth.currentUser.getIdToken();
      var itemvar = thingy.exercises.pop();
      axios({
        method: 'delete',
        url: `https://workout-sprinter-api.herokuapp.com/api/exercise/${Firebase.auth.currentUser.uid}/${itemvar.iddd}/delete`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then(async (res) => {
        this.setState({
          items: items,
        });
        await this.updateworkout(thingy);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  deleteAlertButtonex(e){
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure you want to delete the last exercise on the list for this workout?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => {}
        },
        {
          label: 'Delete',
          onClick: () => this.dec_ex(e)
        }
      ]
    });
  }

  inc_ex = async (e) => {
    const items = Array.from(this.state.items);
    var thingy = items.find((obj) => {return obj.id == e.target.name;});
    console.log("inc_ex");
    console.log(thingy.exercises);
    if(thingy.exercises.length < 9){
      var token = await Firebase.auth.currentUser.getIdToken();
      var obj = {
        muscleGroup: "Default",
        //focusTypes: [1, 0, 0, 0, 0],
        name: "New Exercise",
        sets: 0,
        repititions: 0,
        duration: 0,
        resistance: 0
      };
      var js = JSON.stringify(obj);
      axios({
        method: 'post',
        url: `https://workout-sprinter-api.herokuapp.com/api/exercise/${Firebase.auth.currentUser.uid}/create`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: js
      }).then(async (res) => {
        console.log(res);
        thingy.exercises.push({
          id: Math.random().toString(20),
          content: `New Exercise`,
          iddd: res.data.data.name,
          muscleGroup: "Default",
          //focusTypes: [1, 0, 0, 0, 0],
          sets: 0,
          repititions: 0,
          duration: 0,
          resistance: 0
        });
        this.setState({
          items: items,
        });
        console.log("inc_ex 2----");
        console.log(thingy.exercises);
        console.log(items);
        await this.updateworkout(thingy);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  createnewsplit = async () => {
    var token = await Firebase.auth.currentUser.getIdToken();
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
      url: `https://workout-sprinter-api.herokuapp.com/api/split/${Firebase.auth.currentUser.uid}/create`,
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

  updatedays = async () => {
    var token = await Firebase.auth.currentUser.getIdToken();
    const items = Array.from(this.state.items);
    const items1m = Array.from({ length: items.length }, (v, k) => k).map(k => (
      items[k].iddd
    ));
    console.log(items1m);
    var obj = {
      //focus: this.state.focus,
      startDate: this.state.startDate.getDate(),
      length: items1m.length,
      workouts: items1m,
      startYear: this.state.startDate.getFullYear(),
      startMonth: this.state.startDate.getMonth(),
    };
    var js = JSON.stringify(obj);
    axios({
      method: 'patch',
      url: `https://workout-sprinter-api.herokuapp.com/api/split/${Firebase.auth.currentUser.uid}/update`,
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

  updateworkout = async (item) => {
    var token = await Firebase.auth.currentUser.getIdToken();
    var exs = Array.from({ length: item.exercises.length }, (v, k) => k).map( (k) => {
      return(
        item.exercises[k].iddd
      )
    });
    console.log("exs");
    console.log(exs);
    var obj = {
      //name: item.content,
      //muscleGroup: item.muscleGroup,
      //focusTypes: item.focusTypes,
      //sets: item.sets,
      //repititions: item.repititions,
      startTime: item.startTime + item.startTime0*60,
      //resistance: item.resistance,
      exercises: exs,
      //split: item.split,
      unworkable: item.unworkable,
    };
    var js = JSON.stringify(obj);
    axios({
      method: 'patch',
      url: `https://workout-sprinter-api.herokuapp.com/api/workout/${Firebase.auth.currentUser.uid}/${item.iddd}/update`,
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
    const items = Array.from(this.state.items);
    var thingy = items.find((obj) => {return obj.id == e.target.name;});
    thingy.content = e.target.value;
    this.setState({
      items,
    });
    await this.updateworkout(thingy);
  }

  async verytextexist(e){
    //this.setState({
      //focus: e.target.value,
    //});
    await this.updatedays();
  }

  async datepickfunc(date){
    this.setState({
      startDate: date,
    });
    await this.updatedays();
  }

  async onchangeMuscleGroup(e){
    // const items = Array.from(this.state.items);
    // var thingy = items.find((obj) => {return obj.id == e.target.name;});
    // thingy.muscleGroup = e.target.value;
    // this.setState({
    //   items,
    // });
    // await this.updateworkout(thingy);
  }

  async onchangefocusTypes(e, index){
    // const items = Array.from(this.state.items);
    // var thingy = items.find((obj) => {return obj.id == e.target.name;});
    // if(thingy.focusTypes[index]){
    //   thingy.focusTypes[index] = 0;
    // }else{
    //   thingy.focusTypes[index] = 1;
    // }
    // this.setState({
    //   items,
    // });
    // await this.updateworkout(thingy);
  }

  async onchangeSets(e){
    // const items = Array.from(this.state.items);
    // var thingy = items.find((obj) => {return obj.id == e.target.name;});
    // if(e.target.value){
    //   var removezeros = parseInt(e.target.value, 10);
    //   thingy.sets = 0;
    //   for (let i = 0; i < removezeros; i++) {  //to remove zeros after. beautiful. Still doesn't work ;-;
    //     thingy.sets += 1;
    //   }
    // }else{
    //   thingy.sets = 0;
    // }
    // this.setState({
    //   items,
    // });
    // await this.updateworkout(thingy);
  }

  async onchangeRepititions(e){
    // const items = Array.from(this.state.items);
    // var thingy = items.find((obj) => {return obj.id == e.target.name;});
    // if(e.target.value){
    //   thingy.repititions = parseInt(e.target.value, 10);
    // }else{
    //   thingy.repititions = 0;
    // }
    // this.setState({
    //   items,
    // });
    // await this.updateworkout(thingy);
  }

  async onchangeDuration(e, index){
    const items = Array.from(this.state.items);
    var thingy = items.find((obj) => {return obj.id == e.target.name;});
    var times = 1;
    if(index == 0){
      if(e.target.value){
        thingy.startTime0 = parseInt(e.target.value, 10);
      }else{
        thingy.startTime0 = 0;
      }
    }else{
      if(e.target.value){
        thingy.startTime = parseInt(e.target.value, 10);
      }else{
        thingy.startTime = 0;
      }
    }
    this.setState({
      items,
    });
    await this.updateworkout(thingy);
  }

  async onchangeResistance(e){
    // const items = Array.from(this.state.items);
    // var thingy = items.find((obj) => {return obj.id == e.target.name;});
    // if(e.target.value){
    //   thingy.resistance = parseInt(e.target.value, 10);
    // }else{
    //   thingy.resistance = 0;
    // }
    // this.setState({
    //   items,
    // });
    // await this.updateworkout(thingy);
  }

  async onchangeUnworkable(e){
    const items = Array.from(this.state.items);
    var thingy = items.find((obj) => {return obj.id == e.target.name;});
    console.log(thingy.unworkable);
    if(thingy.unworkable){
      thingy.unworkable = 0;
    }else{
      thingy.unworkable = 1;
    }
    this.setState({
      items: items,
    });
    await this.updateworkout(thingy);
  }
  
  dropdownV(e){
    const items = Array.from(this.state.items);
    var thingy = items.find((obj) => {return obj.id == e.target.name;});
    if(thingy.V === "V"){
      thingy.Vshow = "block";
      thingy.V = "^";
    }else{
      thingy.Vshow = "none";
      thingy.V = "V";
    }
    this.setState({
      items: items,
    });
  }

  render() {
    return (
      <div>
        {/* <Sidebar isOpen={isOpen} toggle={toggle} {...SidebarCalendar}/>
        <Navbar toggle={toggle} {...NavBarCalendar}/> */}
        <div className ="title_part">
          <div className="header_split">
            Edit Split: {this.state.props.split_id}
          </div>
          <button className="btn" onClick={this.deleteAlertButton}>&nbsp;-&nbsp;</button>
          <button className="btn" onClick={this.inc_days}>&nbsp;+&nbsp;</button>&nbsp;
          {/* <button className="btn" onClick={this.updatedays}>Update</button>&nbsp;&nbsp;&nbsp; */}
          {/* <select name="focus1" id="focus1" value={this.state.focus} onChange={this.verytextexist}>
            <option value="0">Default Focus</option>
            <option value="1">Strength</option>
            <option value="2">Muscle Growth</option>
            <option value="3">Weight Loss</option>
            <option value="4">Cardio</option>
          </select>&nbsp; */}
          <DatePicker selected={this.state.startDate} onChange={this.datepickfunc} />
        </div>
        <div className ="daysback">
            {this.state.items.map((item, index) => (<div className ="days">Day {index+1}</div>))}
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal" type = "type_day">
          {(provided, snapshot) => (
            <div>
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {/* Workout Name:
                      <p style={{fontSize: 2 }}></p>
                      <input type="text" id={item.id} name={item.id} value={item.content} onChange={this.textexist} style={{width:100}}></input>
                      <button className="btn" name={item.id} onClick={this.dropdownV}>{item.V}</button>
                      <p style={{fontSize: 2 }}></p>
                      <div style={{display: item.Vshow}}>
                        MuscleGroup:
                        <p style={{fontSize: 2 }}></p>
                        <input type="text" id={item.id} name={item.id} value={item.muscleGroup} onChange={this.onchangeMuscleGroup} style={{width:100}}></input>
                        <p style={{fontSize: 2 }}></p> */}
                        {/* FocusTypes:
                        <p style={{fontSize: 2 }}></p>
                        <input type="checkbox" id="FocusTypes1" name={item.id} value="FocusTypes1c" checked={item.focusTypes[1]} onChange={ (e) => {this.onchangefocusTypes(e,1)}}></input>Strength
                        <p style={{fontSize: 2 }}></p>
                        <input type="checkbox" id="FocusTypes2" name={item.id} value="FocusTypes2c" checked={item.focusTypes[2]} onChange={ (e) => {this.onchangefocusTypes(e,2)}}></input>Muscle Growth
                        <p style={{fontSize: 2 }}></p>
                        <input type="checkbox" id="FocusTypes3" name={item.id} value="FocusTypes3c" checked={item.focusTypes[3]} onChange={ (e) => {this.onchangefocusTypes(e,3)}}></input>Weight Loss
                        <p style={{fontSize: 2 }}></p>
                        <input type="checkbox" id="FocusTypes4" name={item.id} value="FocusTypes4c" checked={item.focusTypes[4]} onChange={ (e) => {this.onchangefocusTypes(e,4)}}></input>Cardio
                        <p style={{fontSize: 2 }}></p> */}
                        {/* Sets:
                        <p style={{fontSize: 2 }}></p>
                        <input type="number" id="sets" name={item.id} min="1" max="999999" value={item.sets} onChange={this.onchangeSets} style={{width:100}}></input>
                        <p style={{fontSize: 2 }}></p>
                        Repititions:
                        <p style={{fontSize: 2 }}></p>
                        <input type="number" id="repititions" name={item.id} min="1" max="999999" value={item.repititions} onChange={this.onchangeRepititions} style={{width:100}}></input>
                        <p style={{fontSize: 2 }}></p>
                        Resistance:
                        <p style={{fontSize: 2 }}></p>
                        <input type="number" id="resistance" name={item.id} min="0" max="59" value={item.resistance} onChange={this.onchangeResistance} style={{width:100}}></input>
                        <p style={{fontSize: 2 }}></p>
                      </div> */}
                      Start Time:
                      <p style={{fontSize: 2 }}></p>
                      <input type="number" id="durationm" name={item.id} min="0" max="24" value={item.startTime0} onChange={(e) => {this.onchangeDuration(e, 0)}} style={{width:35}}></input>hr
                      <input type="number" id="durations" name={item.id} min="0" max="59" value={item.startTime} onChange={(e) => {this.onchangeDuration(e, 1)}} style={{width:35}}></input>min
                      <p style={{fontSize: 2 }}></p>
                      Unworkable: 
                      <input type="checkbox" id="unworkable" name={item.id} value="idk" checked={item.unworkable} onChange={this.onchangeUnworkable}></input>
                      <p style={{fontSize: 2 }}></p>
                      Exercises:
                      <p style={{fontSize: 2 }}></p>
                      <button className="btn" name={item.id} onClick={this.deleteAlertButtonex}>&nbsp;-&nbsp;</button>
                      <button className="btn" name={item.id} onClick={this.inc_ex}>&nbsp;+&nbsp;</button>&nbsp;
                      <p style={{fontSize: 2 }}></p>
                      <div>
                        {item.exercises.map((item_e, index) => (
                              <div>
                                <button className="btn" name={item.id} onClick={(e) =>{this.up_ex(e,index)}}>^</button>
                                <button className="btn" name={item.id} onClick={(e) =>{this.down_ex(e,index)}}>v</button>
                                <a href={"/Edit_Exercise?exercise_id=" + item_e.iddd} className="button">{index+1}: {item_e.content}</a>
                              </div>      
                        ))}
                      </div>
                    </div>
                  )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
            )}
          </Droppable>
        </DragDropContext>
        

      </div>
    );
  }
}


export default Split_Table;