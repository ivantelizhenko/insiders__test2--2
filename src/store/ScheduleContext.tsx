import { createContext, ReactNode, useContext, useReducer } from 'react';
import {
  Action,
  ScheduleContextValue,
  ScheduleState,
} from './ScheduleContextType';

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

const initialState: ScheduleState = {
  event: [],
};

function booksReducer(state: ScheduleState, action: Action): ScheduleState {
  switch (action.type) {
    case 'event/add': {
      return {
        ...state,
        event: [...state.event, action.payload],
      };
    }
    case 'event/remove': {
      return {
        ...state,
        event: state.event.filter(event => event.id !== action.payload),
      };
    }
    default:
      throw new Error('Unknown action type');
  }
}

function ScheduleProvider({ children }: { children: ReactNode }) {
  const [scheduleState, dispatch] = useReducer(booksReducer, initialState);

  const ctx: ScheduleContextValue = {
    ...scheduleState,
    addEvent(newEvent) {
      dispatch({ type: 'event/add', payload: newEvent });
    },
    removeEvent(id) {
      dispatch({ type: 'event/remove', payload: id });
    },
  };

  return (
    <ScheduleContext.Provider value={ctx}>{children}</ScheduleContext.Provider>
  );
}

function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined)
    throw new Error('ScheduleContext was used outside of the ScheduleProvider');

  return context as ScheduleContextValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ScheduleProvider, useSchedule };
