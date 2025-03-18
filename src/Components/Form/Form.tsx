import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Button from '../Button';
import StyledForm from './StyledForm';

import { Event, FormStatus } from '../../store/ScheduleContextType';
import { useSchedule } from '../../store/ScheduleContext';

function Form() {
  const { register, handleSubmit, reset, setValue } = useForm<Event>();
  const { addEvent, editedEvent, formStatus, saveEditedEvent } = useSchedule();

  useEffect(() => {
    if (editedEvent) {
      const { title, description, date, status } = editedEvent;

      setValue('title', title);
      setValue('description', description);
      setValue('date', date);
      setValue('status', status);
    }
  }, [editedEvent, setValue]);

  function onSubmit(data: Event): void {
    if (formStatus === FormStatus.Add) {
      addEvent({ ...data, id: Math.random().toString() });
    }
    if (formStatus === FormStatus.Edit) {
      saveEditedEvent({ ...data, id: editedEvent!.id });
    }

    reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Title"
        {...register('title', { required: true })}
      />
      <Textarea
        placeholder="Description"
        {...register('description', { required: true })}
      />
      <Input type="date" {...register('date', { required: true })} />
      <Select
        options={['Casual', 'Important', 'Crucial']}
        {...register('status')}
      />
      <Button type="submit" className="w-full">
        {editedEvent?.title ? 'Edit' : 'Add'}
      </Button>
    </StyledForm>
  );
}

export default Form;
