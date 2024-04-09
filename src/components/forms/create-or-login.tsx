import { getAllExercises } from "@/actions/exercise";
import CreateOrLoginForm from "./col-form-exercise";

const CreateOrLogin = async () => {
  const existingExercises = await getAllExercises();

  return <CreateOrLoginForm existingExercises={existingExercises.data} />;
};

export default CreateOrLogin;
