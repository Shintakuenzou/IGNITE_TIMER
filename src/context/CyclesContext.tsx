import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  ActionTypes,
  addNewCycleAction,
  interrupedCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycle/action";
import { Cycle, cyclesReducer } from "../reducers/cycle/reducer";

interface CreateCyclesData {
  task: string;
  minuts_Amount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCyclesAsFinished: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (number: number) => void;
  createNewCycle: (data: CreateCyclesData) => void;
  interrupedCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CycleContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return { cycles: [], activeCycleId: null };
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cycles);

    localStorage.setItem("@ignite-timer: cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCyclesAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: CreateCyclesData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutsAmount: data.minuts_Amount,
      startDate: new Date(),
    };
    // setCycles((prevState) => [...prevState, newCycle]);

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function interrupedCurrentCycle() {
    dispatch(interrupedCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCyclesAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrupedCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
