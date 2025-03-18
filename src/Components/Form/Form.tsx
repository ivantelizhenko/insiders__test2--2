import { useForm } from 'react-hook-form';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Button from './Button';
import StyledForm from './StyledForm';

enum Status {
  Casual,
  Important,
  Crucial,
}

interface Inputs {
  title: string;
  description: string;
  date: string;
  status: Status;
}

function Form() {
  const { register, handleSubmit } = useForm<Inputs>();

  function onSubmit(data: Inputs): void {
    console.log(data);
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
