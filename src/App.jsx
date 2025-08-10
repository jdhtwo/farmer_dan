import ItemList from './components/ItemList'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🌱 Farmer Dan</h1>
        <p className="subtitle">Greenhouse Planting Activity Manager</p>
      </header>
      <main className="app-main">
        <ItemList />
      </main>
    </div>
  )
}

export default App