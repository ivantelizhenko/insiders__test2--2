import AppContainer from './Components/AppContainer';
import Form from './Components/Form/Form';
import List from './Components/List';
import { ScheduleProvider } from './store/scheduleContext/ScheduleContext';

function App() {
  return (
    <ScheduleProvider>
      <AppContainer>
        <Form />
        <List />
      </AppContainer>
    </ScheduleProvider>
  );
}

export default App;
