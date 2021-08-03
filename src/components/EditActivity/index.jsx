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

import { patchExerciseData } from '../../services/communication';

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

    const { authUser, firebase, activity, handleEditCancel, saveExerciseEdit, setEditing, setOpenSnackbar, setSnackbarMsg } = props;
    const uid = authUser.uid;

    // Set default activity object
    const defaultActivity = {
        MuscleGroup: activity?.MuscleGroup ?? "Default",
        Name: activity?.Name ?? "New Exercise",
        Sets: activity?.Sets ?? 0,
        Repetitions: activity?.Repetitions ?? 0,
        Duration: activity?.Duration ?? 0,
        Resistance: activity?.Resistance ?? 0,
        Key: activity?.Key ?? ""
    }

    useEffect(() => {
        setNewActivity({
            MuscleGroup: activity?.MuscleGroup ?? "Default",
            Name: activity?.Name ?? "New Exercise",
            Sets: activity?.Sets ?? 0,
            Repetitions: activity?.Repetitions ?? 0,
            Duration: activity?.Duration ?? 0,
            Resistance: activity?.Resistance ?? 0,
            Key: activity?.Key ?? ""
        })
    }, [activity]);

    const [newActivity, setNewActivity] = useState(defaultActivity);

    const handleChange = (e, v) => {
        console.log(e);
        const { name, value } = e.target
        setNewActivity({
            ...newActivity,
            [name]: value
        });
    }

    const handleSlider = (e, v) => {
        setNewActivity({ ...newActivity, Sets: v });
    }

    const handleSlider2 = (e, v) => {
        setNewActivity({ ...newActivity, Repetitions: v });
    }

    const handleSlider3 = (e, v) => {
        setNewActivity({ ...newActivity, Duration: v });
    }

    const handleSlider4 = (e, v) => {
        setNewActivity({ ...newActivity, Resistance: v });
    }

    const isValid = newActivity.Name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = () => {
        saveExerciseEdit({
            name: newActivity.Name,
            muscleGroup: newActivity.MuscleGroup,
            sets: newActivity.Sets,
            repetitions: newActivity.Repetitions,
            duration: newActivity.Duration,
            resistance: newActivity.Resistance,
            key: newActivity.Key
        });
    }

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl className={classes.formControl}>
                <TextField
                    style={{ marginTop: '5px' }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Exercise Name"
                    value={newActivity.Name}
                    name="Name"
                    onChange={handleChange}
                />
                <TextField
                    style={{ marginTop: '5px' }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Muscle Group"
                    value={newActivity.MuscleGroup}
                    name="MuscleGroup"
                    onChange={handleChange}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Sets
                </Typography>
                <Slider
                    value={newActivity.Sets}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    Name="Sets"
                    onChange={handleSlider}
                    style={{ marginBottom: '20px' }}
                /><Typography id="discrete-slider" gutterBottom>
                    Repetitions
                </Typography>
                <Slider
                    value={newActivity.Repetitions}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={20}
                    Name="Repetitions"
                    onChange={handleSlider2}
                    style={{ marginBottom: '20px' }}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Duration
                </Typography>
                <Slider
                    value={newActivity.Duration}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={60}
                    Name="Duration"
                    onChange={handleSlider3}
                    style={{ marginBottom: '20px' }}
                />
                <Typography id="discrete-slider" gutterBottom>
                    Resistance
                </Typography>
                <Slider
                    value={newActivity.Resistance}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={150}
                    Name="Resistance"
                    onChange={handleSlider4}
                    style={{ marginBottom: '20px' }}
                />
            </FormControl>
            <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleEditCancel}
                disabled={isValid}
            >
                Cancel Edit
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isValid}
            >
                Save Exercise Changes
            </Button>
        </form>
    )
};

export default withFirebase(EditActivity);