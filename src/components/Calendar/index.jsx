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
import { getCalendarData, getExercisesDataDateSpecifc, getExercisesDataGeneric } from '../../services/communication';

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
        // Get the user's workout for that day
        const selectedWorkout = calendarData.calendar[parseInt(selectedDay.day) - 1];
        
        setTodaysWorkout(selectedWorkout);
        // Get the user's exercises for that day
        // (Depends on the type of workout)
        console.log(selectedWorkout.Key);
        if(!selectedWorkout.Key) {
            // No key means it is a date-specific workout
            console.log("Trying to access exercises for " + selectedDay.month + "/" + selectedDay.day);
            getExercisesDataDateSpecifc(new Date().getFullYear, selectedDay.month, selectedDay.day).then((e) => setTodaysExercises(e));
        } else {
            
            console.log(selectedWorkout.Key);
            console.log(typeof selectedWorkout.Key);
            const key = selectedWorkout.Key;
            console.log(key);
            console.log("Trying to access exercises for " + key);
            getExercisesDataGeneric(key).then((e) => {
                setTodaysExercises(e);
                console.log(e);
            })
        }
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

    /*** USER DATA ***/
    const [calendarData, setCalendarData] = useState();
    const [todaysWorkout, setTodaysWorkout] = useState();
    const [todaysExercises, setTodaysExercises] = useState();

    const retrieveData = () => {

        // Fetch the user's calendar data
        getCalendarData(selectedDay.year,selectedDay.month).then(data => {
             setCalendarData(data);
             console.log(data);
        });
    };

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

    return (

        /* // Overall Calendar Workspace */
        <Grid container spacing={3}>
            {/* // Calendar Body */}
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
                        userData={calendarData}
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
            {/* {!workout ? ( */}
            <>
            <Grid xs={8}>
                <Paper className="paper">
                <p>A Workout Does not exist</p>
                </Paper>
            </Grid>
            </>
            {/* ) : ( */}
            {/* <>
            
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
            )} */}
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