import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
export default function ShowProducts({ newItems,handleEdit,handleDelete }) {
    // console.log(newItems)
    let sr_no = 1;
    return (
        <>
            <div>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Product Category</th>
                            <th>Product Price</th>
                            <th>Adding Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            newItems.length > 0 && (
                                newItems.map((eachVal) => {
                                    const { id, product_name, product_category, product_price, prod_add_date } = eachVal


                                    return (
                                        <tr key={id}>
                                            <td>{sr_no++}</td>
                                            <td>{product_name}</td>
                                            <td>{product_category}</td>
                                            <td>{product_price}</td>
                                            <td>{prod_add_date}</td>
                                            <td>
                                                <button className="edit" onClick={()=>handleEdit(id)}><FaRegEdit /></button>&nbsp;
                                                <button className="delete" onClick={()=>handleDelete(id)}><RiDeleteBin2Line /></button>
                                            </td>
                                        </tr>

                                    )

                                })
                            )
                        }
                    </tbody>
                    
                </table>
            </div>


        </>
    )
}