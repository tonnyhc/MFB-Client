
import Register from '../components/authentication/Register';
import Login from '../components/authentication/Login'

const AuthenticationPage = ({
  page
}) => {
  if (page == 'login') {
    return (<Login />)
  }
  return <Register />
};
export default AuthenticationPage;
