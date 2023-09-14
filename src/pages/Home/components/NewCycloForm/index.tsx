import { FormContainer, MinutsAmout, TaskInput } from "./styles";
import { useContext } from "react";
 
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../context/CyclesContext";

export function NewCycloHome() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para seu projeto"
        list="task-sugestions"
        {...register("task")}
        disabled={!!activeCycle!}
      />
      <datalist id="task-sugestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Estudar 25 min" />
      </datalist>

      <label htmlFor="minutsAmount">Durante</label>
      <MinutsAmout
        type="number"
        id="minutsAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register("minuts_Amount", { valueAsNumber: true })}
        disabled={!!activeCycle!}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
