import React, { useEffect, useState } from 'react'
import Event from './Event'
import AddEventModal from './AddEventModal'
import moment from 'moment'
import { API_KEY, CALENDAR_ID, API_ENDPOINT } from '../../Config'
import axios from 'axios';
import DeleteIcon from '../../Style/Icons/DeleteIcon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function Calendar(props) {

    const [eventData, setEventData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [dayRange, setDayRange] = useState(7)

    const getEventList = async () => {
        console.log(dayRange)
        await axios.request({
            url: `${API_ENDPOINT}/${CALENDAR_ID}/events?maxResults=11&orderBy=startTime&singleEvents=true&timeMin=${moment().startOf("day").toISOString()}&timeMax=${moment().add(dayRange, 'd')
                .endOf("day")
                .toISOString()}&key=${API_KEY}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            },
            method: 'GET'
        }).then(
            response => {
                console.log(response.data.items)
                setEventData(response.data.items);
            },
            function (reason) {
                console.log(reason);
            }
        );
    }

    const handleDelete = async (eventId) => {
        await axios.request({
            url: `${API_ENDPOINT}/${CALENDAR_ID}/events/${eventId}?key=${API_KEY}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            },
            method: 'DELETE'
        }).then(
            response => {
                getEventList();
            },
            function (reason) {
                console.log(reason);
            }
        );
    }

    const handleModalClose = async () => {
        setModalOpen(false)
        await getEventList()
    }

    useEffect(() => {
        getEventList()
    }, [dayRange])

    const handleRangeChange = async event => {
        await setDayRange(event.target.value);
    }

    return (
        <>
            <div>
                <div>
                    <button onClick={() => setModalOpen(true)}>
                        ADD EVENT
                     </button>
                    <FormControl variant="outlined" >
                        <InputLabel>Range</InputLabel>
                        <Select
                            value={dayRange}
                            onChange={handleRangeChange}
                        >
                            <MenuItem value={1}>
                                1
                                </MenuItem>
                            <MenuItem value={7}>
                                7
                                </MenuItem>
                            <MenuItem value={30}>
                                30
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {
                    eventData && (
                        eventData.map(function (event) {
                            return (
                                <div>
                                    <a
                                        href={event.htmlLink}
                                        target="_blank"
                                        key={event.id}
                                    >
                                        {event.summary}
                                    </a>
                                    {" "}
                                    <span className="badge">
                                        {moment(event.start.dateTime).format("h:mm a")}{"-"}
                                        {moment(event.end.dateTime).format("h:mm a")},{" "}
                                        {moment(event.start.dateTime).format("MMMM Do")}{" "}
                                    </span>

                                    <button onClick={() => handleDelete(event.id)}>
                                        DELETE
                                </button>
                                </div>
                            )
                        })
                    )
                }
            </div>
            {<AddEventModal open={modalOpen} onClose={handleModalClose} />}
        </>
    );
}

export default Calendar;
