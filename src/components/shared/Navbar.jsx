import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../login/AuthContext'; // Asegúrate de que la ruta sea correcta

const UserRoleDisplay = ({ user, role }) => {
  let roleText;
  if (role === 'ROLE_ADMIN') {
    roleText = 'ADMINISTRADOR';
  } else if (role === 'ROLE_MANAGER') {
    roleText = 'GERENCIA';
  } else if (role === 'ROLE_EMPLOYEE') {
    roleText = 'PERSONAL';
  } else {
    roleText = 'ROL DESCONOCIDO';
  }

  return (
    <span className="flex items-center uppercase text-sm font-medium text-gray-900 dark:text-white me-3">
      <span className="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0" />
      usuario: {user} {roleText}
    </span>
  );
};

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      logout(); // Llama a la función logout del contexto
      navigate('/login'); // Redirige al login después de cerrar sesión
    }, 1000); // Puedes ajustar el tiempo de espera si lo deseas
  };

  useEffect(() => {
    if (!user) { // Si no hay usuario, redirige al login
      navigate('/login');
    }
  }, [user, navigate]); // Dependencias: user y navigate

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <div className="flex items-center mr-10 space-x-6 rtl:space-x-reverse">
            {user && role && <UserRoleDisplay user={user} role={role} />}
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleLogOut}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}
            </button>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Company</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Team</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
