import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../features/auth/authSlice";
import React from "react";
import useAuth from "../features/auth/useAuth";
import { useGetUserBasketByIdQuery } from '../features/basket/basketApiSlice';

const Navbar = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth);
    const { data: basketItems = [], isLoading, refetch: refetchBasket } = useGetUserBasketByIdQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [obj] = useAuth();

    const handleLogout = () => {
        dispatch(removeToken());
        navigate("/login");
    };

    return (
        <header className="navbar-container">
            <div className="navbar-inner">
                <div className="username-container">
                    <img src="/Designer (1).jpeg" className="username-img" />
                    <span className="username">{obj?.username}</span>
                </div>

                <div className="nav-section left-section">
                    <Link to="/" className="nav-item"> דף הבית 🏠</Link>
                    <Link to="/productList" className="nav-item" > מוצרים 📱</Link>
                    {obj?.roles === "Admin" && <Link to="/addProduct" className="nav-item">הוספת מוצר 📝</Link>}
                    {isUserLoggedIn && (
                        <div className="nav-item2" id="basket-wrapper">
                            <Link to="/userBasket" className="nav-item basket-link">סל קניות
                                <span className="cart-icon-wrapper">
                                    <span className="cart-icon">🛒</span>
                                    {basketItems.length > 0 && (
                                        <span className="basket-count">
                                            {basketItems.reduce((acc, item) => acc + item.quentity, 0)}
                                        </span>
                                    )}
                                </span>
                            </Link>
                        </div>
                    )}
                    {isUserLoggedIn && <Link to="/search" className="nav-item"> חיפוש 🔍</Link>}
                    {!isUserLoggedIn && <Link to="/register" className="nav-item"> הרשמה 👤</Link>}
                    {!isUserLoggedIn && <Link to="/login" className="nav-item"> כניסה 📲</Link>}
                    {isUserLoggedIn && <button onClick={handleLogout} className="nav-item logout"> יציאה 🔚</button>}
                </div>

                <div className="nav-section right-section">
                    <img
                        src="/logo1_1.png"
                        alt="Logo"
                        className="logo-image"
                    />
                </div>
            </div>
        </header>
    );
};

export default Navbar;