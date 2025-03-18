import { useForm } from 'react-hook-form';
import Button from './Button';
import Container from './Container';
import Input from './Form/Input';
import StyledForm from './Form/StyledForm';

interface LoginData {
  login: string;
  password: string;
}

function Login() {
  const { register, handleSubmit, reset } = useForm<LoginData>();

  function onSubmit(data: LoginData) {
    console.log(data);

    reset();
  }
  return (
    <Container>
      <StyledForm className="bg-none" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="Email"
          {...register('login', { required: true })}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <Button className="w-full bg-amber-200">Log in</Button>
      </StyledForm>
    </Container>
  );
}

export default Login;
