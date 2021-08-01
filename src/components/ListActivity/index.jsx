import React from 'react';
import { withFirebase } from  '../../services';
import loader from './loader.gif';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function ActivityList(props) {
    const {loading, activities, editActivity,setOpenSnackbar, setSnackbarMsg, setEditing} = props;

    const deleteActivity = (i) => {
        // Get key of activity in firebase
       const activityKey = Object.keys(activities)[i];
       // Connect to our firebase API
       const emptyActivity = {
        muscleGroup: null,
        name: null,
        sets: null,
        repetitions: null,
        duration: null,
        resistance: null,
        date: null
       };

       props.firebase.updateActivity(props.authUser.uid, emptyActivity, activityKey);

       // Show notification
       setOpenSnackbar(true);
       setSnackbarMsg('Deleted activity');
       setTimeout(() => {
        setOpenSnackbar(false)
       }, 3000)

       // stop editing
       setEditing(false);
    }

    return (
        <>
            { 
                loading === true 
                    ? <img src={loader} alt={loader}></img> 
                    : ''
            }
            
            {
                activities === 'not set' || activities === null
                    ? <p>No Exercises Added.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Muscle Group</TableCell>
                                    <TableCell>Sets</TableCell>
                                    <TableCell>Repetitions</TableCell>
                                    <TableCell>Duration (Min)</TableCell>
                                    <TableCell>Resistance</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Object.values(activities).map((activity, i) => {
                                    let {name, muscleGroup, sets, repetitions, duration, resistance} = activity;
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{muscleGroup}</TableCell>
                                            <TableCell>{sets}</TableCell>
                                            <TableCell>{repetitions}</TableCell>
                                            <TableCell>{duration}</TableCell>
                                            <TableCell>{resistance} </TableCell>
                                            <TableCell>
                                                <DeleteIcon 
                                                    onClick={e => deleteActivity(i)}
                                                />
                                                <EditIcon
                                                    onClick={e => editActivity(activity, i)}
                                                    style={{marginLeft:"20px"}}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default withFirebase(ActivityList);