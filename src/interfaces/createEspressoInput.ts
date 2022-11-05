import CreateBeanInput from "./createBeanInput";
import CreateGrinderInput from "./createGrinderInput";
import CreateMachineInput from "./createMachineInput";

export default interface CreateEspressoInput {
    beansWeight: number;
    shotTimeInSeconds: number;
    pressure: number;
    notes: string;
    grindSetting: string;
    machineId: number;
    grinderId: number;
    beanId: number;
}