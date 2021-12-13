import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./main";
import Basket from "./basket";
import TovarPage from "./tovarPage";

import useSelector from "../utils/use-selector";

/**
 * Приложение
 */
function App() {
  const select = useSelector((state) => ({
    name: state.modals.name,
  }));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<TovarPage />} />
        </Routes>
        {select.name === "basket" && <Basket />}
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
