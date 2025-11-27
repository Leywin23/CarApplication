import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/cars">Cars</Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        {}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
