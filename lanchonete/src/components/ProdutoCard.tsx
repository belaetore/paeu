import React from "react";
/*import "./ProdutoCard.css";*/

interface ProdutoCardProps {
    produto: {
        id: number; 
        nomeProduto: string;
        preco: number;
        descricaoProduto: string;
        imgUrl: string;
    };
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({produto}) => {
    return (
        <div className="produto-card">
            <img src={produto.imgUrl} alt="" />
            <h3>{produto.nomeProduto}</h3>
            <p>{produto.descricaoProduto}</p>
            <p>Preço: R${Number(produto.preco).toFixed(2)}</p>
        </div>
    )
}

export default ProdutoCard;