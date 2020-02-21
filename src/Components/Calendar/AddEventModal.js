import React, { useEffect } from 'react'
import { Formik, Form } from 'formik';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { API_KEY, CALENDAR_ID, API_ENDPOINT } from '../../Config'
import { FormikTextField } from 'formik-material-fields';
import { ValidationSchema } from './validation';
import { Dialog, DialogContent, DialogActions, makeStyles } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

function AddEventModal({ open, onClose, getData, ...rest }) {

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
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
                            .then(onClose, getData, console.log('Addeding'))
                            .catch(error => alert("Something went wrong, make sure you're not trying to travel through time!"));
                    }}
                    initialValues={{ title: '', start: new Date(), end: new Date() }}
                    validationSchema={ValidationSchema}
                    render={formikProps => {
                        return (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Form>
                                    <FormikTextField
                                        autoComplete="title"
                                        name="title"
                                        variant="outlined"
                                        fullWidth
                                        label="Add title..."
                                        autoFocus
                                        value={formikProps.values.title}
                                    />
                                    <KeyboardDateTimePicker
                                        ampm={false}
                                        inputVariant="outlined"
                                        label="Start"
                                        fullWidth
                                        value={formikProps.values.start}
                                        onChange={start => formikProps.setFieldValue('start', start)}
                                    />
                                    <KeyboardDateTimePicker
                                        disablePast
                                        ampm={false}
                                        inputVariant="outlined"
                                        label="End"
                                        fullWidth
                                        value={formikProps.values.end}
                                        minDate={formikProps.values.start}
                                        maxDate={formikProps.values.start}
                                        onChange={end => formikProps.setFieldValue('end', end)}
                                    />
                                    <DialogActions>
                                        <Button onClick={onClose} color="primary">
                                            Cancel
                                    </Button>
                                        <Button type="submit" color="primary">
                                            Save
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
