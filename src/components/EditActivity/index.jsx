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
        name: activity.name,
        type: activity.type,
        duration: activity.duration,
        date: activity.date,
        MuscleGroup: activity.MuscleGroup,
        resistance: activity.resistance

    }

    const [newActivity, setNewActivity] = useState(defaultActivity);

    const handleChange = e => {
        const { name, value } = e.target
        setNewActivity({
            ...newActivity, 
            [name]: value});
    }

    const handleSlider = e => {
        const duration = e.target.getAttribute('aria-valuenow');
        const repetition = e.target.getAttribute('aria-valuenow');
        const distance = e.target.getAttribute('aria-valuenow');
        const resistance = e.target.getAttribute('aria-valuenow');
        setNewActivity({...newActivity, duration: duration});
        setNewActivity({...newActivity, repetition: repetition});
        setNewActivity({...newActivity, distance: distance});
        setNewActivity({...newActivity, resistance: resistance});
    }

    const isValid = newActivity.name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = action => {
        if (authUser) {
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
                    value={newActivity.name}
                    label="Activity name"
                    name="name"
                    onChange={handleChange}
                />
                <div style={{marginTop: '20px', marginBottom: '30px'}}>
                    <Typography id="discrete-slider" gutterBottom>
                        Type
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newActivity.type}
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
                </div>
                <Typography id="discrete-slider" gutterBottom>
                    Duration
                </Typography>
                <Slider
                    defaultValue={parseInt(newActivity.duration)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={120}
                    name="duration"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                />
                <Typography id="discrete-slider" gutterBottom>
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
            Save activity
            </Button>
        </form>
    )
};

export default withFirebase(EditActivity);