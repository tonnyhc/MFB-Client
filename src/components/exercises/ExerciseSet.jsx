import { useContext } from "react";

import { HiMinusCircle } from "react-icons/hi2";

import Button from "../common/button/Button";
import Input from "../common/input/Input";
import { CreateCustomWorkoutPlanContext } from "../../contexts/CreateCustomWorkoutContext";

const ExerciseSet = ({ set, setIndex, exerciseIndex, workoutIndex }) => {
  const { dispatch } = useContext(CreateCustomWorkoutPlanContext);

  function changeExerciseSetWeight(e) {
    const value = e.target.value;
    dispatch({
      type: "changeSetWeight",
      payload: {
        weight: value,
        setIndex: setIndex,
        workoutIndex: workoutIndex,
        exerciseIndex: exerciseIndex,
      },
    });
  }
  
  function changeExerciseSetReps(e) {
    const value = e.target.value;
    dispatch({
      type: "changeSetReps",
      payload: {
        weight: value,
        setIndex: setIndex,
        workoutIndex: workoutIndex,
        exerciseIndex: exerciseIndex,
      },
    });
  }
  return (
    <div className="w-full py-2 border-b-2 border-border-grey">
      <div className="flex justify-between items-center  px-1">
        <h3 className="text-xl">Set {setIndex + 1}</h3>
        <Button
          // text="Remove"
          color="transparent"
          // onClick={(e) => removeSet(e, index)}
          id="removeSetBtn"
          icon={<HiMinusCircle />}
          reverseOrder={true}
          shape="rectangular"
          type="delete"
        />
      </div>
      <div className="flex w-full gap-2">
        <Input
          labelText="Weight"
          placeholder="Weight"
          fontSizePx="12px"
          labelName="weight"
          inputType="number"
          value={set.kg}
          inputSize="full"
          onChange={changeExerciseSetWeight}
        />
        <Input
          labelText="Reps"
          placeholder="Reps"
          fontSizePx="12px"
          labelName="reps"
          inputType="number"
          value={set.reps}
          inputSize="full"
          onChange={changeExerciseSetReps}
        />

        <Input
          labelText="Min Reps"
          placeholder="Min Reps"
          fontSizePx="12px"
          labelName="minReps"
          inputType="number"
          value={set.minReps}
          inputSize="full"
        />
        <Input
          labelText="Max Reps"
          placeholder="Max Reps"
          fontSizePx="12px"
          labelName="maxReps"
          inputType="number"
          value={set.maxReps}
          inputSize="full"
        />
      </div>
    </div>
  );
};

export default ExerciseSet;
