import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";
import Template from "../layout/Template";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

function DebugPage(props) {
  const match = useMatch("/debug");
  const [history, setHistory] = useState([]);
  let location = useLocation();

  useEffect(() => {
    setHistory([...history, location.pathname]);
  }, [location]);
  return match ? (
    <Template>
      {history.map((element, index) => {
        return <div key={generateKey(index)}>{element.toString()}</div>;
      })}
    </Template>
  ) : (
    <></>
  );
}

export default DebugPage;
