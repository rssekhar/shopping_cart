import Header from "./components/Header";
import AddProducts from "./components/AddProducts";
import { ToggleContext } from "./components/Contextx";
import { useState } from "react";

export default function App() {
  const [toggle, setToggle] = useState(false);

  const store = {
    toggle,
    setToggle
  }
  return (
    <>
      <ToggleContext.Provider value={store}>
        <div className={store.toggle ? "light_theme" : "dark_theme"}>

          <Header />
          <AddProducts />
        </div>

      </ToggleContext.Provider>
    </>
  )
}