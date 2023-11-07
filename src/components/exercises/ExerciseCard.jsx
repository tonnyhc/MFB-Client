import React, { useContext, useEffect, useState, useDeferredValue } from "react";

import { HiPlusCircle, HiMinusCircle } from "react-icons/hi2";

import Button from "../common/button/Button";
import Input from "../common/input/Input";
import { CreateCustomWorkoutPlanContext } from "../../contexts/CreateCustomWorkoutContext";
import CommicBubble from "../common/comic-bubble/ComicBubble";
import { useQuery } from "react-query";
import { exerciseSearch } from "../../services/exerciseServices";

const exercisesSearchResult = [
  {
    id: 2,
    name: "Barbell Bench Press",
    cover_photo:
      "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
    information:
      "Primary worked muscles here are the chest, front delt and the triceps",
    video_tutorial: "https://www.youtube.com/shorts/EdDqD4aKwxM",
    tips: "Be carefull with the shoulders!",
  },
  {
    id: 3,
    name: "Pull Ups",
    cover_photo:
      "https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg",
    information:
      "Primary worked muscles here are the chest, front delt and the triceps",
    video_tutorial: "https://www.youtube.com/shorts/EdDqD4aKwxM",
    tips: "Be carefull with the shoulders!",
  },
];

const ExerciseSearchPopUp = ({ onSelectExercise }) => {
  return (
    <div className="absolute z-10 w-full h-10 text-white">
      <CommicBubble>
        <div className="flex justify-between items-center border-b-2 border-white text-sm">
          <p>Exercises</p>
          <p>Your Exercises</p>
        </div>
        <div>
          {exercisesSearchResult.map((exercise) => (
            <article
              key={exercise.id}
              onClick={(e) => onSelectExercise(e, exercise)}
              className="h-20 flex gap-2 cursor-pointer border-b-2 border-white px-1 py-2"
            >
              <div className="w-[40%] h-full">
                <img
                  className="w-full h-full object-contain"
                  src={exercise.cover_photo}
                  alt=""
                />
              </div>
              <div>
                <p className="text-sm">{exercise.name}</p>
                <p className="text-xs text-gray-400">{exercise.information}</p>
              </div>
            </article>
          ))}
        </div>
      </CommicBubble>
    </div>
  );
};

const ExerciseCard = ({
  exercise,
  exerciseIndex,
  workoutIndex,
  isOpened,
  openCardClick,
}) => {
  const { dispatch } = useContext(CreateCustomWorkoutPlanContext);
  const [exerciseNameSearch, setExerciseNameSearch] = useState("");
  const defferedExerciseNameSearch = useDeferredValue(exerciseNameSearch);
  const sets = exercise.sets;

  const {data, error, isLoading, refetch } = useQuery(['exercise', defferedExerciseNameSearch], () => exerciseSearch(defferedExerciseNameSearch));

  useEffect(() => {
    refetch();
  }, [defferedExerciseNameSearch]);

  if (isLoading){
    console.log('is loading...');
  };

  if (error){
    // alert(error);
  }
 
  function onSelectExercise(e, selectedExercise) {
    dispatch({
      type: "selectExercise",
      payload: {
        selectedExercise: selectedExercise,
        workoutIndex: workoutIndex,
        exerciseIndex: exerciseIndex,
      },
    });
    setExerciseNameSearch('');
  }
  function addSet() {
    dispatch({
      type: "addSetToExercise",
      payload: { workoutIndex: workoutIndex, exerciseIndex: exerciseIndex },
    });
  }
  // function removeSet(e, index) {
  //   setSets((oldSets) => oldSets.filter((_, i) => i !== index));
  // }

  return (
    <article
      onClick={openCardClick}
      className="flex flex-col items-center bg-light-grey rounded-t-2xl py-3 px-2 w-10/12 rounded overflow-auto"
    >
      {/* Exercise name */}
      <div className="w-full relative">
        <Input
          labelText="Exercise Name"
          labelName="exerciseName"
          inputType="text"
          value={exerciseNameSearch ? exerciseNameSearch : exercise.name}
          isRequired={true}
          onChange={(e) => setExerciseNameSearch(e.target.value)}
        />
        {exerciseNameSearch && (
          <ExerciseSearchPopUp onSelectExercise={onSelectExercise} />
        )}
      </div>
      {isOpened && (
        <>
          {sets.map((set, index) => (
            <div
              className="w-full py-2 border-b-2 border-border-grey"
              key={index}
            >
              <div className="flex justify-between items-center  px-1">
                <h3 className="text-xl">Set {index + 1}</h3>
                <Button
                  text="Remove"
                  color="transparent"
                  // onClick={(e) => removeSet(e, index)}
                  id="removeSetBtn"
                  icon={<HiMinusCircle />}
                  reverseOrder={true}
                  shape="rectangular"
                  type="delete"
                />
              </div>
              <div className="flex w-full">
                <Input
                  labelText="Weight"
                  placeholder="Weight"
                  labelName="weight"
                  inputType="number"
                  value={set.kg}
                  inputSize="s"
                />
                <Input
                  labelText="Reps"
                  labelName="reps"
                  inputType="number"
                  value={set.reps}
                  inputSize="s"
                />
                {/* <div className="flex"> */}
                  <Input
                    labelText="Min Reps"
                    labelName="minReps"
                    inputType="number"
                    value={set.minReps}
                    inputSize="s"
                  />
                  <Input
                    labelText="Max Reps"
                    labelName="maxReps"
                    inputType="number"
                    value={set.maxReps}
                    inputSize="s"
                  />
                {/* </div> */}
              </div>
            </div>
          ))}
          <Button
            text="Add Set"
            color="transparent"
            onClick={addSet}
            id="addSetBtn"
            icon={<HiPlusCircle />}
            reverseOrder={true}
            shape="rectangular"
          />
        </>
      )}
    </article>
  );
};

export default ExerciseCard;
