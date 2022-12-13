import React from "react";
import {render, screen} from '@testing-library/react'
import SalesTax from "../SalesTax";

describe('Sales Tax', () => {
    test('Sales Tax: render page', () => {
        render(<SalesTax />);
        expect(screen.getAllByText('aaa')).toHaveLength(1);
    })
})