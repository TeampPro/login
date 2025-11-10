import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import TailwindCalendar from './components/TailwindCalendar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <TailwindCalendar/>
  </React.StrictMode>,
)
