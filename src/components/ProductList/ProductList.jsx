import React, {useState} from 'react';
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";

const products = [
    {id: 1, title: 'Эспрессо', description: 'молотый кофе, вода', img: './../../assets/coffee1.jpg', price: 200},
    {id: 2, title: 'Макиато', description: 'молочная пена, эспрессо', img: './../../assets/coffee2.jpg', price: 240},
    {id: 3, title: 'Моккачино', description: 'эспрессо, вспененное молоко, горячее молоко, шоколад', img: './../../assets/coffee3.jpg', price: 250},
    {id: 4, title: 'Ристретто', description: 'более плотный, но менее крепкий, чем эспрессо', img: './../../assets/coffee4.jpg', price: 210},
    {id: 5, title: 'Фраппе', description: 'молоко, лед, эспрессо', img: './../../assets/coffee5.jpg', price: 270},
    {id: 6, title: 'Капучино', description: 'молочная пена, вспененное молоко, эспрессо', img: './../../assets/coffee6.jpg', price: 250},
    {id: 7, title: 'Гляссе', description: 'тертый шоколад, мороженное, эспрессо', img: './../../assets/coffee7.jpg', price: 270},
    {id: 8, title: 'Американо', description: 'эспрессо, вода', img: './../../assets/coffee8.jpg', price: 220},
    {id: 9, title: 'Латте', description: 'молочная пена, вспененное молоко, эспрессо', img: './../../assets/coffee9.jpg', price: 260}
]

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItem, setAddedItem] = useState([])
    const {tg} = useTelegram()

    const onAdd = (product) => {
        const alreadyAdded = addedItem.find(item => item.id === product.id)
        let newItem = []

        if (alreadyAdded) {
            newItem = addedItem.filter(item => item.id !== product.id)
        } else {
            newItem = {...addedItem, product}
        }

        setAddedItem(newItem)

        if (newItem.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.setParams({
                text: `Купить: ${getTotalPrice(newItem)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;