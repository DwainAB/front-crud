import React from "react";
import FormAddProduct from "../components/form-add-product/form-add-product";
import ListProductAdmin from "../components/list-product-admin/List-product-admin";

function Admin(){
    return(
        <div className="container-admin-page">
            <FormAddProduct/>
            <ListProductAdmin/>
        </div>
    )
}

export default Admin