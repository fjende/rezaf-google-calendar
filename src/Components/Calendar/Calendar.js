import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Event from './Event'
import EventListSlider from './EventListSlider'
import AddEventModal from './AddEventModal'
import moment from 'moment'
import { API_KEY, CALENDAR_ID, API_ENDPOINT } from '../../Config'
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { Route, withRouter } from 'react-router';

var groupBy = require('lodash.groupby');

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    select: {
        fontSize: "20em"
    }
}));

function Calendar(props) {

    const [eventData, setEventData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [dayRange, setDayRange] = useState(7);

    const classes = useStyles();

    const getEventList = async () => {
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
                setEventData(groupBy(response.data.items, d => moment(d.start.dateTime).startOf(dayRange <= 7 ? "day" : "isoWeek")));
            },
            function (error) {
                console.log(error);
                if (error.response.status === 401) {
                    console.log('Unauthorized, token expired');
                    sessionStorage.removeItem('loggedIn');
                    sessionStorage.removeItem('accessToken');
                    props.history.push('/');
                }
            }
        );
    }

    const handleModalClose = async () => {
        setModalOpen(false)
        await getEventList();
    }

    useEffect(() => {
        getEventList()
    }, [dayRange])

    const handleRangeChange = async event => {
        await setDayRange(event.target.value);
    }

    return (
        <>
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs>
                        <FormControl >
                            <Select
                                value={dayRange}
                                onChange={handleRangeChange}
                                disableUnderline={true}
                                className={classes.select}>
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
                    </Grid>
                    <Grid item xs>
                        {
                            eventData && (
                                <EventListSlider eventData={eventData} getData={getEventList} dayRange={dayRange} />
                            )
                        }
                    </Grid>
                </Grid>
            </div>
            {<AddEventModal open={modalOpen} onClose={handleModalClose} getData={getEventList} />}
        </>
    );
}

export default withRouter(Calendar);
