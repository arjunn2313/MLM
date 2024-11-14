import React, { useState } from "react";
import Heading from "../../components/Headings/Headings";
import Switch from "react-switch";
import ProfessionalForm from "../../components/Employee/ProfessionalForm";
import PersonalForm from "../../components/Employee/PersonalForm";

export default function AddNew() {
  const [isSwitchedOn, setIsSwitchedOn] = useState(false);

  const handleSwitchChange = (checked) => {
    setIsSwitchedOn(checked);
  };

  return (
    <div className="container  mx-auto ">
      <ProfessionalForm />

      <div className="bg-[#ECEFF0] rounded-lg p-6 flex justify-between items-center  mx-auto  mt-3">
        <Heading text="Personal Info" />
        <Switch
          checked={isSwitchedOn}
          onChange={handleSwitchChange}
          onColor="#345261"
          offColor="#ffff"
          checkedIcon={false}
          uncheckedIcon={false}
          height={20}
          width={40}
          handleDiameter={18}
        />
      </div>

      <PersonalForm />
    </div>
  );
}
