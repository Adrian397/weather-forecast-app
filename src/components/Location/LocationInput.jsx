import { useContext } from "react";
import Context from "../../store/context";
import styled from "styled-components";

const LocationInput = () => {
  const current = useContext(Context);

  return (
    <Container>
      <input
        type="text"
        placeholder="Location..."
        ref={current.inputLocation}
      />
      <form onSubmit={current.submitLocation}>
        <button>
          <Search></Search>
        </button>
      </form>
    </Container>
  );
};

const Search = styled.span`
  height: 2rem;
  width: 3rem;
  display: block;
  border-radius: 0 10px 10px 0;
  background-image: url("./search.svg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const Container = styled.div`
  width: max-content;
  height: max-content;
  position: absolute;
  left: 0;
  right: 0;
  top: 4%;
  margin-left: auto;
  margin-right: auto;

  button {
    position: absolute;
    right: 0%;
    top: 3%;
    border-radius: 0 10px 10px 0;
    border: none;
    outline: none;
    height: 2rem;
    width: 3rem;
    cursor: pointer;
    background-color: transparent;
  }

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
