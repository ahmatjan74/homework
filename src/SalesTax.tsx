import React, { FC } from 'react';
import { sum } from 'utils/index';

console.log('sum', sum(1, 2));

const SalesTax: FC
  = () => {
    const name = 'aaa'
    return (
      <div >{name}</div>
    );
  }

export default SalesTax;