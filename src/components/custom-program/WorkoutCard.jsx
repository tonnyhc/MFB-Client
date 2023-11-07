import { useContext } from "react";

import { CreateCustomWorkoutPlanContext } from "../../contexts/CreateCustomWorkoutContext";

import { HiPlusSm } from "react-icons/hi";

import Input from "../common/input/Input";
import Button from "../common/button/Button";
import { useState } from "react";
import ExerciseCard from "../exercises/ExerciseCard";

const initialWorkoutState = { workoutName: "", exercises: [] };

const WorkoutCard = ({ workout, arrayIndex, isOpened }) => {
  const { workoutPlan, dispatch } = useContext(CreateCustomWorkoutPlanContext);
  const exercises = workout.exercises;
  const [openedExercisesCardIndex, setOpenedExerciseCardIndex] = useState("");
  function onAddExercise() {
    dispatch({ type: "addExerciseToWorkout", payload: arrayIndex });
  }

  function openExerciseCard(e, index) {
    setOpenedExerciseCardIndex(index);
  }

  function onChangeWorkoutName(e) {
    e.preventDefault();
    dispatch({
      type: "changeWorkoutName",
      payload: { index: arrayIndex, name: e.target.value },
    });
  }

  return (
    <article
      className="w-screen py-4 gap-3 flex flex-col justify-start items-center "
      key={`workout-${arrayIndex + 1}`}
    >
      <div className="min-h-[50px]">
        <Input
          labelText={`Workout ${arrayIndex + 1}`}
          labelName={`workout${arrayIndex + 1}`}
          placeholder={`Workout ${arrayIndex + 1}`}
          inputType="text"
          inputStyle='transparent'
          value={workout.workoutName}
          isRequired={true}
          onChange={onChangeWorkoutName}
          inputSize="xxl"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            // onChange={onChangeExercise}
            exercise={exercise}
            workoutIndex={arrayIndex}
            exerciseIndex={index}
            isOpened={index == openedExercisesCardIndex}
            openCardClick={(e) => openExerciseCard(e, index)}
            key={index}
          />
        ))}
      </div>

      <Button
        text="Exercise"
        color="grey"
        onClick={onAddExercise}
        id="addExerciseBtn"
        icon={<HiPlusSm />}
        reverseOrder={true}
        shape="rectangular"
      />
    </article>
  );
};

export default WorkoutCard;
