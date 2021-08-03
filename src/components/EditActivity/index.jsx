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

import { patchExerciseData} from '../../services/communication';

const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function EditActivity(props) {
    const classes = useStyles();

    const {authUser, firebase, activity, activityKey, setEditing, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = authUser.uid;

    // Set default activity object
    const defaultActivity = {
        muscleGroup: activity?.muscleGroup ?? "Default",
        name: activity?.name ?? "New Exercise",
        sets: activity?.sets ?? 0,
        repetitions: activity?.repetition ?? 0,
        duration: activity?.duration ?? 0,
        resistance: activity?.resistance ?? 0,
        date: activity?.date

    }

    const [newActivity, setNewActivity] = useState(defaultActivity);

    const handleChange = e => {
        const { name, value } = e.target
        setNewActivity({
            ...newActivity, 
            [name]: value});
    }

    const handleSlider = e => {
        const sets = e.target.getAttribute('aria-valuenow');
        setNewActivity({...newActivity, sets: sets});
    }

    const handleSlider2 = e => {
        const repetitions = e.target.getAttribute('aria-valuenow');
        setNewActivity({...newActivity, repetitions: repetitions});
    }

    const handleSlider3 = e => {
        const duration = e.target.getAttribute('aria-valuenow');
        setNewActivity({...newActivity, duration: duration});
    }

    const handleSlider4 = e => {
        const resistance = e.target.getAttribute('aria-valuenow');
        setNewActivity({...newActivity, resistance: resistance});
    }

    const isValid = newActivity.name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = action => {
        if (authUser) {

            console.log(activityKey);

             patchExerciseData(newActivity, activityKey).then(message => {
                    console.log(message);
                   });

            firebase.updateActivity(uid, newActivity, activityKey);
            setEditing(false);
            // Show alert and hide after 3sec
            setOpenSnackbar(true);
            setSnackbarMsg('Updated activity');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        };
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
                    value={newActivity.name}
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
                    value={newActivity.muscleGroup}
                    name="muscleGroup"
                    onChange={handleChange}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Sets
                </Typography>
                <Slider
                    defaultValue={parseInt(newActivity.sets)}
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
                    defaultValue={parseInt(newActivity.repetitions)}
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
                    defaultValue={parseInt(newActivity.duration)}
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
                    defaultValue={parseInt(newActivity.resistance)}
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
                onClick={() => handleSubmit('add')}
                disabled={isValid}
            >
            Save Exercise Changes
            </Button>
        </form>
    )
};

export default withFirebase(EditActivity);