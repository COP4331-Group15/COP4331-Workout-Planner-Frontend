import React from 'react';
import ReactDOM from 'react-dom';
import '../pages/styles.css'; 
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios'
import firebase from "../services/fire";
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


const getItems = (count) => {
  var token = firebase.auth().currentUser.getIdToken();
  axios({
    method: 'post',
    url: 'https://workout-sprinter-api.herokuapp.com/api',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  });
  return Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `split_day_id-${k}`,
    content: `split day ${k}`,
    number: k,
  }))};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 16,
  margin: `0 8px 0 0`,
  background: isDragging ? 'royalblue' : 'lavender',
  border: `2px solid royalblue`,
  height: `400px`,
  width: `150px`,
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: 'silver',
  display: 'flex',
  padding: 8,
  overflow: 'auto',
});

class Split_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(6),
      props: props,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.dec_days = this.dec_days.bind(this);
    this.inc_days = this.inc_days.bind(this);
    this.updatedays = this.updatedays.bind(this);
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  dec_days(){
    const items = Array.from(this.state.items);
    items.pop();
    this.setState({
      items,
    });
  }

  inc_days(){
    const items = Array.from(this.state.items);
    items.push({
      id: Math.random().toString(20),
      content: `new split day`,
    });
    this.setState({
      items,
    });
  }

  updatedays(){

  }

  render() {
    return (
      <div>
        <div className ="title_part">
          <div className="header_split">
            Edit Split: {this.state.props.split_id}
          </div>
          <button className="btn" onClick={this.dec_days}>-</button>
          <button className="btn" onClick={this.inc_days}>+</button>
          <button className="btn" onClick={this.updatedays}>Update</button>
        </div>
        <div className ="daysback">
            {this.state.items.map((item, index) => (<div className ="days">Day {index+1}</div>))}
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
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
                      {item.content}
                      <p></p>
                      <input type="text" id="lname" name="lname" value={item.content} style={{width:100}}></input>
                      <p></p>
                      <a href={"/Edit_day?day_id=" + item.number} class="button">Edit day</a>
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


export default Split_table;