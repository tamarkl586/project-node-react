import { useEffect, useState } from "react"
import { useRegisterMutation } from './authApiSlice'
import { useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const Register = () => {

    const [register, { isError, isSuccess, isLoading, error, data }] = useRegisterMutation()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        street: "",
        city: "",
        phone: "",
        email: "",
        username: "",
        password: ""
    })

    const cities = [
        { label: 'ירושלים', value: 'ירושלים' },
        { label: 'תל אביב', value: 'תל אביב' },
        { label: 'אשדוד', value: 'אשדוד' },
        { label: 'אשקלון', value: 'אשקלון' },
        { label: 'חיפה', value: 'חיפה' }
    ];

    useEffect(() => {
        if (isSuccess) {
            console.log("isSuccess: ", isSuccess);
            navigate("/login")
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
        register(formData)
    }

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <div className="card ">
                    <h1>הרשמה</h1>
                   
                    <InputText type="text" name="name" className="p-inputtext-lg" placeholder="שם" onChange={handleChange} required />
                    <InputText type="text" name="street" className="p-inputtext-lg" placeholder="רחוב" onChange={handleChange} required />
                    <Dropdown name="city" value={formData.city} onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value })
                    }} options={cities} optionLabel="label" optionValue="value" showClear placeholder="בחר עיר" className="p-inputtext-lg" id="city" />
                    <InputText type="text" name="phone" className="p-inputtext-lg" placeholder="פלאפון" onChange={handleChange} required />
                    <InputText type="email" name="email" className="p-inputtext-lg" placeholder="מייל" onChange={handleChange} required />
                    <InputText type="text" name="username" className="p-inputtext-lg" placeholder="שם משתמש" onChange={handleChange} required />
                    {isError &&
                        <div>
                           <Message id="error2" severity="error" text="!שם משתמש כבר קיים"/>
                        </div>}
                    <InputText type="password" name="password" className="p-inputtext-lg" placeholder="סיסמא" onChange={handleChange} required />
                   
                    <Button type="submit" label="הרשם" />
                </div>

            </form>
        </div>
    )
}

export default Register