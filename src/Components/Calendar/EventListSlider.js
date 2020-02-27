import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Event from './Event';


const useStyles = makeStyles(theme => ({
    button: {
        padding: 10
    },
    slider: {
        minWidth: 500
    }
}));

function EventListSlider({ eventData, getData, dayRange }) {

    const [step, setActiveStep] = React.useState(0);

    const maxSteps = Object.keys(eventData).length;

    const classes = useStyles();


    useEffect(() => {
        if (step + 2 > maxSteps && step - 1 >= 0) {
            handleStepChange(step - 1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventData])

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
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item xs>
                    <IconButton className={classes.button} onClick={handleBack} disabled={step === 0}>
                        <KeyboardArrowLeft className={classes.largeIcon} />
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <SwipeableViews
                        axis='x'
                        index={step}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                        className={classes.slider}
                    >
                        {Object.keys(eventData).length > 0 ? Object.entries(eventData).map((step, index) => (
                            <div key={step}>
                                {step[1].map(function (event) {
                                    return (
                                        <div>
                                            <Event event={event} getData={getData} />
                                        </div>
                                    )
                                })}
                            </div>
                        )) : <Typography> No scheduled events </Typography>}
                    </SwipeableViews>
                </Grid>
                <Grid item xs>
                    <IconButton className={classes.button} onClick={handleNext} disabled={step === maxSteps - 1 || maxSteps === 0}>
                        <KeyboardArrowRight className={classes.largeIcon} />
                    </IconButton>
                </Grid>

            </Grid>
        </div>
    );
}

export default EventListSlider;