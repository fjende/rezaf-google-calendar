import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateTimePicker } from '@material-ui/pickers';
import { API_KEY, CALENDAR_ID, API_ENDPOINT } from '../../Config'
import { FormikTextField } from 'formik-material-fields';
import { ValidationSchema } from './validation';
import { Dialog, DialogContent, DialogActions, makeStyles, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: '10px',
    }
}));

function AddEventModal({ open, onClose, getData, ...rest }) {

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" c>
            <DialogContent>
                <Formik
                    onSubmit={(values, formikBag) => {
                        axios
                            .request({
                                url: `${API_ENDPOINT}/${CALENDAR_ID}/events?key=${API_KEY}`,
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.accessToken}`
                                },
                                method: 'POST',
                                data: {
                                    summary: values.title,
                                    start: {
                                        dateTime: values.start.toISOString()
                                    },
                                    end: {
                                        dateTime: values.end.toISOString()
                                    },
                                }
                            })
                            .then(onClose, getData, console.log('Adding new Event'))
                            .catch(error => alert("Something went wrong, make sure you're not trying to travel through time!"));
                    }}
                    initialValues={{ title: '', start: new Date(), end: new Date() }}
                    validationSchema={ValidationSchema}
                    render={formikProps => {
                        return (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Form className={classes.form}>
                                    <FormikTextField
                                        autoComplete="title"
                                        name="title"
                                        variant="outlined"
                                        fullWidth
                                        label="Title"
                                        autoFocus
                                        value={formikProps.values.title}
                                        margin="normal"
                                    />
                                    <DateTimePicker
                                        disablePast
                                        ampm={false}
                                        inputVariant="outlined"
                                        label="Start"
                                        fullWidth
                                        value={formikProps.values.start}
                                        onChange={start => formikProps.setFieldValue('start', start, true)}
                                        margin="normal"
                                    />
                                    <DateTimePicker
                                        disablePast
                                        ampm={false}
                                        inputVariant="outlined"
                                        label="End"
                                        fullWidth
                                        value={formikProps.values.end}
                                        maxDate={formikProps.values.start}
                                        onChange={end => formikProps.setFieldValue('end', end, true)}
                                        margin="normal"
                                    />
                                    <DialogActions>
                                        <Button onClick={onClose} color="primary">
                                            Cancel
                                    </Button>
                                        <Button type="submit" color="primary">
                                            Add
                                    </Button>
                                    </DialogActions>
                                </Form>
                            </MuiPickersUtilsProvider>
                        );
                    }}
                ></Formik>
            </DialogContent>
        </Dialog >
    );
}

export default AddEventModal;
