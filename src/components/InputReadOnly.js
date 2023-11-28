import React from "react";

const InputReadOnly = ({ label, value }) => {
  return (
    <div className="flex">
      <label className="w-48 flex-none" htmlFor="exactly-address">
        {label}
      </label>
      <input
        type="text"
        id="exactly-address"
        readOnly
        className="border border-gray-200 outline-none rounded-md bg-gray-100 p-2 flex-auto"
        value={value || ""}
      />
    </div>
  );
};

export default InputReadOnly;
