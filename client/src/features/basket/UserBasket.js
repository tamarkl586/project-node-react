import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../product/productsApiSlice';
import { useGetUserBasketByIdQuery, useAddProductToBasketMutation, useDeleteBasketProductMutation } from './basketApiSlice';

const UserBasket = () => {
  const { data: allProducts = [] } = useGetAllProductsQuery();
  const { data: basketItems = [], isLoading, refetch: refetchBasket } = useGetUserBasketByIdQuery();
  const [updateProduct] = useAddProductToBasketMutation();
  const [deleteProduct] = useDeleteBasketProductMutation();
  const navigate = useNavigate();


  console.log("allProducts: ", allProducts);


  useEffect(() => {
    if (!isLoading && basketItems.length === 0) {
      navigate('/empty-basket');
    }
  }, [basketItems, isLoading, navigate]);

  const handleDelete = async (productId) => {
    await deleteProduct({ productId }).unwrap();
    const updated = await refetchBasket();
    if (updated.data?.length === 0) {
      navigate('/empty-basket');
    }
  };

  const handleQuantityChange = (productId, delta, currentQuantity, maxQuantity) => {
    if ((delta === -1 && currentQuantity <= 1) || (delta === 1 && currentQuantity >= maxQuantity)) {
      console.log("currentQuantity: ", currentQuantity);
      console.log("maxQuantity: ", maxQuantity);
      return;
    }

    updateProduct({ productId, quentity: delta });
  };

  const listItems = basketItems.map((item) => {
    const product = allProducts.find((p) => p._id === item.productId);
    console.log("product: ", product);
    if (product)
      console.log("product.quentity: ", product.quantity);


    if (!product) return null;

    return (
      <div key={product._id} className="col-12" >
        <div id="card-border" className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4  background-color: purpole')}>
          <div id="product-tetails" className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-start gap-2">
              <span id="product-tetails2-2">₪{product.price}</span>
              <div className="update_buttons">
                <Button icon="pi pi-minus" text onClick={() => handleQuantityChange(product._id, -1, item.quentity, basketItems)} disabled={item.quentity <= 1} />
                <span className="px-3 font-medium">{item.quentity}</span>
                <Button icon="pi pi-plus" text onClick={() => handleQuantityChange(product._id, 1, item.quentity, product.quantity)} disabled={product.quantity === 0 || item.quentity >= product.quantity} />
              </div>
              <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => handleDelete(product._id)} />
            </div>
          </div>

          <div id="product-tetails3-2 " className="flex flex-column align-items-center sm:align-items-end gap-3">
            <div id="product-tetails3 ">
              <span className="flex align-items-center gap-2">
                <i className="pi pi-tag"></i>
                <span className="product-tetails3 ">{product.category}</span>
              </span>
            </div>
            <div className="product-name">{product.name}</div>
          </div>
          <img id="pImg2" src={product.img} alt={product.name} />
        </div>
      </div >
    );
  });

  const totalSum = basketItems.reduce((sum, item) => {
    const product = allProducts.find((p) => p._id === item.productId);
    return sum + (product?.price || 0) * item.quentity;
  }, 0);

  const productImages = basketItems.map((item) => {
    const product = allProducts.find((p) => p._id === item.productId);
    if (!product) return null;
    return (
      <div key={product._id} className="relative w-4rem h-4rem m-1">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover border-round shadow-1" />
        <div id='quantity_basket_circle'>{item.quentity}</div>
      </div>
    );
  });

  return (
    <div className="grid mt-4 px-4 xl:px-8" id='basket'>
      <div className="col-12 xl:col-4 order-1 xl:order-2" id='order'>
        <div className="p-4 shadow-3 border-round surface-100">
          <div className="txt1">סיכום הזמנה</div>
          <div className="flex flex-wrap justify-content-start">{productImages}</div>
          <div className="mt-3">
            <div className="text-md my-2">:כמות מוצרים בסל <strong>{basketItems.reduce((acc, item) => acc + item.quentity, 0)}</strong></div>
            <div className="text-md mb-3">:סכום כולל <strong>₪{totalSum.toFixed(2)} </strong></div>
            <Button label="ביצוע הזמנה" icon="pi pi-credit-card" className="w-full" />
          </div>
        </div>
      </div>

      <div className="col-12 xl:col-8 order-2 xl:order-1">
        <div>
          {listItems}
        </div>
      </div>
    </div>
  );
};

export default UserBasket;