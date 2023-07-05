import React, {useState} from 'react';
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";

const products = [
    {id: 1, title: 'Эспрессо', img: './../../assets/coffee1.jpg', price: 200},
    {id: 2, title: 'Макиато', img: './../../assets/coffee2.jpg', price: 240},
    {id: 3, title: 'Моккачино', img: './../../assets/coffee3.jpg', price: 250},
    {id: 4, title: 'Ристретто', img: './../../assets/coffee4.jpg', price: 210},
    {id: 5, title: 'Фраппе', img: './../../assets/coffee5.jpg', price: 270},
    {id: 6, title: 'Капучино', img: './../../assets/coffee6.jpg', price: 250},
    {id: 7, title: 'Гляссе', img: './../../assets/coffee7.jpg', price: 270},
    {id: 8, title: 'Американо', img: './../../assets/coffee8.jpg', price: 220},
    {id: 9, title: 'Латте', img: './../../assets/coffee9.jpg', price: 260}
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram()

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                />
            ))}
        </div>
    );
};

export default ProductList;