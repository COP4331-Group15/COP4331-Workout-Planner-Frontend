import React from "react";
import { getTestData } from "../services/communication";

import PageTitle from '../components/PageTitle';


const TestPage = () => {
    const [data, setdata] = React.useState({});

    React.useEffect(
        () => {
            getTestData().then( (info) => {
                setdata(info);
            })
        }
    );

    return (
        <div>
            <PageTitle />
            <p>Hello World: {data.message?? 'empty'}</p>
        </div>
    )
}

export default TestPage;