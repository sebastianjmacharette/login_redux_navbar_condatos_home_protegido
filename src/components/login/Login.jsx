import React, { useState, useEffect } from 'react';
import Logo from '../../assets/img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/UserSlice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importar useAuth

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Estado para recordar datos
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUser, setToken, setRole } = useAuth(); // Usar useAuth en lugar de useContext
  useEffect(() => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    const storedPassword = localStorage.getItem('rememberedPassword');
  
    if (storedUsername && storedPassword) {
      setUserName(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    } else { // Si no hay valores almacenados, inicializa con cadenas vacías
      setUserName('');
      setPassword('');
    }
  }, []);
  

  const handleLoginEvent = async (e) => {
    e.preventDefault();
    const userCredentials = { username, password };
  
    try {
      const result = await dispatch(loginUser(userCredentials)).unwrap(); // Esperar y manejar el resultado
  
      if (result) { // Verificar si result existe y tiene datos
        const { Username: username, token, Role: role } = result; // Obtener datos de result
  
        setUser(username);
        setToken(token);
        setRole(role);
  
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
          localStorage.setItem('rememberedPassword', password);
        } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
        }
  
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error); 
      // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
      // setError(error.message || "Ha ocurrido un error durante el inicio de sesión");
    }
  };
  

  return (
    <div className="bg-slate-600 h-screen pt-20">
      <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img className="w-auto" src={Logo} alt="Logo" />
          </div>
          <form onSubmit={handleLoginEvent}>
            <div className="w-full mt-10">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="username"
                required
                value={username || ''}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                name="password"
                required
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-gray-300">Recordar mis datos</span>
              </label>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {loading ? 'Iniciando...' : 'Iniciar'}
              </button>
              {error && (
                <div className="fixed top-4 right-4 flex w-full max-w-sm rounded-lg shadow-md bg-gray-800">
                  <div className="flex items-center justify-center w-12 bg-red-500">
                    <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                    </svg>
                  </div>
                  <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                      <span className="font-semibold text-red-500 dark:text-red-400">{error}</span>
                      <p className="text-sm text-gray-200">Credenciales inválidas</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="flex items-end h-14 justify-end py-4 text-center bg-gray-800"></div>
      </div>
    </div>
  );
}

export default Login;
