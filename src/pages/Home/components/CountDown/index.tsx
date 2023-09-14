import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContext } from "../../../../context/CyclesContext";
 
import { CountdowContainer, SeparetorTimer } from "./styles";

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCyclesAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutsAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCyclesAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCyclesAsFinished,
    setSecondsPassed,
  ]);

  const currentSecounds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutsAmount = Math.floor(currentSecounds / 60);
  const secoundAmout = currentSecounds % 60;

  const minuts = String(minutsAmount).padStart(2, "0");
  const seconds = String(secoundAmout).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minuts} : ${seconds}`;
    }
  }, [activeCycle, minuts, seconds]);

  return (
    <CountdowContainer>
      <span>{minuts[0]}</span>
      <span>{minuts[1]}</span>
      <SeparetorTimer>:</SeparetorTimer>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdowContainer>
  );
}
