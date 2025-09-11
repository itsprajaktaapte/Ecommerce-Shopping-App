
import './App.css'
import Navbar from './Component/Navbar';
import './index.css'
import { Outlet } from "react-router-dom";

function App() {
 
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* child routes render here */}
      </main>
    </div>
  );
}


export default App
