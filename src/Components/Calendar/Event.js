import React, { useEffect } from 'react'
import moment from 'moment'
import { API_KEY, CALENDAR_ID, API_ENDPOINT } from '../../Config'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function Event({ event, getData }) {

    const handleDelete = async (eventId) => {
        await axios.request({
            url: `${API_ENDPOINT}/${CALENDAR_ID}/events/${eventId}?key=${API_KEY}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            },
            method: 'DELETE'
        }).then(
            response => {
                getData();
            },
            function (error) {
                console.log(error);
            }
        );
    }

    return (
        <Card >
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={() => handleDelete(event.id)}>
                        <CloseIcon style={{ fontSize: "0.5em" }} />
                    </IconButton>
                }
                subheader={
                    <div>
                        {moment(event.start.dateTime).format("h:mm a")}{" - "}
                        {moment(event.end.dateTime).format("h:mm a")}{" "}
                        {moment(event.start.dateTime).format("MMMM D")}{" "}
                    </div>
                }
                title={event.summary}
                style={{ textAlign: "left" }}
            />
        </Card>
    )
}

export default Event;
