import AppContainer from './Components/AppContainer';
import Form from './Components/Form/Form';
import List from './Components/List';
import Login from './Components/Login';
import { useSchedule } from './store/scheduleContext/ScheduleContext';

function App() {
  const { isAuth } = useSchedule();

  return (
    <AppContainer>
      {!isAuth && <Login />}
      {isAuth && (
        <>
          <Form />
          <List />
        </>
      )}
    </AppContainer>
  );
}

export default App;
