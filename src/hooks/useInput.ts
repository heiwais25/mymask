import { useState, FormEvent } from "react";

export default (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return { value, onChange, setValue };
};
