import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';

test('checking component loaded',() =>{
    // steps for testing heading element loaded
    render(<Login/>);
    expect(screen.queryByText(/Login/)).toBeInTheDocument();
})

test('checking email & password inputs are empty', () => {
    render(<Login/>);
    expect(screen.queryByPlaceholderText('Email')).toHaveValue("");
    expect(screen.queryByPlaceholderText('Password')).toHaveValue("");
})

test('allows login with @gmail.com', async () => {
render(<Login />);

fireEvent.change(screen.getByPlaceholderText(/email/i), {  
  target: { value: 'user@gmail.com' },  
});  

fireEvent.change(screen.getByPlaceholderText(/password/i), {  
  target: { value: 'AFRITHmohammed123@' },  
});  

fireEvent.click(screen.getByRole('button', { name: /signin/i }));  

await waitFor(() =>  
  expect(screen.queryByText(/invalid email domain/i)).not.toBeInTheDocument()  
);

});

test('allows login with @yahoo.com', async () => {
render(<Login />);

fireEvent.change(screen.getByPlaceholderText(/email/i), {  
  target: { value: 'user@yahoo.com' },  
});  

fireEvent.change(screen.getByPlaceholderText(/password/i), {  
  target: { value: 'AFRITHmohammed123@' },  
});  

fireEvent.click(screen.getByRole('button', { name: /signin/i }));  

await waitFor(() =>  
  expect(screen.queryByText(/invalid email domain/i)).not.toBeInTheDocument()  
);

});

test('allows login with @outlook.com', async () => {
render(<Login />);

fireEvent.change(screen.getByPlaceholderText(/email/i), {  
  target: { value: 'user@outlook.com' },  
});  

fireEvent.change(screen.getByPlaceholderText(/password/i), {  
  target: { value: 'AFRITHmohammed123@' },  
});  

fireEvent.click(screen.getByRole('button', { name: /signin/i }));  

await waitFor(() =>  
  expect(screen.queryByText(/invalid email domain/i)).not.toBeInTheDocument()  
);

});
