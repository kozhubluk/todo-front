import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../redux/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = useSelector(selectAccessToken);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
