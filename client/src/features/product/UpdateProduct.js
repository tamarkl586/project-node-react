import { useEffect, useState } from "react"
import { useUpdateProductMutation } from './productsApiSlice'
import { useGetAllCategoreisQuery } from '../category/categoryApiSlice'
import { useNavigate, useParams } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useAddProductToBasketMutation } from "../basket/basketApiSlice"
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Message } from 'primereact/message';


const UpdateProduct = () => {

    const [updateProduct, { isError, isSuccess, isLoading, error, data }] = useUpdateProductMutation()
    const { data: categoreis = [] } = useGetAllCategoreisQuery()
    const [addToBasket] = useAddProductToBasketMutation()
    const [isSuccesAddId, setIsSuccesAddId] = useState(0)
    const toast = useRef(null);
    const navigate = useNavigate()
    const { id } = useParams()

    const [formData, setFormData] = useState({
        id: id,
        name: "",
        description: "",
        price: "",
        img: "",
        quantity: 0,
        category: ""
    })

    useEffect(() => {
        if (isSuccess) {
            toast.current.show({
                severity: 'success',
                summary: ' עדכון מוצר',
                detail: '🛒 המוצר התעדכן בהצלחה',
                life: 3000
            });
        }
    }, [isSuccess])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        updateProduct(formData)
    }

    return (
        <div className="register-container">
            {isError &&
                <div>
                    <Message id="error1" severity="error" text="!עדכון מוצר נכשל" />
                </div>}

            <form onSubmit={handleSubmit} className="addProduct-form">
                <Toast ref={toast} position="top-right" />
                <div className="card ">
                    <h1>עדכון מוצר</h1>

                    <InputText type="text" name="name" className="p-inputtext-lg" placeholder="שם" onChange={handleChange} />
                    <InputText type="text" name="description" className="p-inputtext-lg" placeholder="תיאור" onChange={handleChange} />
                    <InputText type="text" name="price" className="p-inputtext-lg" placeholder="מחיר" onChange={handleChange} />
                    <InputText type="text" name="img" className="p-inputtext-lg" placeholder="תמונה" onChange={handleChange} />
                    <InputText type="number" name="quantity" className="p-inputtext-lg" placeholder="כמות" onChange={handleChange} />

                    <Dropdown name="category" value={formData.category} onChange={(e) => {
                        setFormData({ ...formData, category: e.value })
                    }} options={categoreis} optionLabel="name" optionValue="name" showClear placeholder="בחר קטגוריה" className="p-inputtext-lg" id="city" />
                    <Button type="submit" label="עדכן" />

                </div>
            </form>
        </div>
    )


}

export default UpdateProduct