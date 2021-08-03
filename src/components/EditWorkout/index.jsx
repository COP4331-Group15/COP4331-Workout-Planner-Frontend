import React, { useEffect, useState } from 'react';
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

    const {authUser, firebase, selectedDay, setOpenSnackbar, setSnackbarMsg, inWorkout, onSubmit, handleUpdateClick, handleDeleteClick} = props;

    const fromIntToTimeString = startInt => {
        let hourSymbol = Math.floor(startInt / 60);
        let minuteSymbol = startInt % 60;

        hourSymbol = hourSymbol.toString();
        if(hourSymbol.length < 2) hourSymbol = "0" + hourSymbol;

        minuteSymbol = minuteSymbol.toString();
        if(minuteSymbol.length < 2) minuteSymbol = "0" + minuteSymbol;

        return hourSymbol + ":" + minuteSymbol;
    }

    const fromStringToTimeInt = startString => {
        const splitString = startString.split(":");

        const hour = parseInt(splitString[0]);
        const min = parseInt(splitString[1]);

        return hour * 60 + min;
    }

    useEffect(() => {
        setWorkout({
            startTime: fromIntToTimeString(inWorkout?.StartTime ?? 480),
            unworkable: (inWorkout?.Unworkable ?? 0 == 1),
            exercises: inWorkout?.Exercises ?? [],
        })
    }, [inWorkout]);


    // Set default activity object
    const defaultWorkout = {
        startTime: fromIntToTimeString(inWorkout?.StartTime ?? 480),
        unworkable: (inWorkout?.Unworkable ?? 0 == 1),
        exercises: inWorkout?.Exercises ?? [],
    }

    const [workout, setWorkout] = useState(defaultWorkout);

    const handleChange = e => {
        const { name, value } = e.target

        setWorkout({
            ...workout,
            [name]: value});
    }

    const isValid = workout.startTime === '';

    
    const handleSubmit = () => {
        // Create our new workout, parsed for transmission
        const newWorkout = {
            startTime: fromStringToTimeInt(workout.startTime),
            unworkable: workout.unworkable ? 1 : 0,
            exercises: workout.exercises
        }
        // Call function
        handleUpdateClick(newWorkout);
    }

    const handleDelete = () => {
        handleDeleteClick(selectedDay);
    }

    const [state, setState] = React.useState({
        checkedG: false,
    });
    
    const handleChange2 = e => {
        setState({ ...state, [e.target.name]: e.target.checked });
        setWorkout({...workout, unworkable: true});
    };

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl className={classes.formControl}>
                <TextField
                    type="time"
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
                <FormControlLabel
                control={<GreenCheckbox checked={state.checkedG} onChange={handleChange2} name="checkedG" />}
                label="Unworkable date"
                />
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isValid}
            >
            Update Custom Workout
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                disabled={isValid}
            >
            Delete Custom Workout
            </Button>
        </form>
    )
};

export default withFirebase(AddWorkout);