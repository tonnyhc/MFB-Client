import React, { useContext, useState } from "react";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import Button from "../common/button/Button";
import WorkoutCard from "./WorkoutCard";
import { CreateCustomWorkoutPlanContext } from "../../contexts/CreateCustomWorkoutContext";

const ProgramWorkoutsForm = () => {
  const { workoutPlan, dispatch } = useContext(CreateCustomWorkoutPlanContext);
  const screenWidth = window.innerWidth;
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);

  const changeWorkoutIndex = (e) => {
    const button = e.target.closest("button");
    if (button.id == "next") {
      setCurrentWorkoutIndex((oldIndex) => oldIndex + 1);
    } else if (button.id == "prev") {
      setCurrentWorkoutIndex((oldIndex) => oldIndex - 1);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div
        className="flex absolute h-full overflow-y-scroll max-h-9/10"
        style={{
          // left: `-${screenWidth * currentWorkoutIndex}px`,
          transform: `translateX(-${screenWidth * currentWorkoutIndex}px)`,
          transition:
            "transform 250ms linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%) 0s",
        }}
      >
        {workoutPlan.workouts.map((workout, index) => (
          <WorkoutCard key={index} arrayIndex={index} />
        ))}
      </div>

      {currentWorkoutIndex > 0 && (
        <div className="absolute top-1/2 translate-y-3/4 left-[12px] inline">
          <Button
            id="prev"
            onClick={changeWorkoutIndex}
            shape="circle"
            color="red"
            icon={<HiChevronLeft />}
          />
        </div>
      )}
      {currentWorkoutIndex < workoutPlan.numberOfWorkouts -1 && (
        <div className="absolute top-1/2 translate-y-3/4 right-[12px] inline">
          <Button
            id="next"
            onClick={changeWorkoutIndex}
            shape="circle"
            color="red"
            icon={<HiChevronRight />}
          />
        </div>
      )}
      <div
        className={`flex flex-wrap gap-1 w-9/10 justify-center items-center absolute bottom-0 right-1/2 translate-x-2/4`}
      >
        {workoutPlan.workouts.map((number, index) => (
          <div
            key={index}
            className="bg-button-red h-[15px] w-[30px] rounded flex justify-center items-center text-white text-sm point"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramWorkoutsForm;
