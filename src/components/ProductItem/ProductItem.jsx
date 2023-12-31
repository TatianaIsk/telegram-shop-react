import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css'
const ProductItem = ({product, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={'product'} >
            <img src={product.img} className={'img'}/>
            <div className={'title'}>{product.title}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'addBtn'} onClick={onAddHandler}>
                В корзину
            </Button>
        </div>
    );
};

export default ProductItem;