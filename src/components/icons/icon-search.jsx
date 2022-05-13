import styled from "styled-components";
import { useContext } from "react";
import Context from "../../store/context";

const IconSearch = () => {
  const ctx = useContext(Context);
  return (
    <SVG
      onClick={ctx.setLocation}
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-search"
      width="25"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="10" cy="10" r="7" />
      <line x1="21" y1="21" x2="15" y2="15" />
    </SVG>
  );
};

const SVG = styled.svg`
  position: absolute;
  right: -5%;
  top: 22%;
  cursor: pointer;
`;

export default IconSearch;
