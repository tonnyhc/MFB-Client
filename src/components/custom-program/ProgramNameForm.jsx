import Input from "../common/input/Input";

const ProgramNameForm = ({ formData, handleChange }) => {

  return (
    <div className="mt-12 flex justify-center items-center">
      <form action="" className="text-white flex gap-3 flex-col">
        <Input
          labelText="Program Name"
          placeholder="Program Name"
          labelName="planName"
          inputType="text"
          onChange={handleChange}
          value={formData.programName}
          isRequired={true}
          inputSize='xxl'
        />
        <Input
          labelText="Number of workouts"
          placeholder="Number of workouts"
          labelName="workoutsCount"
          inputType="number"
          onChange={handleChange}
          // onBlur={() => console.log('asd')}
          value={formData.workoutsCount}
          isRequired={true}
          inputSize='xxl'
        />
      </form>
    </div>
  );
};

export default ProgramNameForm;
