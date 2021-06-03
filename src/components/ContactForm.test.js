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
    //Arrange: render ContactForm
    render(<ContactForm />);
    //Act: 
        // - Get submit button
        const submitBtn = screen.getByRole('button');
        // - click submit button
        userEvent.click(submitBtn);
    //Assert: "lastName is a required field" is displayed on screen
    await waitFor(() => {
        const newError = screen.getByText(/lastName is a required field/i);
        expect(newError).toBeInTheDocument();
    });
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //Arrange: render ContactForm
    render(<ContactForm />);
    //Act: 
        // - get first name input
        const firstNameInput = screen.getByLabelText(/first name/i);
        // - type valid first name
        userEvent.type(firstNameInput, "Jenna");
        // - get last name input
        const lastNameInput = screen.getByLabelText(/last name/i);
        // - type valid last name
        userEvent.type(lastNameInput, "Fischer");
        // - get email input
        const emailInput = screen.getByLabelText(/email/i);
        // - type valid email
        userEvent.type(emailInput, "Jenna@Fischer.com");
        // - get submit button
        const submitBtn = screen.getByRole("button");
        // - click submit button
        userEvent.click(submitBtn);
    //Assert:
        // - first name, last name, and email input are all displayed and Message is not displayed
        await waitFor(() => {
            const newFirstName = screen.getByText("Jenna");
            const newLastName = screen.getByText("Fischer");
            const newEmail = screen.getByText("Jenna@Fischer.com");
            const newMessage = screen.queryByText("Message:");
            expect(newFirstName).toBeInTheDocument();
            expect(newLastName).toBeInTheDocument();
            expect(newEmail).toBeInTheDocument();
            expect(newMessage).not.toBeInTheDocument();
        })
});

test('renders all fields text when all fields are submitted.', async () => {
    //Arrange:
    render(<ContactForm />);
    //Act:
        // - get first name input
        const firstNameInput = screen.getByLabelText(/first name/i);
        // - type valid first name
        userEvent.type(firstNameInput, "Jenna");
        // - get last name input
        const lastNameInput = screen.getByLabelText(/last name/i);
        // - type valid last name
        userEvent.type(lastNameInput, "Fischer");
        // - get email input
        const emailInput = screen.getByLabelText(/email/i);
        // - type valid email
        userEvent.type(emailInput, "Jenna@Fischer.com");
        // - get message input
        const messageInput = screen.getByLabelText(/message/i);
        // - type valid email
        userEvent.type(messageInput, "test message");
        // - get submit button
        const submitBtn = screen.getByRole("button");
        // - click submit button
        userEvent.click(submitBtn);
    //Assert:
        // - first name, last name, email, and message input are all displayed
        await waitFor(() => {
            const newFirstName = screen.getByText("Jenna");
            const newLastName = screen.getByText("Fischer");
            const newEmail = screen.getByText("Jenna@Fischer.com");
            const newMessage = screen.getByTestId("messageDisplay");
            expect(newFirstName).toBeInTheDocument();
            expect(newLastName).toBeInTheDocument();
            expect(newEmail).toBeInTheDocument();
            expect(newMessage).toBeInTheDocument();
        })

});