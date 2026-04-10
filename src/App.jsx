import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CuidadoresList from './components/CuidadoresList'
import Login from './Components/login'

function App() {
  const [usuario, setUsuario] = useState(null);
  const [showLogin, setShowLogin] = useState(false); 
  const handleAuth = (nombre) => {
    setUsuario(nombre);
    setShowLogin(false); 
  };

  return (
    <div className="app-wrapper">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <span className="navbar-brand fw-bold text-warning" onClick={() => setShowLogin(false)} style={{cursor: 'pointer'}}>
            🐾 PawCare
          </span>
          
          <div className="ms-auto">
            {!usuario ? (
              <button className="btn btn-warning btn-sm text-white fw-bold px-4" onClick={() => setShowLogin(true)}>
                Ingresar
              </button>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <span className="small text-muted">Hola, <strong>{usuario}</strong></span>
                <button className="btn btn-outline-danger btn-sm" onClick={() => setUsuario(null)}>Salir</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        {showLogin ? (
          <Login onAuth={handleAuth} closeLogin={() => setShowLogin(false)} />
        ) : (
          <>
            <header className="app-header mb-5 text-center">
              <h1 className="app-title">Directorio de Cuidadores</h1>
              <p className="app-subtitle">Encuentra el mejor cuidado para tu mascota</p>
            </header>
            <CuidadoresList />
          </>
        )}
      </main>
            <footer className="app-footer">
        <span>🐾 PawCare 2026 · Derechos reservados </span>
      </footer>

    </div>
  )
}

export default App