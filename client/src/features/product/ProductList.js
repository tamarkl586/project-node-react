import { useGetAllProductsQuery, useDeleteProductMutation } from "./productsApiSlice"
import {useAddProductToBasketMutation} from "../basket/basketApiSlice"
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom'
import useAuth from '../auth/useAuth';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


const ProductList = () => {

    const [layout, setLayout] = useState('grid');
    const { data: products = [], isError, error, isLoading, refetch } = useGetAllProductsQuery('')
    const [deleteProduct] = useDeleteProductMutation()
    const [addToBasket] = useAddProductToBasketMutation()
    const navigate = useNavigate()
    const [isSuccesAddId,setIsSuccesAddId] = useState(0)
    const [obj] = useAuth()
    const toast = useRef(null);

    const updateProduct = (id)=>{
        navigate(`/updateProduct/${id}`)
    }

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

    const listItem = (product) => {
        return (
            <div className="col-12" key={product._id}>
                <Toast ref={toast} position="top-right" />
                <div id="card-border" className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4  background-color: purpole')}>
                    <img onClick={()=> navigate(`/getProductById/${product._id}`)}  id="pImg2" src={product.img} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4" id="product-tetails">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3" >
                        <div id="product-tetails3 ">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="product-tetails3 ">{product.category}</span>
                                </span>
                            </div>
                            <div className="product-name">{product.name}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span id="product-tetails2">₪{product.price}</span>
                            <div className="buttons">
                                {obj?.roles == "Admin" && <Button icon="pi pi-trash" className="p-button-rounded" onClick={()=>{deleteProduct(product._id)}} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>}
                                {obj?.roles == "Admin" && <Button icon="pi pi-pencil" className="p-button-rounded" onClick={()=>{updateProduct(product._id)}} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>}
                                {obj && <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={()=>{add({productId: product._id, quantity: 1})}} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div id="img111" className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
               <Toast ref={toast} position="top-right" />
                <div className="p-4 card-border">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="product-tetails3 ">{product.category}</span>
                        </div>
                    </div>
                    <div id="img111" className="flex flex-column align-items-center gap-3 py-5">
                        <img onClick={()=> navigate(`/getProductById/${product._id}`)} id="pImg" src={product.img} alt={product.name} />
                        <div className="product-name">{product.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span id="product-tetails2">₪{product.price}</span>
                        <div className="buttons">
                            {obj?.roles == "Admin" && <Button icon="pi pi-trash" className="p-button-rounded" onClick={()=>{deleteProduct(product._id)}} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>}
                            {obj?.roles == "Admin" && <Button icon="pi pi-pencil" className="p-button-rounded" onClick={()=>{updateProduct(product._id)}} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>}
                            {obj && <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={()=>add({productId: product._id, quantity: 1})} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>}
                          
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div id="card" className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div id="card2" className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div>
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}

export default ProductList