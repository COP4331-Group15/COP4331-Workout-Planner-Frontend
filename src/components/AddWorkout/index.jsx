import React, { useState } from 'react';
import { withFirebase } from '../../services';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { postExerciseData, patchCalendarData } from '../../services/communication';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

function AddWorkout(props) {
    const classes = useStyles();

    const {authUser, firebase, selectedDay, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = authUser.uid;

    // Set query date for updating database
    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    // Set default activity object
    const defaultWorkout = {
        startTime: '8:00AM',
        unworkable: false,
        // name: '',
        // type: 1,
        // muscleGroup: 1,
        // duration: '',
        // repetition: '',
        // distance: '',
        // resistance: 70,
        exercise: [],
        date: queryDate
    }

    const [workout, setWorkout] = useState(defaultWorkout);

    const handleChange = e => {
        const { name, value } = e.target
        setWorkout({
            ...workout, 
            date: queryDate,
            [name]: value});
    }

    // const newMonth = selectedDay.month + 1;

    // const handleSlider = e => {
    //     const duration = e.target.getAttribute('aria-valuenow');
    //     const repetition = e.target.getAttribute('aria-valuenow');
    //     const distance = e.target.getAttribute('aria-valuenow');
    //     const resistance = e.target.getAttribute('aria-valuenow');
    //     setActivity({...activity, duration: duration});
    //     setActivity({...activity, repetition: repetition});
    //     setActivity({...activity, distance: distance});
    //     setActivity({...activity, resistance: resistance});
    // }

    const isValid = workout.startTime === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = () => {
        if (authUser) {

            // postExerciseData(activity).then(key => {
            //     console.log(key);})

                //workout.exercise.push(key);

                patchCalendarData(selectedDay.year,selectedDay.month ,selectedDay.day,workout).then(data => {
                    console.log(data);
                    // console.log(newMonth);
                    // console.log(selectedDay.month);
                   });
            

            firebase.addWorkout(uid, workout);
            setWorkout(defaultWorkout);
            // Show notification
            setOpenSnackbar(true);
            setSnackbarMsg('Added Workout');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        }
    }

    const handleSubmit2 = () => {
        if (authUser) {

            // postExerciseData(activity).then(key => {
            //     console.log(key);})

                //workout.exercise.push(key);

                patchCalendarData(selectedDay.year,selectedDay.month ,selectedDay.day,workout).then(data => {
                    console.log(data);
                    // console.log(newMonth);
                    // console.log(selectedDay.month);
                   });
            

            firebase.addWorkout(uid, workout);
            setWorkout(defaultWorkout);
            // Show notification
            setOpenSnackbar(true);
            setSnackbarMsg('Workout Deleted');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        }
    }

    const [state, setState] = React.useState({
        checkedG: false,
    });
    
    const handleChange2 = e => {
        setState({ ...state, [e.target.name]: e.target.checked });
        const unworkable = e.target.getAttribute('aria-valuenow');
        setWorkout({...workout, unworkable: true});
    };

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl className={classes.formControl}>
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Start Time"
                    value={workout.startTime}
                    name="startTime"
                    onChange={handleChange}
                />
                {/* <div style={{marginTop: '20px', marginBottom: '30px'}}>
                    <Typography id="discrete-slider" gutterBottom>
                        Type
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={activity.type}
                        style={{minWidth: '100%'}}
                        name="type"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Cardio</MenuItem>
                        <MenuItem value={2}>Resistance</MenuItem>
                        <MenuItem value={3}>Other</MenuItem>
                    </Select>
                    <Typography id="discrete-slider" gutterBottom>
                        Muscle Group
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={activity.MuscleGroup}
                        style={{minWidth: '100%'}}
                        name="MuscleGroup"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Pecs</MenuItem>
                        <MenuItem value={2}>Biceps</MenuItem>
                        <MenuItem value={3}>Delts</MenuItem>
                        <MenuItem value={4}>Other</MenuItem>
                    </Select>
                </div> */}
                {/* <Typography id="discrete-slider" gutterBottom>
                    Duration (min)
                </Typography>
                <Slider
                    defaultValue={activity.duration}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={120}
                    name="duration"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                /> */}
                <FormControlLabel
                control={<GreenCheckbox checked={state.checkedG} onChange={handleChange2} name="checkedG" />}
                label="Unworkable date"
                />
                {/* <Typography id="discrete-slider" gutterBottom>
                    Repetition
                </Typography>
                <Slider
                    defaultValue={activity.repetition}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    name="repetition"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Distance (miles)
                </Typography>
                <Slider
                    defaultValue={activity.distance}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    name="distance"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Resistance 
                </Typography>
                <Slider
                    defaultValue={activity.resistance}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={150}
                    name="resistance"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                /> */}
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isValid}
            >
            Add Workout
            </Button>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSubmit2}
                disabled={isValid}
            >
            Delete Workout
            </Button>
        </form>
    )
};

export default withFirebase(AddWorkout);