import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";
import Template from "../layout/Template";
import styled, { css } from "styled-components";
import FavouriteContext from "../store/FavoritesItemsContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

const Center = styled.div`
  text-align: center;
  ${(props) =>
    props.colored &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const Desctiption = styled(Title)`
  font-size: 1.5em;
  color: green;
`;

const TextThrough = styled.span`
  text-decoration: line-through;
`;

const Li = styled.li``;

function DebugPage(props) {
  const match = useMatch("/debug");
  const [history, setHistory] = useState([]);
  let favorites = useContext(FavouriteContext);
  let location = useLocation();

  useEffect(() => {
    setHistory([...history, location.pathname]);
  }, [location]);

  function deleteFav(event) {
    const value = event.target.dataset.id;
    favorites.removeItem(value);
  }

  console.log("favorites.selectedItems", favorites.selectedItems);
  return match ? (
    <Template>
      <Title>Debug page</Title>
      <Desctiption>
        Here we can see the history of your <TextThrough>browser</TextThrough>{" "}
        history.
      </Desctiption>
      <Center>Not colored!</Center>
      <Center colored>
        Colored:
        {history.map((element, index) => {
          return <Li key={generateKey(index)}>{element.toString()}</Li>;
        })}
      </Center>
      <Center>
        <Desctiption>Favourites:</Desctiption>
        <TransitionGroup component="div">
          {favorites.selectedItems.map(({ id, name }) => (
            <CSSTransition timeout={500} classNames="fade" key={id}>
              <li className="favorite" onClick={deleteFav} data-id={id}>
                {name}
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Center>
    </Template>
  ) : (
    <></>
  );
}

export default DebugPage;
