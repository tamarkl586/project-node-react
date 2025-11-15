import { useLoginMutation } from './authApiSlice'
import { useDispatch } from 'react-redux'
import { setToken } from './authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const Login = () => {

    const [login, { isError, isSuccess, data, error }] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        if (isSuccess) {
            console.log("token:", data)

            dispatch(setToken(data.accessToken))
            console.log("token1: ", localStorage.getItem("token"));
            navigate("/productList")
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
        login(formData)
    }

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <div className="card ">
                    <h1>כניסה</h1>
                    {isError &&
                        <div>
                            <Message id="error1" severity="error" text="!משתמש לא מורשה"/>
                        </div>}
                    <InputText type="text" name="username" className="p-inputtext-lg" placeholder="שם משתמש" onChange={handleChange} required />
                    <InputText type="password" name="password" className="p-inputtext-lg" placeholder="סיסמא" onChange={handleChange} required />

                    <Button type="submit" label="הכנס" />
                </div>
            </form>
        </div>
    )
}
export default Login