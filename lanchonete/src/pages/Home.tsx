import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="home-page">
            <header className="home-header">
                <h1 className="home-title"> Bem-Vindo a nossa lanchonete</h1>
                <p className="home-subtitle"> Aqui você encontra os melhores lanches disponíveis</p>
            </header>

             <main className="home-main">
                <div className="home-buttons">
                    <Link to ="/produtos" className="btn-primary">
                         Ver Produtos
                    </Link>

                    {!user && (
                        <div className="secondary-group">
                            <Link to="/login" className="btn-secondary">
                            Login
                            </Link>
                            <Link to="/cadastro" className="btn-secondary">
                            Cadastro
                            </Link>
                        </div>
                    )}

                    {user && (
                        <Link to="/perfil" className="btn-primary">
                            Perfil
                        </Link>
                    )}

                    {user?.tipoUsuario.nomeTipoUsuario === "Admin" && (
                        <Link to="/produtos/novo" className="btn-admin">
                            Cadastrar Produto
                        </Link>
                    )}
                </div>
             </main>
        </div>
    );
};

export default Home;