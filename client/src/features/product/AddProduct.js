import { useEffect, useState } from "react"
import { useAddProductMutation } from './productsApiSlice'
import { useGetAllCategoreisQuery } from '../category/categoryApiSlice'
import { useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const AddProduct = () => {

    const [addProduct, { isError, isSuccess, isLoading, error, data }] = useAddProductMutation()
    const { data: categoreis = [] } = useGetAllCategoreisQuery()
    const toast = useRef(null);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
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
                summary: ' הוספת מוצר',
                detail: 'המוצר התווסף בהצלחה',
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
        console.log("1234!!  ");
        addProduct(formData)
    }



    return (
        <div className="register-container">

            <form onSubmit={handleSubmit} className="addProduct-form">
                <Toast ref={toast} position="top-right" />
                <div className="card ">
                    <h1>הוספת מוצר</h1>
                    <InputText type="text" name="name" className="p-inputtext-lg" placeholder="שם" onChange={handleChange} required />
                    {isError &&
                        <div>
                            <Message id="error1" severity="error" text="!שם המוצר כבר קיים " />
                        </div>}
                    <InputText type="text" name="description" className="p-inputtext-lg" placeholder="תיאור" onChange={handleChange} required />
                    <InputText type="text" name="price" className="p-inputtext-lg" placeholder="מחיר" onChange={handleChange} required />
                    <InputText type="text" name="img" className="p-inputtext-lg" placeholder="תמונה" onChange={handleChange} required />
                    <InputText type="number" name="quantity" className="p-inputtext-lg" placeholder="כמות" onChange={handleChange} required />

                    <Dropdown name="category" value={formData.category} onChange={(e) => {
                        setFormData({ ...formData, category: e.value })
                    }} options={categoreis} optionLabel="name" optionValue="name" showClear placeholder="בחר קטגוריה" className="p-inputtext-lg" id="city" />

                    <Button type="submit" label="הוסף" />

                </div>
            </form>
        </div>
    )
}

export default AddProduct

