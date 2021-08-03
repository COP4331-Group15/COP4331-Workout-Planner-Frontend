import axios from "axios";
import firebase from "firebase";

const url = 'https://workout-sprinter-api.herokuapp.com/api';

const createToken = async () => {
    const user = firebase.auth().currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    return payloadHeader;
}

// Get test data from the server
export const getTestData = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(url + "/test", header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getCalendarData = async (year, month) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try {
        const res = await axios.get(url + "/calendar/" + uuid + "/" + year + "/" + month, header);
        console.log(url + "/calendar/" + uuid + "/" + year + "/" + month)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getExercisesDataGeneric = async (workoutID) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try {
        const res = await axios.get(url + "/workout/" + uuid + "/" + workoutID + "/exercises", header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getExercisesDataDateSpecifc = async (year, month, day) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try {
        const res = await axios.get(url + "/calendar/" + uuid + "/" + year + "/" + month + "/" + day + "/exercises", header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const postWorkoutData = async (workout) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try{
        const res = await axios.post(url + "/workout/" + uuid + "/create", workout, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const postWorkoutDateSpecific = async (year, month, day, workout) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try {
        const res = await axios.post(url + "/calendar/" + uuid + "/" + year + "/" + month + "/" + day + "/create", workout, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const postExerciseData = async (exercise) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try{
        const res = await axios.post(url + "/exercise/" + uuid + "/create", exercise, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const patchExerciseData = async (exercise, exerciseId) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try{
        const res = await axios.patch(url + "/exercise/" + uuid + "/" + exerciseId + "/update", exercise, header);
        return;
    } catch (e) {
        console.error(e);
    }
}

export const patchCalendarData = async (year, month, day, workout) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try {
        const res = await axios.patch(url + "/calendar/" + uuid + "/" + year + "/" + month + "/" + day + "/update", workout, header);
        return;
    } catch (e) {
        console.error(e);
    }
}

export const deleteCalendarData = async (year, month, day, workout) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;

    try {
        const res = await axios.patch(url + "/calendar/" + uuid + "/" + year + "/" + month + "/" + day + "/update", workout, header);
        return;
    } catch (e) {
        console.error(e);
    }
}

export const deleteExerciseData = async (exerciseId) => {
    const header = await createToken();
    const uuid = firebase.auth().currentUser.uid;
    console.log(exerciseId);
    // const exerciseID = firebase.auth().currentUser.exerciseId;

    try{
        console.log(url + "/exercise/" + uuid + "/" + exerciseId);
        const res = await axios.delete(url + "/exercise/" + uuid + "/" + exerciseId + "/delete", header);
        return;
    } catch (e) {
        console.error(e);
    }
}