import React, {Fragment, useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EquipmentTableHeader from "../EquipmentTableHeader";
import './CSS/calendar.css';
import Path from "../Path";
import HPCAllocationForm from "../ResearcherComponents/Forms/HPCAllocationForm";
import axios from "axios";

const localizer = momentLocalizer(moment);

const HPCScheduleAllocationManager = (props) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://172.20.10.4:8000/allocatehpc/');
                const data = response.data;

                const formattedEvents = data.map((event) => {
                    const title = `Reserved by: ${event.Reserved_by}\nHPC Reference: ${event.reference}\nHPC Details: ${event.reference_details.name} (${event.reference_details.brand} ${event.reference_details.model})`;

                    return {
                        id: event.id,
                        title: title,
                        start: new Date(event.start_date),
                        end: new Date(event.finish_time),
                        extendedProps: {
                            reference: event.reference,
                            referenceDetails: event.reference_details,
                            purpose: event.purpose,
                            message: event.Message,
                        },
                    };
                });

                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);
    const handleActionHPC = (event) => {
        setSelectedEvent(event);
    };
    return (
        <>
            <Path pathName={'HPC schedule'}/>
            <div className="inventory-table">
                <EquipmentTableHeader
                    title={'Avaliable HPC time slots'}
                />
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    className="calendar"
                    onSelectEvent={handleActionHPC}
                />
                {selectedEvent && (
                    <>
                        <div className="overlay" onClick={() => setSelectedEvent(null)} />
                        <div className="add-form ">
                            <h2>Event Details</h2>
                            <p>{selectedEvent.title}</p>
                            <p>Start Date: {selectedEvent.start.toString()}</p>
                            <p>End Date: {selectedEvent.end.toString()}</p>
                        </div>
                    </>
                )}
            </div>
        </>

    );
};

export default HPCScheduleAllocationManager;
