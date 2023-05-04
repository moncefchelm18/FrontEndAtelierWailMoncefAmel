import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EquipmentTableHeader from "../EquipmentTableHeader";
import './CSS/calendar.css';
import Path from "../Path";

const localizer = momentLocalizer(moment);

const HPCScheduleAllocationManager = (props) => {
    // Sample data. Replace this with data fetched from your backend API.
    const events = [
        {
            title: 'John Doe - HPC Reservation',
            start: new Date(2023, 3, 19, 10, 0),
            end: new Date(2023, 3, 19, 12, 0),
        },
        {
            title: 'Jane Smith - HPC Reservation',
            start: new Date(2023, 3, 18, 14, 0),
            end: new Date(2023, 3, 18, 16, 0),
        },
    ];

    return (
        <>
            <Path pathName={'HPC schedule'}/>
            <div className="inventory-table">
                <EquipmentTableHeader title={'Avaliable HPC time slots'}/>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    className="calendar"
                />
            </div>
        </>

    );
};

export default HPCScheduleAllocationManager;
