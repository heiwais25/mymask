import React, { FormEvent } from "react";
import styled from "styled-components";

const Container = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  /* border-radius: ${props => props.theme.borderRadius}; */
  background-color: ${props => props.theme.bgColor};
  height: 32px;
  padding: 0 6px;
  font-size: 14px;
`;

type Props = {
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
};

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  className,
  type = "text"
}: Props) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    autoFocus
  />
);

export default Input;
