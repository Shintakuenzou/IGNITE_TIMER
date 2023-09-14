import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  HomeContainer,
  StartCountdowButton,
  StoptCountdowButton,
} from "./styles";

import { NewCycloHome } from "./components/NewCycloForm";
import { CountDown } from "./components/CountDown";
import { useContext } from "react";
import { CyclesContext } from "../../context/CyclesContext";

//Schema: defini um formato e validamos algo com base nesse formato
const newCycloFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minuts_Amount: zod
    .number()
    .min(5, "O ciclo precisar ser o minímo 5 nibutos")
    .max(60, "O ciclo precisa ser no máximo 60 min"),
});
//sempre converter variaveis Js para Ts usando typeof
type NewCycleFormDate = zod.infer<typeof newCycloFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interrupedCurrentCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm<NewCycleFormDate>({
    resolver: zodResolver(newCycloFormValidationSchema),
    //podemos passar valores inicial de cada campo
    defaultValues: {
      task: "",
      minuts_Amount: 0,
    },
  });
  const { watch, handleSubmit, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormDate) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabed = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycloHome />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StoptCountdowButton onClick={interrupedCurrentCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StoptCountdowButton>
        ) : (
          <StartCountdowButton disabled={isSubmitDisabed} type="submit">
            <Play size={24} /> Começar
          </StartCountdowButton>
        )}
      </form>
    </HomeContainer>
  );
}
