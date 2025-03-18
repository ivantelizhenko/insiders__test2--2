import { ScheduleProvider } from './store/scheduleContext/ScheduleContext';
import AppContainer from './Components/AppContainer';
import Form from './Components/Form/Form';
import List from './Components/List';
import Login from './Components/Login';

function App() {
  return (
    <ScheduleProvider>
      <AppContainer>
        <Login />
        {/* <Form />
        <List /> */}
      </AppContainer>
    </ScheduleProvider>
  );
}

export default App;
