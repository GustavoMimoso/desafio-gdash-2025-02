import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [weatherData, setWeatherData] = useState([])
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)

  const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
      fetchWeatherData()
    }
  }, [token])

  const fetchWeatherData = async () => {
    setLoading(true)
    try {
      const response = await apiClient.get('/weather')
      setWeatherData(response.data)
      
      const insightsResponse = await apiClient.get('/weather/insights')
      setInsights(insightsResponse.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      })
      const { token: newToken } = response.data
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setIsLoggedIn(true)
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsLoggedIn(false)
    setWeatherData([])
    setInsights(null)
  }

  const handleExport = async (format) => {
    try {
      const response = await apiClient.get(`/export/${format}`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `weather.${format === 'csv' ? 'csv' : 'xlsx'}`)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="login-form">
        <h1>🌦️ GDASH Weather</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Demo: admin@example.com / 123456
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="header">
        <div className="container">
          <h1>🌦️ GDASH Weather Dashboard</h1>
          <button onClick={handleLogout} className="btn">Logout</button>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {insights && (
              <div className="insights">
                <h2>📊 Weather Insights (Last 30 days)</h2>
                <ul>
                  {insights.insights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <button onClick={() => handleExport('csv')} className="btn">📥 Export CSV</button>
              <button onClick={() => handleExport('xlsx')} className="btn">📥 Export XLSX</button>
              <button onClick={fetchWeatherData} className="btn">🔄 Refresh</button>
            </div>

            <div className="weather-data">
              {weatherData.slice(0, 10).map((data, idx) => (
                <div key={idx} className="weather-card">
                  <div className="location">{data.location}</div>
                  <div className="temp">{data.temperature}°C</div>
                  <p>Humidity: {data.humidity}%</p>
                  <p>Wind: {data.windSpeed} m/s</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>{data.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
