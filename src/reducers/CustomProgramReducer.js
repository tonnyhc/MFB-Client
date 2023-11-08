// Function to update an array element at a specific index
function updateArrayElement(array, index, updateFn) {
  return [
    ...array.slice(0, index),
    updateFn(array[index]),
    ...array.slice(index + 1),
  ];
}

// Function to update a workout's exercise array
function updateWorkoutExercises(workouts, workoutIndex, updateFn) {
  const updatedWorkouts = [...workouts];
  updatedWorkouts[workoutIndex] = updateFn(updatedWorkouts[workoutIndex]);
  return updatedWorkouts;
}

const actionHandlers = {
  initializeProgram: handleInitializeProgram,
  changeWorkoutName: handleChangeWorkoutName,
  addExerciseToWorkout: handleAddExerciseToWorkout,
  changeExerciseName: handleChangeExerciseName,
  selectExercise: handleSelectExercise,
  addSetToExercise: handleAddSetToExercise,
  removeSetFromExercise: handleRemoveSetFromExercise,
  changeSetWeight: handleEditSetWeight,
  changeSetReps: handleEditSetReps,
  default: handleDefault,
};

function CustomProgramReducer(state, action) {
  const handler = actionHandlers[action.type] || actionHandlers.default;
  return handler(state, action);
}

function handleInitializeProgram(state, action) {
  const payload = action.payload;
  const newWorkoutPlanState = {
    planName: payload.planName,
    workouts: Array.from({ length: Number(payload.workoutsCount) }, () => ({
      workoutName: "",
      exercises: [],
    })),
    numberOfWorkouts: Number(payload.workoutsCount),
  };
  console.log(newWorkoutPlanState);
  return newWorkoutPlanState;
}

function handleChangeWorkoutName(state, action) {
  const name = action.payload.name;
  const index = action.payload.index;
  const updateWorkoutName = (workout) => ({
    ...workout,
    workoutName: name,
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(state.workouts, index, updateWorkoutName),
  };
}

function handleAddExerciseToWorkout(state, action) {
  const newExercise = {
    name: "",
    sets: [{ weight: "", reps: "", minReps: "", maxReps: "" }],
  };
  const workoutIndexToAddExercise = action.payload;
  const updateWorkoutExercisesArray = (workout) => ({
    ...workout,
    exercises: [...workout.exercises, newExercise],
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndexToAddExercise,
      updateWorkoutExercisesArray
    ),
  };
}

function handleChangeExerciseName(state, action) {
  const newExerciseName = action.payload.name;
  const exerciseIndexToChangeName = action.payload.exerciseIndex;
  const workoutIndexToChangeExerciseName = action.payload.workoutIndex;

  const updateExerciseName = (exercise) => ({
    ...exercise,
    name: newExerciseName,
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndexToChangeExerciseName,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndexToChangeName,
          updateExerciseName
        ),
      })
    ),
  };
}

function handleSelectExercise(state, action) {
  const { selectedExercise, workoutIndex, exerciseIndex } = action.payload;

  const updateExercise = (exercise) => ({
    ...selectedExercise,
    sets: [{ weight: "", reps: "", minReps: "", maxReps: "" }],
  })

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndex,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(workout.exercises, exerciseIndex, updateExercise)
      })
    ),
  };
}

function handleAddSetToExercise(state, action) {
  const newSet = { weight: "", reps: "", minReps: "", maxReps: "" };
  const workoutIndexToAddSet = action.payload.workoutIndex;
  const exerciseIndex = action.payload.exerciseIndex;

  const updateExerciseSetsArray = (exercise) => ({
    ...exercise,
    sets: [...exercise.sets, newSet],
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndexToAddSet,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndex,
          updateExerciseSetsArray
        ),
      })
    ),
  };
}

function handleRemoveSetFromExercise(state, action) {
  const workoutIndexToRemoveSet = action.payload.workoutIndex;
  const exerciseIndexToRemoveSet = action.payload.exerciseIndex;
  const setIndexToRemoveSet = action.payload.setIndex;

  const removeSetFromExerciseArray = (exercise) => {
    const updatedSets = [...exercise.sets];
    updatedSets.splice(setIndexToRemoveSet, 1);
    return { ...exercise, sets: updatedSets };
  };

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndexToRemoveSet,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndexToRemoveSet,
          removeSetFromExerciseArray
        ),
      })
    ),
  };
}

function handleEditSetWeight(state, action){
  const weight = action.payload.weight;
  const workoutIndex = action.payload.workoutIndex;
  const exerciseIndex = action.payload.exerciseIndex;
  const setIndex = action.payload.setIndex;

  const updateExerciseSetsArray = (exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set, index) =>
      index === setIndex ? { ...set, weight: weight } : set
    ),
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndex,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndex,
          updateExerciseSetsArray
        ),
      })
    ),
  };
}

function handleEditSetReps(state, action) {
  const reps = action.payload.reps;
  const workoutIndex = action.payload.workoutIndex;
  const exerciseIndex = action.payload.exerciseIndex;
  const setIndex = action.payload.setIndex;

  const updateExerciseSetsArray = (exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set, index) =>
      index === setIndex ? { ...set, reps: reps } : set
    ),
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndex,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndex,
          updateExerciseSetsArray
        ),
      })
    ),
  };
}


function handleDefault(state) {
  return state;
}

export default CustomProgramReducer;
