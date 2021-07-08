import React from 'react';
import ReactDOM from 'react-dom';
import '../pages/styles.css'; 
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `split_day_id-${k}`,
    content: `split day ${k}`,
  }));

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
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.dec_days = this.dec_days.bind(this);
    this.inc_days = this.inc_days.bind(this);
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

  render() {
    return (
      <div>
        <div className ="daysback">
          <div className ="days">Day 1</div><div className ="days">Day 2</div><div className ="days">Day 3</div><div className ="days">Day 4</div><div className ="days">Day 5</div>
          <button className="btn" onClick={this.dec_days}>-</button>
          <button className="btn" onClick={this.inc_days}>+</button>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
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
                    </div>
                  )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}


export default Split_table;