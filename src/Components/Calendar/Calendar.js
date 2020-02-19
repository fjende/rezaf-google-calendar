import React, { useEffect, useState } from 'react'
import Event from './Event'
import moment from 'moment'
import { API_KEY, CALENDAR_ID, API_ENDPOINT } from '../../Config'
import { gapi } from 'gapi-script';
import axios from 'axios';
import DeleteIcon from '../../Style/Icons/DeleteIcon';

function Calendar(props) {

    const [eventData, setEventData] = useState(null)

    const getEventList = async () => {
        await axios.request({
            url: `${API_ENDPOINT}/${CALENDAR_ID}/events?maxResults=11&orderBy=startTime&singleEvents=true&timeMin=${moment().startOf("day").toISOString()}&timeMax=${moment()
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

    const addEvent = async () => {

    }

    useEffect(() => {
        getEventList()
    }, [])

    return (
        <div>
            {
                eventData && (
                    eventData.map(function (event) {
                        return (
                            <div>

                                <a
                                    className="list-group-item"
                                    href={event.htmlLink}
                                    target="_blank"
                                    key={event.id}
                                >
                                    {event.summary}{" "}
                                    <span className="badge">
                                        {moment(event.start.dateTime).format("h:mm a")}{"-"}
                                        {moment(event.end.dateTime).format("h:mm a")},{" "}
                                        {moment(event.start.dateTime).format("MMMM Do")}{" "}
                                    </span>

                                </a>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        handleDelete(event.id)
                                    }
                                >
                                    <DeleteIcon size="20" />
                                </div>
                            </div>
                        )
                    })
                )
            }
        </div>
    );
}

export default Calendar;
