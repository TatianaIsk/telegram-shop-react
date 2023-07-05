import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css'
const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={'product' + className} >
            <img src={product.img} alt={''}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'addBtn'} onClick={onAddHandler}>
                Добавлен в корзину
            </Button>
        </div>
    );
};

export default ProductItem;