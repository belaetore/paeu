import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import CadastroProduto from "./pages/CadastroProduto";
import { useAuth } from "./hooks/useAuth";
import Perfil from "./pages/Perfil";
import './App.css'



function App() {
  const { login, user } = useAuth();
  return (
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cadastro" element={<Register/>} />
    <Route path="/login" element={<Login loginFn={login}/>}/>
    <Route path="/perfil" element={<Perfil/>}></Route>
    <Route path="/produtos" element={<Produtos user={user} />}></Route>
    <Route path="/produtos/cadastro" element={<CadastroProduto user={user}/>}></Route>

   </Routes>
  )
}

export default App;
