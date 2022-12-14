import React from "react";
import { render, screen } from '@testing-library/react'
import SalesTaxContainer from "../components/SalesTaxContainer";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe('Sales Tax', () => {
    test('Sales Tax: first input', () => {
        render(<SalesTaxContainer />);
        expect(screen.getAllByText('INPUT:').length).toBe(1)
        const numberEle = screen.getAllByPlaceholderText('please input a number')[0];
        userEvent.type(numberEle, '1');
        userEvent.click(screen.getAllByText('Book')[0])
        act(() => {
            userEvent.click(screen.getAllByText('Book')[0])
        })
        userEvent.type(screen.getAllByPlaceholderText('please input price')[0], '12.49');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        userEvent.clear(screen.getAllByPlaceholderText('please input price')[0]);

        userEvent.click(screen.getAllByText('Book')[0])
        act(() => {
            userEvent.click(screen.getAllByText('Music CD')[0])
        })
        userEvent.type(screen.getAllByRole('spinbutton')[1], '14.99');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        userEvent.clear(screen.getAllByPlaceholderText('please input price')[0]);

        userEvent.click(screen.getAllByText('Music CD')[0])
        act(() => {
            userEvent.click(screen.getAllByText('Chocolate Bar')[0])
        })
        userEvent.type(screen.getAllByRole('spinbutton')[1], '0.85');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        act(() => {
            userEvent.click(screen.getAllByText('Submit')[0]);
        })
        const textAreaValue = screen.getAllByPlaceholderText('results')[0];
        expect(textAreaValue.innerHTML).toContain('Total: 29.83');
        expect(textAreaValue.innerHTML).toContain('Sales Taxes: 1.50');
    })

    test('Sales Tax: second input', () => {
        render(<SalesTaxContainer />);
        expect(screen.getAllByText('INPUT:').length).toBe(1)
        const numberEle = screen.getAllByPlaceholderText('please input a number')[0];
        userEvent.type(numberEle, '1');
        userEvent.click(screen.getAllByText('Book')[0])
        act(() => {
            userEvent.click(screen.getAllByText('Chocolate Bar')[0]
            )
        })
        userEvent.click(screen.getAllByRole('switch')[0])
        userEvent.type(screen.getAllByPlaceholderText('please input price')[0], '10.00');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        userEvent.clear(screen.getAllByPlaceholderText('please input price')[0]);

        userEvent.click(screen.getAllByText('Chocolate Bar')[0])
        act(() => {
            userEvent.click(screen.getAllByText('Perfume')[0])
        })
        userEvent.type(screen.getAllByRole('spinbutton')[1], '47.50');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        act(() => {
            userEvent.click(screen.getAllByText('Submit')[0]);
        })
        const textAreaValue = screen.getAllByPlaceholderText('results')[0];
        expect(textAreaValue.innerHTML).toContain('Total: 65.13');
        expect(textAreaValue.innerHTML).toContain('Sales Taxes: 7.63');
    })

    test('Sales Tax: third input', () => {
        render(<SalesTaxContainer />);
        expect(screen.getAllByText('INPUT:').length).toBe(1)
        const numberEle = screen.getAllByPlaceholderText('please input a number')[0];
        userEvent.type(numberEle, '1');
        userEvent.click(screen.getAllByText('Book')[0])
        act(() => {
            userEvent.click(screen.getAllByText('Perfume')[0]
            )
        })
        userEvent.click(screen.getAllByRole('switch')[0])
        userEvent.type(screen.getAllByPlaceholderText('please input price')[0], '27.99');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        userEvent.clear(screen.getAllByPlaceholderText('please input price')[0]);

        userEvent.click(screen.getAllByRole('switch')[0])
        userEvent.type(screen.getAllByPlaceholderText('please input price')[0], '18.99');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        userEvent.clear(screen.getAllByPlaceholderText('please input price')[0]);

        // 3
        userEvent.click(screen.getAllByText('Perfume')[0])
        act(() => {
            userEvent.click(screen.getAllByText('Headache Pills')[0]
            )
        })
        userEvent.type(screen.getAllByPlaceholderText('please input price')[0], '9.75');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        userEvent.clear(screen.getAllByPlaceholderText('please input price')[0]);

        // 4
        userEvent.click(screen.getAllByText('Headache Pills')[0])
        act(() => {
            userEvent.click(screen.getAllByText('Chocolate Bar')[0]
            )
        })
        userEvent.click(screen.getAllByRole('switch')[0])
        userEvent.type(screen.getAllByPlaceholderText('please input price')[0], '11.25');
        act(() => {
            userEvent.click(screen.getAllByText('Add')[0]);
        })
        act(() => {
            userEvent.click(screen.getAllByText('Submit')[0]);
        })
        const textAreaValue = screen.getAllByPlaceholderText('results')[0];
        expect(textAreaValue.innerHTML).toContain('1 bottle of perfume: 20.89');
        expect(textAreaValue.innerHTML).toContain('1 imported box of chocolateBar: 11.81');
        expect(textAreaValue.innerHTML).toContain('Total: 74.64');
    })
})