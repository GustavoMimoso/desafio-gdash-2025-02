import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:3000/health')
        if (response.ok) {
          const data = await response.json()
          setStatus(data)
          setError(null)
        } else {
          setError('Backend respondeu com status ' + response.status)
        }
      } catch (err) {
        setError('Erro ao conectar ao backend: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 GDASH</h1>
        <p className="subtitle">Dashboard de Grafos</p>
      </header>

      <main className="main">
        <section className="section">
          <h2>Status do Sistema</h2>

          {loading && <p className="loading">Verificando status...</p>}

          {error && (
            <div className="error">
              <p>⚠️ {error}</p>
            </div>
          )}

          {status && (
            <div className="status-card">
              <div className="status-item">
                <span className="label">Status Geral:</span>
                <span className={`badge badge-${status.status}`}>
                  {status.status.toUpperCase()}
                </span>
              </div>

              <div className="status-item">
                <span className="label">MongoDB:</span>
                <span className={`badge badge-${status.checks.mongodb}`}>
                  {status.checks.mongodb}
                </span>
              </div>

              <div className="status-item">
                <span className="label">RabbitMQ:</span>
                <span className={`badge badge-${status.checks.rabbitmq}`}>
                  {status.checks.rabbitmq}
                </span>
              </div>

              <div className="status-item">
                <span className="label">Última Verificação:</span>
                <span className="value">
                  {new Date(status.timestamp).toLocaleTimeString('pt-BR')}
                </span>
              </div>
            </div>
          )}
        </section>

        <section className="section">
          <h2>Serviços Disponíveis</h2>
          <div className="services">
            <div className="service-card">
              <h3>📊 API Backend</h3>
              <p>Port 3000</p>
              <a href="http://localhost:3000/health" target="_blank" rel="noopener noreferrer">
                Ver Health Check
              </a>
            </div>

            <div className="service-card">
              <h3>🐰 RabbitMQ</h3>
              <p>Management UI</p>
              <a href="http://localhost:15672" target="_blank" rel="noopener noreferrer">
                Acessar RabbitMQ
              </a>
            </div>

            <div className="service-card">
              <h3>💾 MongoDB</h3>
              <p>Port 27017</p>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('MongoDB: localhost:27017\nCredenciais: admin/admin123') }}>
                Ver Credenciais
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Informações do Projeto</h2>
          <div className="info-box">
            <h3>🎯 GDASH - Desafio Full Stack 2025</h3>
            <ul>
              <li><strong>Frontend:</strong> React + Vite</li>
              <li><strong>Backend:</strong> NestJS + TypeScript</li>
              <li><strong>Database:</strong> MongoDB 7.0</li>
              <li><strong>Message Queue:</strong> RabbitMQ 3.12</li>
              <li><strong>Orquestração:</strong> Docker Compose</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 GDASH - Desenvolvido com ❤️ por Gustavo Henrique</p>
      </footer>
    </div>
  )
}
