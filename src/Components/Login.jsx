import { useState } from 'react';

const Login = ({ onAuth, closeLogin }) => {
  const [isRegister, setIsRegister] = useState(false); // Alterna entre Login y Registro
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Al autenticar, pasamos el nombre (o el correo) al componente App
    const displayName = isRegister ? formData.nombre : formData.correo.split('@')[0];
    onAuth(displayName);
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: '420px', width: '100%', borderRadius: '20px', border: 'none' }}>
        
        {/* Botón para cerrar y volver a la lista */}
        <button className="btn-close ms-auto" onClick={closeLogin}></button>

        <div className="text-center mb-4">
          <h2 className="fw-bold">{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
          <p className="text-muted small">
            {isRegister ? 'Únete a nuestra comunidad de PawCare' : '¡Hola de nuevo! Te extrañamos'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <label className="form-label small fw-bold">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Tu nombre"
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required 
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label small fw-bold">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="correo@ejemplo.com"
              onChange={(e) => setFormData({...formData, correo: e.target.value})}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <button type="submit" className="btn btn-warning w-100 text-white fw-bold py-2 mb-3">
            {isRegister ? 'Registrarse' : 'Entrar'}
          </button>
        </form>

        <div className="text-center">
          <p className="small text-muted mb-3">O continúa con</p>
          

          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="btn btn-link btn-sm text-warning fw-bold text-decoration-none"
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;