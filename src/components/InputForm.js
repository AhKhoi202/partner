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
  className,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };
  return (
    <div className={`pr-4 ${className}`}>
      <label htmlFor={keyPayload} className=" text-base ">
        {label}
      </label>
      <input
        type={type || "text"}
        className="outline-none bg-transparent p-2 border rounded w-full border-b-1 border-[#1266dd]"
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
