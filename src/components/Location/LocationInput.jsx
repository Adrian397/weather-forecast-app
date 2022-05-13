import { useContext } from "react";
import Context from "../../store/context";
import styled from "styled-components";
import IconSearch from "../icons/icon-search";

const LocationInput = () => {
  const current = useContext(Context);

  return (
    <Container>
      <input type="text" placeholder="Location..." ref={current.location} />
      <form>
        <IconSearch />
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: max-content;
  height: max-content;
  position: absolute;
  left: 0;
  right: 0;
  top: 4%;
  margin-left: auto;
  margin-right: auto;

  input {
    width: 13rem;
    height: 2rem;
    border-radius: 10px;
    outline: none;
    border: none;
    padding-left: 1rem;
  }
`;

export default LocationInput;
