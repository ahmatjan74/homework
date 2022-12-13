import { Button, Input, InputNumber, Select } from 'antd';
import React, { FC, useState } from 'react';
import { PRODUCT_TYPES } from '../../utils/constants'
import './index.css'

const SalesTaxContainer: FC
  = () => {
    const [number, setNumber] = useState<number | null>(null)
    const [product, setProduct] = useState<string | null>(null)
    const [price, setPrice] = useState<number | null>(null)
    const [result, setResult] = useState({})
    const [values, setValues] = useState([])
    const onNumberChange = (value: number | null) => {
      setNumber(value);
    }
    const onPriceChange = (value: number | null) => {
      setPrice(value);
    }

    const onProductChange = (value: string) => {
      setProduct(value);
    }

    const onSubmitClick = () => {

    }
    const onAddClick = () => {
      setValues([...values, { number, product, price }])
    }
    return (
      <div className='sales-tax__container'>
        <h3 className='title'>INPUT:</h3>
        <div className='item__container'>
          <span className='item'>number</span>
          <span className='item'>product</span>
          <span className='item'>price</span>
        </div>
        <div className='item__container'>
          <span className='item'>
            <InputNumber value={number} className='number__input' onChange={onNumberChange} /></span>
          <span className='item'><Select
            onChange={onProductChange}
            className='product__select'
            options={PRODUCT_TYPES}
            value={product}
          />  at</span>
          <span className='item'><InputNumber className='price_input' value={price} onChange={onPriceChange} /></span>
          <span className='item'>
            <Button type='primary' onClick={onAddClick}>Add</Button>
            <Button type='primary' onClick={onSubmitClick}>Submit</Button>
          </span>
        </div>
        <div className='result__container'>
        </div>
      </div>
    );
  }

export default SalesTaxContainer;