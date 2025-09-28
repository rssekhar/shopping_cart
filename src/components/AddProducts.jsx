import { useReducer, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import ShowProducts from "./ShowProducts"
import { BiCartAdd } from "react-icons/bi";

const reducer = (state, action) => {
    switch (action.type) {
        case "add":
            return [...state, action.payload]

        case "update":
            return state.map((item) =>
                item.id === action.payload.id ? action.payload : item
            )

        case "delete":
            return state.filter((eachVal) => eachVal.id !== action.payload)

        default:
            return state
    }
}

export default function AddProducts() {
    const prod_name = useRef()
    const prod_cat = useRef()
    const prod_price = useRef()
    const add_date = useRef()

    const [state, dispatch] = useReducer(reducer, [])

    // For editing
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)

    // ✅ Handle Add / Update
    const handleSubmit = (e) => {
        e.preventDefault()

        const newItem = {
            id: isEditing ? editId : uuidv4(),
            product_name: prod_name.current.value,
            product_category: prod_cat.current.value,
            product_price: prod_price.current.value,
            prod_add_date: add_date.current.value,
        }

        if (isEditing) {
            dispatch({ type: "update", payload: newItem })
            setIsEditing(false)
            setEditId(null)
        } else {
            dispatch({ type: "add", payload: newItem })
        }

        clearForm()
    }

    // ✅ Fill form fields for editing
    const handleEdit = (id) => {
        const productToEdit = state.find((item) => item.id === id)
        if (productToEdit) {
            prod_name.current.value = productToEdit.product_name
            prod_cat.current.value = productToEdit.product_category
            prod_price.current.value = productToEdit.product_price
            add_date.current.value = productToEdit.prod_add_date

            setIsEditing(true)
            setEditId(id)
        }
    }

    // ✅ Delete product
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            dispatch({ type: "delete", payload: id });
        }
    };


    // ✅ Clear the form
    const clearForm = () => {
        prod_name.current.value = ""
        prod_cat.current.value = ""
        prod_price.current.value = ""
        add_date.current.value = ""
    }

    return (
        <div className="products">
            <div className="col-2">
                <form className="add_form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="prod_name">Product Name</label>
                        <input type="text" id="prod_name" ref={prod_name} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prod_cat">Product Category</label>
                        <input type="text" id="prod_cat" ref={prod_cat} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prod_price">Product Price</label>
                        <input type="number" id="prod_price" ref={prod_price} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="add_date">Adding Date</label>
                        <input type="date" id="add_date" ref={add_date} required />
                    </div>

                    <div className="form-group">
                        <button type="submit">
                            <BiCartAdd/>{isEditing ? "Update" : "Add"}
                        </button> &nbsp;
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    clearForm()
                                    setIsEditing(false)
                                    setEditId(null)
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="col-10">
                <ShowProducts
                    newItems={state}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    )
}
