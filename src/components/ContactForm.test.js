import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange: render ContactForm
    render(<ContactForm />);
    //Act: 
        // - Get first name input
        // - Type in first name input less than 5 characters
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "four");
    //Assert: Error message is displayed
    await waitFor(() => {
        const newError = screen.queryByText(/error/i);
        expect(newError).toBeInTheDocument();  
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange: render ContactForm
    render(<ContactForm />)
    //Act: 
        // - click submit button
        const submitBtn = screen.getByRole("button");
        userEvent.click(submitBtn);
     //Assert: Three error message are displayed on screen
    await waitFor (() => {
        const newError = screen.getAllByText(/error/i);
        newError.map(error => {
            expect(error).toBeInTheDocument();
        })
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //Arrange: Render ContactForm
    render(<ContactForm />);
    //Act: 
        // - Get first name input
        const firstNameInput = screen.getByLabelText(/first name/i);
        // - Type at least 5 characters in first name input
        userEvent.type(firstNameInput, "Jenna");
        // - Get last name input
        const lastNameInput = screen.getByLabelText(/last name/i);
        // - Type anything in last name input
        userEvent.type(lastNameInput, "Anderson")
        // - get submit button
        const SubmitBtn = screen.getByRole("button");
        // - click submit button
        userEvent.click(SubmitBtn);
    //Assert: One error message is displayed on screen
    await waitFor(() => {
        const newError = screen.getByText(/error/i);
        expect(newError).toBeInTheDocument();
    })
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //Arrange: render ContactForm
    render(<ContactForm />)
    // Act: 
        // - Get email input
        const emailInput = screen.getByLabelText(/email/i)
        // - Type an invalid email address in email input
        userEvent.type(emailInput, "invalidEmailAddressTest")
    //Assert: "email must be a valid email address" is displayed on screen
    await waitFor(() => {
        const newError = screen.getByText(/email must be a valid email address/i);
        expect(newError).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});