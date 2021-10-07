import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../auth'


const EditUser = props => {
    const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('')

    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);
    let history = useHistory();

    const submitForm = async e => {
        e.preventDefault();
        const response = await fetchWithCSRF(`/api/users/${props.currentUser.id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            credentials:'include',
            body: JSON.stringify({ email, password, password2 })
        });
        const data = await response.json();
        setErrors(data.errors || []);
        setMessages(data.messages || []);
        if (response.ok) history.push('/');
    }
    
    const deleteUser = async e => {
        e.preventDefault();
        const response = await fetchWithCSRF(`/api/users/${props.currentUser.id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({})
        });
        const data = await response.json();
        setErrors(data.errors || []);
        setMessages(data.messages || []);
        if (response.ok) setCurrentUser(null);
    }

    return (
        <>
            <form onSubmit={submitForm}>
                {errors.length ? errors.map(err => <li key={err}>{err}</li>) : ''}
                <input
                    type="email" placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} name="email" />
                <input
                    type="password" placeholder="New password (required)" value={password}
                    onChange={e => setPassword(e.target.value)} name="password" />
                <input
                    type="password" placeholder="Confirm new password (required)" value={password2}
                    onChange={e => setPassword2(e.target.value)} name="password2" />
                <button type="submit">Submit Changes</button>
            </form>
            <form onSubmit={deleteUser}>
                {messages.map(err => <li key={err}>{err}</li>)}
                <h2>Would you like to delete your account?</h2>
                <button type="submit">Delete Account</button>
            </form>
        </>
    );
};

export default EditUser;
