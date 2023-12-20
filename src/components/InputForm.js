import React, { memo } from "react";

const InputForm = ({
  label,
  value,
  setValue,
  keyPayload,
  invalidFields,
  setInvalidFields,
  type,
  onEnterPress,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };
  return (
    <div>
      <label htmlFor={keyPayload} className=" text-base ">
        {label}
      </label>
      <input
        type={type || "text"}
        className="outline-none bg-transparent p-2  w-full border-b-4 border-[#1266dd]"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }))
        }
        onKeyDown={handleKeyPress}
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields.length > 0 &&
        invalidFields.some((i) => i.name === keyPayload) && (
          <small className="text-red-500">
            {invalidFields.find((i) => i.name === keyPayload)?.message}
          </small>
        )}
    </div>
  );
};

export default memo(InputForm);
