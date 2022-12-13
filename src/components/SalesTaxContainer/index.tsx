import { Button, Input, InputNumber, Radio, Select, Switch } from 'antd';
import React, { FC, useState } from 'react';
import { formatNumberAndFix2 } from '../../utils';
import { PRODUCT_TYPES } from '../../utils/constants'
import './index.css'

const { TextArea } = Input;

interface SalesTaxObject {
  number: number;
  product: string;
  price: number;
  isImported: boolean;
  isTaxFree?: boolean;
  currency?: string;
}
const SalesTaxContainer: FC
  = () => {
    const [number, setNumber] = useState<number>(0)
    const [product, setProduct] = useState<string>(PRODUCT_TYPES[0].value)
    const [isImported, setIsImported] = useState<boolean>(false)
    const [price, setPrice] = useState<number>(0)
    const [values, setValues] = useState<Array<SalesTaxObject>>([])
    const [displayText, setDisplayText] = useState<string>('')
    const [resultText, setResultText] = useState<string | null>(null)

    const onNumberChange = (value: number) => {
      setNumber(value);
    }
    const onPriceChange = (value: number) => {
      setPrice(value);
    }

    const onProductChange = (value: string) => {
      setProduct(value);
    }

    const onImportedChange = (value: boolean) => {
      setIsImported(value);
    }

    const onSubmitClick = () => {
      let total = 0;
      let taxes = 0;
      let _resultText = values.map((_value) => {
        total += (_value.price * _value.number)
        let _currentPrice = _value.price;
        // tax free && basic -> 0
        if (_value.isTaxFree && !_value.isImported) {
          // tax -> 0
          return `${_value.number}  ${_value.currency ? _value.currency + ' of' : ''} ${_value.product}: ${formatNumberAndFix2(_currentPrice * _value.number)}`
        }
        // tax free but imported -> 5
        if (_value.isTaxFree && _value.isImported) {
          let tax = (_currentPrice * 0.05) * _value.number;
          _currentPrice = (_currentPrice * _value.number) + tax;
          taxes += tax;
          return `${_value.number} imported ${_value.currency ? _value.currency + 'of' : ''} ${_value.product}: ${formatNumberAndFix2(_currentPrice)}`
        }
        // not tax free && basic => 10 
        if (!_value.isTaxFree && !_value.isImported) {
          let tax = (_currentPrice * 0.1) * _value.number
          _currentPrice = (_currentPrice * _value.number) + tax;
          taxes += tax;
          return `${_value.number} ${_value.currency ? _value.currency + ' of' : ''} ${_value.product}: ${formatNumberAndFix2(_currentPrice)}`
        }
        // not tax free && imported
        if (!_value.isTaxFree && _value.isImported) {
          let tax = (_currentPrice * 0.15) * _value.number;
          _currentPrice = (_currentPrice * _value.number) + tax;
          taxes += tax;
          return `${_value.number} imported  ${_value.currency ? _value.currency + 'of' : ''} ${_value.product}: ${formatNumberAndFix2(_currentPrice)}`
        }
      }).join('\n');
      total += taxes;
      _resultText = _resultText + `\nSales Taxes: ${formatNumberAndFix2(taxes)}\nTotal: ${formatNumberAndFix2(total)}`;
      setResultText(_resultText);
    }

    const onClearBoth = () => {
      clearInput();
      setValues([])
      setResultText(null);
      setDisplayText('');
    }

    const onAddClick = () => {
      const { exempt, currency } = PRODUCT_TYPES.find((type) => type.value === product)!;
      const _values = [...values, { number, product, price, isImported, isTaxFree: exempt, currency }]
      const _displayValue = _values.map((each) => `${each.number} ${each.isImported ? 'imported ' : ''} ${each.currency ? each.currency + ' of' : ''} ${each.product} at ${each.price}`).join('\n')
      setDisplayText(_displayValue)
      setValues(_values);
    }

    const clearInput = () => {
      setProduct(PRODUCT_TYPES[0].value);
      setPrice(0);
      setNumber(0);
      setIsImported(false);
    }
    return (
      <div className='sales-tax__container'>
        <h3 className='title'>INPUT:</h3>
        <div className='title__container'>
          <span className='item'>number</span>
          <span className='item'>product</span>
          <span className='item'>Imported</span>
          <span className='item'>price</span>
        </div>
        <div className='item__container'>
          <span className='item'>
            <InputNumber value={number} className='number__input' onChange={(value) => onNumberChange(value!)} />
          </span>
          <span className='item'>
            <Select
              onChange={onProductChange}
              className='product__select'
              options={PRODUCT_TYPES}
              value={product}
            />
          </span>
          <span className='item'>
            <Switch checked={isImported} onChange={onImportedChange} />
          </span>
          <span className='item'>
            <InputNumber className='price_input' value={price} onChange={(value) => onPriceChange(value!)} />
          </span>
          <span className='item'>
            <Button type='primary' onClick={onAddClick}>Add</Button>&nbsp;
          </span>
        </div>
        <div className='display__container'>
          <TextArea value={displayText} disabled rows={4}></TextArea>
          <Button type='primary' className='submit-btn' onClick={onSubmitClick}>Submit</Button>
          <Button type='primary' className='clear-btn' onClick={onClearBoth}>Clear Both</Button>
        </div>
        {
          resultText && <div className='result__container'>
            <TextArea value={resultText} disabled rows={6}></TextArea>
          </div>
        }
      </div>
    );
  }

export default SalesTaxContainer;