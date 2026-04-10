import { useState, useEffect } from 'react'
import './CuidadoresList.css'

// Datos complementarios para enriquecer cada cuidador
const COMENTARIOS = [
  "Ama a los perros desde pequeña, tiene experiencia con razas grandes y pequeñas.",
  "Veterinario de profesión, ofrece atención especializada y primeros auxilios.",
  "Cuidadora certificada con patio amplio y zona de juegos para mascotas.",
  "Pasea perros hace 5 años, puntual y muy cariñosa con cada peludo.",
  "Tiene dos labradores propios, entiende perfectamente las necesidades caninas.",
  "Especialista en perros ansiosos y con necesidades especiales de comportamiento.",
  "Ofrece servicio de hospedaje en casa, tus perros duermen con ella.",
  "Entrenadora canina certificada, combina cuidado con refuerzo positivo.",
  "Bióloga de fauna, aporta conocimiento científico al bienestar animal.",
  "Estudiante de veterinaria, apasionada y muy comprometida con cada mascota.",
]

const PRECIOS = [8500, 12000, 9800, 15000, 7500, 11000, 13500, 9200, 10500, 14000]
const ESTRELLAS = [4, 5, 5, 4, 5, 4, 5, 4, 4, 5]
const RESENAS   = [38, 124, 57, 89, 203, 41, 76, 98, 62, 155]
const SERVICIOS = [
  ['Paseo', 'Guardería'],
  ['Hospedaje', 'Veterinaria'],
  ['Paseo', 'Guardería', 'Baño'],
  ['Paseo'],
  ['Hospedaje', 'Paseo'],
  ['Entrenamiento', 'Guardería'],
  ['Hospedaje', 'Baño'],
  ['Entrenamiento', 'Paseo'],
  ['Guardería', 'Baño'],
  ['Hospedaje', 'Entrenamiento'],
]

const AVATARES = ['🧑','👩‍🦰','👨‍🦳','👩','👨','👩‍🦱','🧑','👩‍🦳','👨‍🦱','👩‍🦲']

function StarRating({ count }) {
  return (
    <span className="stars" aria-label={`${count} estrellas`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  )
}

function CuidadorCard({ cuidador, index }) {
  const precio   = PRECIOS[index]
  const comentario = COMENTARIOS[index]
  const estrellas  = ESTRELLAS[index]
  const resenas    = RESENAS[index]
  const servicios  = SERVICIOS[index]
  const avatar     = AVATARES[index]

  return (
    <div className="cuidador-card" style={{ '--i': index }}>
      <div className="card-top">
        <div className="avatar-circle">{avatar}</div>
        <div className="card-identity">
          <h2 className="cuidador-nombre">{cuidador.name}</h2>
          <p className="cuidador-ciudad">📍 {cuidador.address.city}</p>
          <div className="rating-row">
            <StarRating count={estrellas} />
            <span className="resenas">({resenas} reseñas)</span>
          </div>
        </div>
        <div className="precio-badge">
          <span className="precio-valor">${precio.toLocaleString('es-CL')}</span>
          <span className="precio-unidad">/ día</span>
        </div>
      </div>

      <p className="cuidador-comentario">"{comentario}"</p>

      <div className="servicios-row">
        {servicios.map(s => (
          <span key={s} className="servicio-tag">{s}</span>
        ))}
      </div>

      <div className="card-footer-row">
        <span className="contacto">✉️ {cuidador.email}</span>
        <button className="btn-contactar">Contactar</button>
      </div>
    </div>
  )
}

function CuidadoresList() {
  const [cuidadores, setCuidadores] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    const fetchCuidadores = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
        const data = await res.json()
        setCuidadores(data.slice(0, 10))
      } catch (err) {
        setError(err.message || 'No se pudo cargar la lista de cuidadores.')
      } finally {
        setLoading(false)
      }
    }
    fetchCuidadores()
  }, [])

  if (loading) {
    return (
      <div className="state-box">
        <div className="paw-loader">
          <span>🐾</span><span>🐾</span><span>🐾</span>
        </div>
        <p className="state-text">Buscando cuidadores disponibles…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-box">
        <div className="error-emoji">😢</div>
        <p className="state-text"><strong>Error:</strong> {error}</p>
        <button className="btn-retry" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <section>
      <div className="list-header">
        <p className="list-meta">
          <span className="dot-live"></span>
          {cuidadores.length} cuidadores disponibles hoy
        </p>
      </div>
      <div className="cuidadores-grid">
        {cuidadores.map((c, i) => (
          <CuidadorCard key={c.id} cuidador={c} index={i} />
        ))}
      </div>
    </section>
  )
}

export default CuidadoresList
