import React from "react";
import styled from "../Styles/index";
import { IMarkerColor } from "../constants";

type FilterButtonProps = {
  "data-focused"?: boolean;
};

const FilterButton = styled.div<FilterButtonProps>`
  ${props => props.theme.unselectableText}
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 4px 4px;
  color: ${props => (props["data-focused"] ? "white" : "black")};
  background: linear-gradient(
    90deg,
    white,
    white 35%,
    ${props => (props["data-focused"] ? props.theme.primaryColor : "white")} 35%
  );
  border: 1px solid ${props => props.theme.lightGreyColor};
  :focus {
    outline: none;
  }
  :not(:last-child) {
    margin-right: 5px;
  }
`;

type MarkerIconProps = {
  "data-iconcolor": IMarkerColor;
};

const MarkerIcon = styled.div<MarkerIconProps>`
  background: url(${props => "/images/marker-".concat(props["data-iconcolor"]).concat(".png")})
    no-repeat;
  background-size: cover;
  width: 14px;
  height: 20px;
`;

const FilterText = styled.span`
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 4px;
`;

type Props = {
  text: string;
  iconColor: IMarkerColor;
  focused?: boolean;
  onClick: () => void;
};

export default ({ text, iconColor, focused, onClick }: Props) => {
  return (
    <FilterButton data-focused={focused} onClick={onClick}>
      <MarkerIcon data-iconcolor={iconColor} />
      <FilterText>{text}</FilterText>
    </FilterButton>
  );
};
