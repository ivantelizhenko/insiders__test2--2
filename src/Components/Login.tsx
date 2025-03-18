import { useForm } from 'react-hook-form';
import Button from './Button';
import Container from './Container';
import Input from './Form/Input';
import StyledForm from './Form/StyledForm';
import { loginUser, registerUser } from '../firebase/firestoreOperations';
import { useSchedule } from '../store/scheduleContext/ScheduleContext';
import { useState } from 'react';

interface LoginData {
  login: string;
  password: string;
}

function Login() {
  const [loginOrRegistration, setLoginOrRegistration] = useState<
    'login' | 'registration'
  >('login');
  const { register, handleSubmit, reset } = useForm<LoginData>();
  const { setAuthTrue } = useSchedule();

  const toLogin = () => {
    setLoginOrRegistration('login');
    reset();
  };
  const toRegistration = () => {
    setLoginOrRegistration('registration');
    reset();
  };

  async function onSubmit(data: LoginData) {
    const { login, password } = data;

    if (loginOrRegistration === 'login') {
      const isAuth = await loginUser(login, password);
      if (isAuth) {
        setAuthTrue();
      }
    }
    if (loginOrRegistration === 'registration') {
      const isRegistarion = await registerUser(login, password);
      if (isRegistarion) {
        setAuthTrue();
      }
    }

    reset();
  }
  return (
    <Container>
      <h2>{loginOrRegistration === 'login' ? 'Log in' : 'Registration'}</h2>
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
        <Button className="w-full bg-amber-200">
          {loginOrRegistration === 'login' ? 'Log in' : 'Registration'}{' '}
        </Button>
        <Button
          onClick={
            loginOrRegistration === 'registration' ? toLogin : toRegistration
          }
          type="button"
          className="mx-auto"
        >
          {loginOrRegistration === 'registration' ? 'Back' : 'Registration'}
        </Button>
      </StyledForm>
    </Container>
  );
}

export default Login;
