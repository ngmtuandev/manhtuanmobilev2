import React, { memo, useEffect } from "react";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  defaultValue,
}) => {
  useEffect(() => {
    if (defaultValue !== undefined) {
      register(id, validate);
    }
  }, [defaultValue, id, register, validate]);
  return (
    <div className="flex flex-col relative">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className="max-w-[150px] h-[30px]"
        type={type}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id, validate)}
        defaultValue={defaultValue}
      ></input>
      {errors[id] && (
        <small className="text-red-600 absolute mt-8">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
