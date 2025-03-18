import { useForm } from 'react-hook-form';

import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Button from '../Button';
import StyledForm from './StyledForm';

import { Event } from '../../store/ScheduleContextType';
import { useSchedule } from '../../store/ScheduleContext';

function Form() {
  const { register, handleSubmit, reset } = useForm<Event>();
  const { addEvent } = useSchedule();

  function onSubmit(data: Event): void {
    addEvent({ ...data, id: Math.random().toString() });
    reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Title"
        {...(register('title'), { required: true })}
      />
      <Textarea
        placeholder="Description"
        {...(register('description'), { required: true })}
      />
      <Input type="date" {...register('date', { required: true })} />
      <Select
        options={['Casual', 'Important', 'Crucial']}
        {...register('status')}
      />
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </StyledForm>
  );
}

export default Form;
