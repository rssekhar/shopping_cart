import { useContext } from "react"
import { ToggleContext } from "./Contextx"
import { GiShoppingBag } from "react-icons/gi";

export default function Header()
{
    const {toggle,setToggle} = useContext(ToggleContext)
    return(
        <>
            <div className="header">
                <div>
                    <h3><GiShoppingBag /> &nbsp;Shopping Cart</h3>
                </div>
                <div>
                    <button onClick={()=>setToggle(!toggle)}>{toggle ? "Dark" : "Light"}</button>
                </div>
            </div>
        </>
    )
}