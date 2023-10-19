// function CustomProgramReducer(state, action) {
//   switch (action.type) {
//     case "initializeProgram":
//       const payload = action.payload;
//       const newWorkoutPlanState = {
//         planName: payload.planName,
//         workouts: Array.from({ length: Number(payload.workoutsCount) }, () => ({
//           workoutName: "",
//           exercises: [],
//         })),
//         numberOfWorkouts: Number(payload.workoutsCount),
//       };
//       return newWorkoutPlanState;

//     case "changeWorkoutName":
//       const name = action.payload.name;
//       const index = action.payload.index;
//       const newWorkoutsState = [
//         ...state.workouts.slice(0, index), // elements before the modified index
//         {
//           ...state.workouts[index],
//           workoutName: name, // update the workoutName property
//         },
//         ...state.workouts.slice(index + 1), // elements after the modified index
//       ];

//       return { ...state, workouts: newWorkoutsState };

//     case "addExerciseToWorkout":     
//       const newExercise = { name: "", sets: [{weight: '', reps:'', minReps: '', maxReps: ''}] };
//       const workoutIndexToAddExercise = action.payload;
//       const updatedWorkouts = [...state.workouts]; // create a copy of the workouts array
//       // Create a new copy of the workout at the specified index
//       const updatedWorkout = {
//         ...updatedWorkouts[workoutIndexToAddExercise],
//         exercises: [
//           ...updatedWorkouts[workoutIndexToAddExercise].exercises,
//           newExercise,
//         ],
//       };
//       // Update the workouts array with the modified workout
//       updatedWorkouts[workoutIndex] = updatedWorkout;
//       // Return the updated state
//       return { ...state, workouts: updatedWorkouts };

//     case 'addSetToExercise':
//       const newSet = { weight: '', reps: '', minReps: '', maxReps: '' };
//       const workoutIndexToAddSet = action.payload.workoutIndex;
//       const exerciseIndex = action.payload.exerciseIndex;
    
//       // Create a shallow copy of the state
//       const updatedState = { ...state };
    
//       // Create a new array for the workouts to avoid mutating the original array
//       const targetedWorkouts = [...state.workouts];
    
//       // Create a shallow copy of the workout at the specified index
//       const targetedWorkout = { ...targetedWorkouts[workoutIndexToAddSet] };
    
//       // Create a new array for the exercises to avoid mutating the original array
//       const updatedExercises = [...targetedWorkout.exercises];
    
//       // Create a shallow copy of the exercise at the specified index
//       const updatedExercise = { ...targetedWorkouts[exerciseIndex] };
    
//       // Update the sets array within the exercise
//       updatedExercise.sets = [...updatedExercise.sets, newSet];
    
//       // Update the exercises array within the workout
//       updatedExercises[exerciseIndex] = updatedExercise;
    
//       // Update the workouts array within the state
//       targetedWorkout.exercises = updatedExercises;
//       targetedWorkouts[workoutIndexToAddSet] = targetedWorkout;
    
//       // Update the state with the modified workouts array
//       updatedState.workouts = targetedWorkouts;
    
//       // Return the updated state
//       return updatedState;

//     default:
//       return state;
//   }
// }

// export default CustomProgramReducer;

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
  addSetToExercise: handleAddSetToExercise,
  removeSetFromExercise: handleRemoveSetFromExercise,
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

  return { ...state, workouts: updateWorkoutExercises(state.workouts, index, updateWorkoutName) };
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

  return { ...state, workouts: updateWorkoutExercises(state.workouts, workoutIndexToAddExercise, updateWorkoutExercisesArray) };
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
        exercises: updateArrayElement(workout.exercises, exerciseIndexToChangeName, updateExerciseName),
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
        exercises: updateArrayElement(workout.exercises, exerciseIndex, updateExerciseSetsArray),
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
        exercises: updateArrayElement(workout.exercises, exerciseIndexToRemoveSet, removeSetFromExerciseArray),
      })
    ),
  };
}

function handleDefault(state) {
  return state;
}

export default CustomProgramReducer;

