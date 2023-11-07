import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useEffect } from 'react';

const Logout = () => {
    const navigate = useNavigate();
    const {userLogout} = useContext(AuthContext);

    useEffect(() => {
        userLogout();
        navigate('/login');
    }, []);

    return null
};


export default Logout;