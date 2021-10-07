import React, { useState, useContext } from 'react';
import AuthContext from '../auth';

const SignUp = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('')
    const { fetchWithCSRF, setCurrentUser } = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const submitForm = async e => {
        e.preventDefault();
        const response = await fetchWithCSRF(`/api/users`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ email, password, password2 }),
        });
        const data = await response.json();
        setErrors(data.errors || []);
        setCurrentUser(data.current_user || null);
    }
    return (
        <form onSubmit={submitForm}>
            {errors.map(err => <li key={err} >{err}</li>)}
            <input
                type="text" placeholder="Email" value={email}
                onChange={e => setEmail(e.target.value)} name="email"
            />
            <input
                type="password" placeholder="Password" value={password}
                onChange={e => setPassword(e.target.value)} name="password"
            />
            <input
                type="password" placeholder="Confirm password" value={password2}
                onChange={e => setPassword2(e.target.value)} name="password2"
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};
export default SignUp;
