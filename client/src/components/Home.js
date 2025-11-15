import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../features/auth/useAuth';

const Home = () => {

    const [obj] = useAuth()

    return (
        <div className="home-container">
            <p className="home-subtitle">👑 החנות הטכנולוגית המובילה 👑</p>


            <img src="/logo1_2.png" alt="Rocket Icon" className="rocket-icon" />

            <p className="home-description">🚀 גלה את העולם הטכנולוגי החדש עם המוצרים הכי חדשניים והמתקדמים ✨</p>

            <div className="home-buttons-container">
                <Link to="/productList" className="button discover-button">
                    <span className="search-icon">🔍</span> גלה מוצרים חדשים
                </Link>

                {obj && <Link to="/userBasket" className="button buy-now-button">
                    <span className="cart-icon">🛒</span> התחל לקנות עכשיו
                </Link>}
            </div>

            <div className="decoration-item rocket-deco-1">🚀</div>
            <div className="decoration-item star-deco-1">⭐</div>
            <div className="decoration-item diamond-deco-1">💎</div>
            <div className="decoration-item star-deco-2">⭐</div>
            <div className="decoration-item rocket-deco-2">🚀</div>

        </div>
    );
};

export default Home;