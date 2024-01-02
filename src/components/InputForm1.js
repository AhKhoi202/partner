import React from "react";

const InputForm1 = ({
  label,
  unit,
  value,
  setValue,
  name,
  small,
  setInvalidFields,
  invalidFields,
}) => {
  return (
    <div className="flex flex-row">
      <label className="sm:w-48 w-20 flex-none" htmlFor="title">
        {label}
      </label>
      <div className="flex flex-auto flex-col items-center">
        <div className="flex w-full items-center">
          <input
            type="text"
            id=" title"
            className={`${
              unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
            } outline-none border flex-auto w-full border-gray-300 p-2`}
            value={value}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, [name]: e.target.value }))
            }
            onFocus={() => setInvalidFields([])}
          />
          {unit && (
            <span className="p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200">
              {unit}
            </span>
          )}
        </div>
        {invalidFields?.some((item) => item.name === name) && (
          <small className="text-red-500 block w-full">
            {invalidFields?.find((item) => item.name === name)?.message}
          </small>
        )}
      </div>
      {small && <small className="opacity-70">{small}</small>}
    </div>
  );
};

export default InputForm1;
