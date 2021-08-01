import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';

import AddActivity from '../AddActivity';
import EditActivity from '../EditActivity';
import ActivityList from '../ListActivity';
import { getCalendarData } from '../../services/communication';

import AddWorkout from '../AddWorkout'


function Calendar(props) {

    const {firebase, authUser} = props;

    let defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month()
    };

    /*** HOOKS ***/
    const [dateObject, setdateObject] = useState(moment());
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [selectedDay, setSelected] = useState(defaultSelectedDay);
    // Later add hook for active days from database

    /*** CALENDAR HEAD ***/
    const allMonths = moment.months();
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(dateObject).set("month", monthNo);
        setdateObject(newDateObject);
        setShowMonthTable(false);
    }

    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

    /*** CALENDAR BODY ***/
    const setSelectedDay = day => {
        setSelected({
                day,
                month: currentMonthNum()
        });
         // Later refresh data
    };

    const currentMonthNum = () => dateObject.month();
    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const actualMonth = () => moment().format("MMMM");

    const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

    /*** ADDING AN ACTIVITY ***/
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState(null);

    /*** ACTIVITY LIST ***/
    const [activities, setActivities] = useState(true);
    const [loading, setLoading] = useState([]);
    // const [activeDays, setActiveDays] = useState([]);

    const retrieveData = () => {

        getCalendarData(selectedDay.year,selectedDay.month).then(data => {
             console.log(data);
        });


        
        let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

        let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
        ref.orderByChild("date").equalTo(queryDate).on("value", snapshot => {
            let data = snapshot.val();
            console.log(data);
            setActivities(data);
            setLoading(false);
            // setEditing(false); Add later
        });

        // Update active days
        // retrieveActiveDays();
    };

    // const retrieveActiveDays = () => {
    //     let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
    //     ref.on("value", snapshot => {
    //         let data = snapshot.val();
    //         const values = Object.values(data);
    //         // Store all active day/month combinations in array for calendar
    //         const arr = []; 
    //         arr = values.map(obj => {
    //             return obj.date.length === 8
    //             ? obj.date.slice(0,3)
    //             : obj.date.slice(0,4)
    //         });
    //         console.log(arr);
    //         setActiveDays(arr);
    //     });
    // }

    useEffect(() => retrieveData(), [selectedDay]);

    /*** EDIT AN ACTIVITY ***/
    const [editing, setEditing] = useState(false);
    const [activity, setActivity] = useState(null);
    const [activityKey, setActivityKey] = useState(null);

    const editActivity = (activity, i) => {
        setActivityKey(Object.keys(activities)[i]);
        console.log(Object.keys(activities)[i]);
        setEditing(true);
        setActivity(activity);
    }

    const [workout, setWorkout] = useState(true);

    const editWorkout = () => {
        setWorkout(true);
    }

    return (

        <Grid container spacing={3}>
            <Grid item xs={8}>
                    <CalendarHead
                        allMonths={allMonths}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        setMonth={setMonth}
                        showMonthTable={showMonthTable}
                        toggleMonthSelect={toggleMonthSelect}
                    />
                    <CalendarBody 
                        firstDayOfMonth={firstDayOfMonth}
                        daysInMonth={daysInMonth}
                        currentDay={currentDay}
                        currentMonth={currentMonth}
                        currentMonthNum={currentMonthNum}
                        actualMonth={actualMonth}
                        setSelectedDay={setSelectedDay}
                        selectedDay={selectedDay}
                        weekdays={moment.weekdays()} 
                        // activeDays={activeDays}
                    />
            </Grid>

            <Grid item xs={4}>
                <Paper className="paper">
                    { editing
                        ?
                            <>
                                <h3>Edit Workout on {selectedDay.month + 1}-{selectedDay.day} </h3>
                                <EditActivity 
                                    activity={activity}
                                    activityKey={activityKey}
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setEditing={setEditing}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                        :
                            <>
                                <h3>Add Workout for {selectedDay.month + 1}-{selectedDay.day} </h3>
                                <AddWorkout 
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                    // editWorkout={editWorkout}
                                    // setWorkout = {setWorkout}
                                />
                            </>
                    }
                </Paper>
            </Grid>
            {!workout ? (
            <>
            <Grid xs={8}>
                <Paper className="paper">
                <p>A Workout Does not exist</p>
                </Paper>
            </Grid>
            </>
            ) : (
            <>
            
            <Grid xs={8}>
                <Paper className="paper">
                <h3>Exercises for Workout on {selectedDay.month + 1}-{selectedDay.day}</h3>
                <ActivityList
                    loading={loading}
                    activities={activities}
                    authUser={props.authUser}
                    setOpenSnackbar={setOpenSnackbar}
                    setSnackbarMsg={setSnackbarMsg}
                    editActivity={editActivity}
                    setEditing={setEditing}
                />
                </Paper>
            </Grid>
            
            <Grid item xs={4}>
                <Paper className="paper">
                    { editing
                        ?
                            <>
                                <h3>Edit Exercise on {selectedDay.month + 1}-{selectedDay.day} </h3>
                                <EditActivity 
                                    activity={activity}
                                    activityKey={activityKey}
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setEditing={setEditing}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                        :
                            <>
                                <h3>Add Exercise for {selectedDay.month + 1}-{selectedDay.day} </h3>
                                <AddActivity 
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                    }
                </Paper>
            </Grid>
            </>
            )}
            <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={openSnackbar} 
                message={snackbarMsg}
            />
        </Grid>
    )
};

export default Calendar;