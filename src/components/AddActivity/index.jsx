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

const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function AddActivity(props) {
    const classes = useStyles();

    const {authUser, firebase, selectedDay, postExerciseData, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = authUser.uid;

    // Set query date for updating database
    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    // Set default activity object
    const defaultActivity = {
        muscleGroup: '',
        name: '',
        sets: 0,
        repetitions: 0,
        duration: 0,
        resistance: 0,
        date: queryDate
    }

    const [activity, setActivity] = useState(defaultActivity);

    const handleChange = e => {
        const { name, value } = e.target
        setActivity({
            ...activity, 
            date: queryDate,
            [name]: value});
    }

    const handleSlider = (e, v) => {
        const sets = v;
        setActivity({...activity, sets: sets});
    }

    const handleSlider2 = (e, v) => {
        const repetitions = v;
        setActivity({...activity, repetitions: repetitions});
    }

    const handleSlider3 = (e, v) => {
        const duration = v;
        setActivity({...activity, duration: duration});
    }

    const handleSlider4 = (e, v) => {
        const resistance = v;
        setActivity({...activity, resistance: resistance});
    }



    const isValid = activity.name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = () => {
        postExerciseData(activity);
    }

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl className={classes.formControl}>
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Exercise Name"
                    value={activity.name}
                    name="name"
                    onChange={handleChange}
                />
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Muscle Group"
                    value={activity.muscleGroup}
                    name="muscleGroup"
                    onChange={handleChange}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Sets
                </Typography>
                <Slider
                    value={activity.sets}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    name="sets"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                /><Typography id="discrete-slider" gutterBottom>
                    Repetitions
                </Typography>
                <Slider
                    value={activity.repetitions}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={20}
                    name="repetitions"
                    onChange={handleSlider2}
                    style={{marginBottom: '20px'}}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Duration
                </Typography>
                <Slider
                    value={activity.duration}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={60}
                    name="duration"
                    onChange={handleSlider3}
                    style={{marginBottom: '20px'}}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Resistance 
                </Typography>
                <Slider
                    value={activity.resistance}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={150}
                    name="resistance"
                    onChange={handleSlider4}
                    style={{marginBottom: '20px'}}
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
            Add Exercise
            </Button>
        </form>
    )
};

export default withFirebase(AddActivity);