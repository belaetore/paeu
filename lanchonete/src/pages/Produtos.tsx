import React, { useEffect, useState } from "react";
import ProdutoCard from "../components/ProdutoCard";
import { api } from "../api";
import type { User } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

interface ProdutoProps{
    user: User | null;
}

const Produtos: React.FC<ProdutoProps> = ({user}) => {
    const [produtos, setProdutos] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/produto").then((res) => setProdutos(res.data));
    }, []);

    return (
        <div className="produtos-container">
            <h1>Produtos</h1>

            <button onClick={() => navigate("/")}>
                Voltar
            </button>

            {user?.tipoUsuario.nomeTipoUsuario === "Admin" && (
                <Link to="/prodtos/cadastro">
                    <button>Cadastrar Produto</button>
                </Link>
            )}

            <div className="produtos-list">
                {produtos.length === 0 ? (
                    <p>Nenhum produto cadastrado.</p>
                ) : (
                    produtos.map((p) => <ProdutoCard key={p.id} produto={p} />)                
                )}
            </div>
        </div>
    )
}

export default Produtos;