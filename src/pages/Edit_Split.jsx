import React, { useState } from "react";
import {Link} from "react-router-dom";
//import firebase from "../services/fire";
import ReactDOM from 'react-dom';
import './styles.css'; 
//import Split_day from "../components/Split_day.js";
import Split_Table from "../components/Split_table.js";
import { DragDropContext } from "react-beautiful-dnd";
//import background_img_edit_spilts from './risen-wang-20jX9b35r_M-unsplash.jpg';

const Edit_Split = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const urlParams = new URLSearchParams(window.location.search);
    const split_i = urlParams.get('split_i');
    //const user_id =  firebase.auth().currentUser.uid;

    //some ugly testing code
    //const split_ref = firebase.database().ref(`Splits/${user_id}/`);
    //const usersRef = ref.child('users');
    // split_ref.child(split_i).set({
    //     name: 'Name of first split',
    //     random_test_data: 12345
    // });
    //const split_ref_2 = firebase.database().ref(`Splits/${user_id}/${split_i}`);
    //const name_testy = split_ref_2.child("name");
    
    //console.log(React.findDOMNode("testy").value);
    //let split_days_arr = [];
    //split_days_arr.push(<Split_day key="uniqueId1" name="namey"/>);
    //split_days_arr.push(<Split_day key="uniqueId2" name="nameywwww"/>);

    // const dragoverfunc = (event) => {
    //     event.preventDefault();
    //     split_days_arr.push(<Split_day key="uniqueId2" name="eenewee"/>);
    // };
    document.body.style = "background-Image: url('/risen-wang-20jX9b35r_M-unsplash.jpg'); background-size: auto 200%;";
    return (
        <div>
            <Split_Table id="split_table_1" split_id = {split_i}>
            </Split_Table>

            {/* <div className ="container" onDragOver={dragoverfunc}>
                {split_days_arr}
            </div> */}
        </div>
    )
}

export default Edit_Split