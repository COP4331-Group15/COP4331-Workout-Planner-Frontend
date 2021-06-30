import axios from "axios";
import fire from "./fire";

var url = "http://localhost:5000/api";
if(process.env.NODE_ENV === 'production') {
    url = 'https://workout-sprinter.herokuapp.com/api';
}

const createToken = async () => {
    const user = fire.auth().currentUser;
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