import React from "react";
import {render, screen} from '@testing-library/react'
import SalesTaxContainer from "../components/SalesTaxContainer";

describe('Sales Tax', () => {
    test('Sales Tax: render page', () => {
        render( <SalesTaxContainer />);
        expect(screen.getAllByText('INPUT').length).toBe(1)
    })
})