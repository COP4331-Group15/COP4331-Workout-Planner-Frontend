import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';

import AddActivity from '../AddActivity';
import EditActivity from '../EditActivity';
import ActivityList from '../ListActivity';
import { deleteCalendarData, deleteExerciseData, getCalendarData, getExercisesDataDateSpecifc, getExercisesDataGeneric, patchCalendarData, patchExerciseData, postExerciseData, postWorkoutData, postWorkoutDateSpecific } from '../../services/communication';

import AddWorkout from '../AddWorkout'
import EditWorkout from '../EditWorkout';


function Calendar(props) {

    const { firebase, authUser } = props;

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
        // If we don't have the calendar loaded yet, skip out
        if (!calendarData || calendarData?.calendar?.length <= 0) {
            return;
        }
        // Get the user's workout for that day
        const selectedWorkout = calendarData.calendar[day - 1];
        setTodaysWorkout(selectedWorkout);

        // Get the user's exercises for that day
        // (Depends on the type of workout)
        if (!selectedWorkout?.Key ?? false) {
            // No key means it is a date-specific workout
            console.log("Date speciifc!");
            getExercisesDataDateSpecifc(new Date().getFullYear(), currentMonthNum(), day).then((e) =>{
                setTodaysExercises(e.exercises)});
        } else {
            const key = selectedWorkout.Key;
            getExercisesDataGeneric(key).then((e) => {
                setTodaysExercises(e.exercises);
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
    const [loading, setLoading] = useState([]);
    const [editing, setEditing] = useState(false);

    /*** USER DATA ***/
    const [calendarData, setCalendarData] = useState();
    const [todaysWorkout, setTodaysWorkout] = useState();
    const [todaysExercises, setTodaysExercises] = useState();

    const retrieveData = () => {
        // Fetch the user's calendar data
        getCalendarData(new Date().getFullYear(), selectedDay.month).then(data => {
            setCalendarData(data);
            const selectedWorkout = data.calendar[selectedDay.day - 1];
            setTodaysWorkout(selectedWorkout);

            // Get the user's exercises for that day
            // (Depends on the type of workout)
            if (!selectedWorkout?.Key ?? false) {
                // No key means it is a date-specific workout
                getExercisesDataDateSpecifc(new Date().getFullYear(), currentMonthNum(), selectedDay.day).then((e) =>{
                    setTodaysExercises(e.exercises)});
            } else {
                const key = selectedWorkout.Key;
                getExercisesDataGeneric(key).then((e) => {
                    setTodaysExercises(e.exercises);
                })
            }
        });
    };

    useEffect(() => retrieveData(), []);

    const handleNewWorkout = async newWorkout => {
        // Post new workout to the server
        await postWorkoutDateSpecific(new Date().getFullYear(), selectedDay.month, selectedDay.day, newWorkout);
        // Ask for new calendar data
        retrieveData();
    }

    const handleUpdatedWorkout = async updateWorkout => {
        // Patch updated workout to the server
        await patchCalendarData(new Date().getFullYear(), selectedDay.month, selectedDay.day, updateWorkout);
        // Ask for new calendar data
        retrieveData();
    }

    const handleDeleteWorkout = async date => {
        // Delete workout on the server
        await deleteCalendarData(new Date().getFullYear(), date.month, date.day);
        // Ask for new calendar data
        retrieveData();
    }

    const addActivity = async activity =>  {
        // Add this activity to the server
        const key = (await postExerciseData(activity)).data.name;

        // If we don't have exercises, create one
        const relevantWorkout = calendarData.calendar[selectedDay.day - 1];
        console.log(relevantWorkout);
        if(!relevantWorkout.Exercises) relevantWorkout.Exercises = [];

        // Add this key to our workout
        relevantWorkout.Exercises.push(key);

        // Update this workout on the server
        await patchCalendarData(new Date().getFullYear(), selectedDay.month, selectedDay.day, {"startTime": relevantWorkout.StartTime, "unworkable": relevantWorkout.Unworkable, "exercises": relevantWorkout.Exercises});

        setSnackbarMsg('Added new exercise');
        setTimeout(() => {
            setOpenSnackbar(false)
        }, 3000);

        retrieveData();
    }

    const editActivity = (i) => {
        // Set activity editing something
        setEditing(todaysExercises[i]);
    }

    const saveExerciseEdit = async (activity)  => {

        console.log(activity);
        console.log("hello");

        await patchExerciseData(activity, activity.key);

        retrieveData();
    }

    const deleteActivityClicked = async index => {
        const activityKey = todaysExercises[index].Key;


        // Delete activity (exercise) on the server
        await deleteExerciseData(activityKey);
        // Ask for new calendar data
        retrieveData();
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
                    {!todaysWorkout?.Key ?? false
                        ?
                        <>
                            <h3>Edit Custom Workout on {selectedDay.month + 1}-{selectedDay.day} </h3>
                            <EditWorkout
                                inWorkout={todaysWorkout}
                                selectedDay={selectedDay}
                                selectedDay={selectedDay}
                                selectedDay={selectedDay}
                                authUser={props.authUser}
                                setOpenSnackbar={setOpenSnackbar}
                                setSnackbarMsg={setSnackbarMsg}
                                onSubmit={handleNewWorkout}
                                handleUpdateClick={handleUpdatedWorkout}
                                handleDeleteClick={handleDeleteWorkout}
                            />
                        </>
                        :
                        <>
                            <h3>Add Custom Workout for {selectedDay.month + 1}-{selectedDay.day} </h3>
                            <AddWorkout
                                selectedDay={selectedDay}
                                selectedDay={selectedDay}
                                selectedDay={selectedDay}
                                authUser={props.authUser}
                                setOpenSnackbar={setOpenSnackbar}
                                setSnackbarMsg={setSnackbarMsg}
                                onSubmit={handleNewWorkout}
                            />
                        </>
                    }
                </Paper>
            </Grid>
            {!todaysWorkout ? (
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
                                activities={todaysExercises}
                                authUser={props.authUser}
                                canEdit={!todaysWorkout.Key}
                                setOpenSnackbar={setOpenSnackbar}
                                setSnackbarMsg={setSnackbarMsg}
                                deleteClicked={deleteActivityClicked}
                                editActivity={editActivity}
                                setEditing={setEditing}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        {todaysWorkout.Key ?
                            <></> : <><Paper className="paper">
                                {editing
                                    ?
                                    <>
                                        <h3>Edit Exercise on {selectedDay.month + 1}-{selectedDay.day} </h3>
                                        <EditActivity
                                            activity={editing}
                                            selectedDay={selectedDay}
                                            selectedDay={selectedDay}
                                            selectedDay={selectedDay}
                                            authUser={props.authUser}
                                            handleEditCancel={() => setEditing(false)}
                                            saveExerciseEdit={saveExerciseEdit}
                                            setOpenSnackbar={setOpenSnackbar}
                                            setSnackbarMsg={setSnackbarMsg}
                                        />
                                    </>
                                    :
                                    <>
                                        <h3>Add Exercise for {selectedDay.month + 1}-{selectedDay.day} </h3>
                                        <AddActivity
                                            selectedDay={selectedDay}
                                            selectedDay={selectedDay}
                                            selectedDay={selectedDay}
                                            authUser={props.authUser}
                                            setOpenSnackbar={setOpenSnackbar}
                                            setSnackbarMsg={setSnackbarMsg}
                                            postExerciseData={addActivity}
                                        />
                                    </>
                                }
                            </Paper></>}
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



            <Grid item xs={1}>
                <Button
                    color="primary"
                    onClick={retrieveData}
                >
                    Refresh
                </Button>
            </Grid>
        </Grid>
    )


};

export default Calendar;