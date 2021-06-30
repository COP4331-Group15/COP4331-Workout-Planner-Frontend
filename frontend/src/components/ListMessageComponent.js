import React from 'react';
import { getTestData } from '../services/communication';

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
            getTestData().then((d) => {
                setData(d);
                console.log(d);
            });
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