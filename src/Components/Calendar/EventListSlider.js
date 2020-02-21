import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment'
import { API_KEY, CALENDAR_ID, API_ENDPOINT } from '../../Config'
import axios from 'axios';

function EventListSlider({ eventData, getData }) {

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
            function (reason) {
                console.log(reason);
            }
        );

    }

    const theme = useTheme();

    const [step, setActiveStep] = React.useState(0);

    const maxSteps = Object.keys(eventData).length;

    useEffect(() => {
        if (step + 2 > maxSteps && step - 1 >= 0) {
            handleStepChange(step - 1);
        }
    }, [maxSteps])

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = step => {
        setActiveStep(step);
    };

    return (
        <div>
            <Paper square elevation={0}>
                <Typography>{Object.keys(eventData)[step]}</Typography>
            </Paper>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={step}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {Object.entries(eventData).map((step, index) => (
                    <div key={step}>
                        {step[1].map(function (event) {
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
                        })}
                    </div>
                ))}
            </SwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={step}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={step === maxSteps - 1}>
                        Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={step === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
          </Button>
                }
            />
        </div>
    );
}

export default EventListSlider;