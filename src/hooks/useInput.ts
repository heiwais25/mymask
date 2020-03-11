import { useState, FormEvent, ChangeEvent } from "react";

export type IInput = {
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  setValue: (value: string) => void;
};

export default (initialValue = ""): IInput => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return { value, onChange, setValue };
};
