import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import EventListSlider from './EventListSlider'
import AddEventModal from './AddEventModal'
import moment from 'moment'
import { API_KEY, CALENDAR_ID, API_ENDPOINT } from '../../Config'
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router';

var groupBy = require('lodash.groupby');

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh"
    },
    select: {
        fontSize: "35em",
    },
    addIcon: {
        fontSize: "1em",
        color: "#8BC34A"
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
            }
        ).catch(error => {
            console.log('Network or Authentication Error');
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('accessToken');
            props.history.push('/');
        });
    }

    const handleModalClose = async () => {
        setModalOpen(false)
        await getEventList();
    }

    useEffect(() => {
        getEventList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    justify="center"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs >
                        <FormControl >
                            <Select
                                value={dayRange}
                                onChange={handleRangeChange}
                                disableUnderline={true}
                                autoWidth={true}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "center",
                                        horizontal: "right"
                                    },
                                    getContentAnchorEl: null,
                                }}
                                className={classes.select}
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
                    </Grid>
                    <Grid item xs style={{ backgroundColor: 'white' }} >
                        <IconButton aria-label="add" onClick={() => setModalOpen(true)}>
                            <AddIcon className={classes.addIcon} />
                        </IconButton>
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
