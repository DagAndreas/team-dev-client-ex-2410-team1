import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import { AuthProvider, ProtectedRoute } from './context/auth';

const App = () => {
    return (
        <div className='App'>
            <AuthProvider>
                <Routes>
                    <Route path='login' element={<Login/>} />
                    <Route path='register' element={<Register/>} />

                    <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
