import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyBasket = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-column align-items-center justify-content-center text-center p-6"
      style={{ minHeight: '60vh' }}
    >
      <i className="pi pi-shopping-cart text-6xl text-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">הסל שלך ריק</h2>
      <p className="text-500 mb-4">נראה שלא הוספת מוצרים עדיין.</p>
      <Button
        label="חזרה לחנות"
        icon="pi pi-arrow-left"
        className="p-button-outlined"
        onClick={() => navigate('/productList')}
      />
    </motion.div>
  );
};

export default EmptyBasket;
