import { useGetProductByIdQuery } from "./productsApiSlice";
import { useAddProductToBasketMutation } from "../basket/basketApiSlice";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useState } from "react";
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


const GetProductById = () => {
    const { id } = useParams();
    const { data: product = {}, isError, error, isSuccess } = useGetProductByIdQuery(id);
    const [addToBasket] = useAddProductToBasketMutation();
    const [isSuccesAddId, setIsSuccesAddId] = useState(0);
    const toast = useRef(null);

   const add = (item) => {
    addToBasket(item)
    setIsSuccesAddId(item.productId)

    toast.current.show({
        severity: 'success',
        summary: ' הוספה לסל ',
        detail: '🛒 המוצר נוסף לסל בהצלחה',
        life: 3000
    });
}

    return (
        <div className="product-page-container">
            <Toast ref={toast} position="top-right" />
            <div className="product-image-section">
                <img className="product-main-image" src={`http://localhost:3000/${product.img}`} alt={product.name} />
            </div>
            <div className="product-details-section">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-price">{product.price} ₪</div>
                <p className="product-description">{product.description}</p>
                <Button label="הוסף לעגלה " icon="pi pi-shopping-cart" className="p-button-rounded p-button-lg custom-add-button" onClick={() => add({ productId: product._id, quantity: 1 })} disabled={product.inventoryStatus === "OUTOFSTOCK"} />
            </div>
        </div>
    );
};

export default GetProductById;