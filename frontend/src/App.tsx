import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './components/ThemeProvider';
import { DataTable } from './components/dataTable/DataTable';

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/table" element={<DataTable />} />
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  )
}

export default App
