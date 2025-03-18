import FormContainer from './FormContainer';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';

function Form() {
  return (
    <FormContainer>
      <Input type="text" placeholder="Title" />
      <Textarea placeholder="Description" />
      <Input type="date" />
      <Select options={['Casual', 'Important', 'Crucial']} />
    </FormContainer>
  );
}

export default Form;
