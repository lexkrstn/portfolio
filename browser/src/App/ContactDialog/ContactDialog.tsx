import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { ReactElement, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';
import { contactDialog } from '../duck';
import { getContactDialogOpen, getContactFormLoading } from '../duck/selectors';
import { send } from '../duck/contactFormSlice';
import * as S from './styles';

const EMAIL_RE = /^.+@.+\..+$/i;

interface Inputs {
  email: string;
  message: string;
}

export default function ContactDialog(): ReactElement {
  const dispatch = useDispatch();
  const open = useSelector(getContactDialogOpen);
  const loading = useSelector(getContactFormLoading);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const handleClose = useCallback(() => {
    if (!loading) {
      dispatch(contactDialog.close());
    }
  }, [loading]);

  const onSubmit = (formData: Inputs) => {
    dispatch(send(formData));
  };

  return (
    <S.Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      disableEscapeKeyDown={loading}
      scroll="body"
    >
      <DialogTitle id="contact-dialog-title">Contact</DialogTitle>
      <DialogContent>
        <Alert id="contact-dialog-description" severity="info">
          You can either fill up this form or {' '}
          <Button
            href={`mailto:${config.contact.email}`}
            size="small"
          >
            open your email app
          </Button>
          {' '} to send me an email.
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Your e-mail"
            helperText="Please, provide your email so I can answer you"
            fullWidth
            margin="normal"
            error={!!errors.email}
            InputProps={register('email', { required: true, pattern: EMAIL_RE })}
          />
          <TextField
            label="Write your message here"
            fullWidth
            margin="normal"
            error={!!errors.message}
            InputProps={register('message', { required: true, minLength: 3 })}
            multiline
            minRows={4}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          startIcon={<SendIcon />}
          loading={loading}
        >
          Send
        </LoadingButton>
      </DialogActions>
    </S.Dialog>
  );
}
