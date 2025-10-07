import React, {useState} from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import type { User } from "../hooks/useAuth";

interface CadastroProdutoProps{
    user: User | null;
}

const CadastroProduto: React.FC<CadastroProdutoProps> = ({ user }) => {
    const [nomeProduto, setNomeProduto] = useState("");
    const [preco, setPreco] = useState<number | "">("");
    const [descricaoProduto, setDescricaoProduto] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const navigate = useNavigate();

    if(!user || user?.tipoUsuario.nomeTipoUsuario !== "Admin") {
        return <p>Somente admins podem cadastrar produtos</p>
    } else {
        const submit = async (e: React.FormEvent) => {
            e.preventDefault();
            await api.post("/produto", {
                nomeProduto,
                preco: Number(preco),
                descricaoProduto,
                imgUrl,
            })
            alert("Produto cadastrado!");
            navigate("/produtos");
        }; 

        return (
            <div className="cadastro-produto-page">
                <form onSubmit={submit} className="form-container">
                    <div className="top-part-produto">
                        <h1>Cadastro Produto</h1>
                    </div>

                    <input 
                    type="text"
                    value={nomeProduto}
                    onChange={(e) => setNomeProduto(e.target.value)}
                    placeholder="Nome Produto"
                    />

                    <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Preço"
                    step="0.01"
                    />

                    <textarea 
                    value={descricaoProduto}
                    onChange={(e) => setDescricaoProduto(e.target.value)}
                    placeholder="Descricao"
                    />

                    <input 
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    placeholder="URL Da Imagem"
                    />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        )
    }
}

export default CadastroProduto;