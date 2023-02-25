const { createContext, useState } = require("react");

export const Context = createContext();

const AppContext = ({ children }) => {
  const [tab, setTab] = useState("history");
  const [photo, setPhoto] = useState(null);
  return (
    <Context.Provider value={{ tab, setTab, photo, setPhoto }}>
      {children}
    </Context.Provider>
  );
};

export default AppContext;
