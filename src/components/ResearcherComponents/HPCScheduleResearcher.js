import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import StockForm from "../GeneralManagerComponents/Forms/StockForm";
import {Fragment, useState} from "react";
import HPCAllocationForm from "./Forms/HPCAllocationForm";



const localizer = momentLocalizer(moment);
const HPCScheduleResearcher = (props) => {
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

    const [showForm, setShowForm] = useState(false);
    const handleAddClick = () => {
        setShowForm(true); // show form when Add button is clicked
    }
    const handleCancelForm = () =>{
        setShowForm(false);
    }
    return(
        <>
            <Path pathName={'HPC Schedule'}/>
            <div className="inventory-table">
                <EquipmentTableHeader title={'Avaliable HPC time slots'}
                                      buttonName={'Add new allocation'}
                                      className={'add-button'}
                                      onClick={handleAddClick}

                />
                {showForm &&
                    <Fragment>
                        <div onClick={handleCancelForm} className="overlay" />
                        <HPCAllocationForm handleCancelForm={handleCancelForm}/>
                    </Fragment>
                }
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    className="calendar"
                />
            </div>
        </>
    )
}
export default HPCScheduleResearcher;