import React, { useState } from 'react';
import CalendarC from 'react-calendar';
import {
    Container,
    Form,
    FormContent,
    FormWrap,
    FormH1,
} from './CalendarElements';
import 'react-calendar/dist/Calendar.css';

const Calendar = () => {
    const [value, onChange] = useState(new Date());
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form action='#'>
                            <FormH1>Workout Schedule</FormH1>
                            <CalendarC
                            onChange={onChange}
                            showWeekNumbers
                            value={value}/>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>  
        </>
    )
}

export default Calendar
