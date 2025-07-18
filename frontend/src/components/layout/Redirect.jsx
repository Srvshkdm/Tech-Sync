import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts';

export default function Redirect({ children, path, ifLoggedIn = false }) {
    const { user } = useUserContext();
    if (ifLoggedIn) {
        return user ? <Navigate to={path} /> : children;
    } else {
        return user ? children : <Navigate to={path} />;
    }
}
