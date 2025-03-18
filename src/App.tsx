import AppContainer from './Components/AppContainer';
import Form from './Components/Form/Form';
import { ScheduleProvider } from './store/ScheduleContext';

function App() {
  return (
    <ScheduleProvider>
      <AppContainer>
        <Form />
      </AppContainer>
    </ScheduleProvider>
  );
}

export default App;
