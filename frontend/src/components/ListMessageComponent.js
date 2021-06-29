import React from 'react';
import axios from 'axios';

const url = 'https://workout-sprinter.herokuapp.com/api/test';

function ListMessageComponent()
{
    // We establish there is some variable named "data" that changes state.
    // This variable's state changes through the use of the "setData" function,
    // which will update the data variable with whatever data we pass it.
    //
    // When this happens, the component is re-rendered with this new data.
    const [data, setData] = React.useState({});

    // This function is run when the component first builds. In our case, we're
    // using this to define then call an asynchronus function (fetchData), which
    // gets the data from our API endpoint, parses it, and updates our state
    // using setData.
    React.useEffect(() => {
        const fetchData = async () => {
            (async () => {
                const fetchedData = await axios.post(url);
                setData(fetchedData.data);
                console.log(fetchedData);
            })();
        }
        fetchData();
    }, []);

    return (
        <div id="listMessageComponent">
            <p>Message: {data?.message ?? "no"}</p>
            <p>Data: {data?.data ?? "no"}</p>
        </div>
    );
};

export default ListMessageComponent;