import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import type { User } from "../hooks/useAuth";

interface LoginProps {
    loginFn: (user: User) => void;
}

interface FormData{
    email: string;
    senha: string;
}

const Login: React.FC<LoginProps> = ({ loginFn }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSenha = () => setShowSenha((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await api.post("/usuario/login", {
            email: formData.email,
            senha: formData.senha
        });

        const user: User = res.data;
        if (!user) {
            alert("Email ou senha inválidos!");
            setLoading(false);
            return;
        }

        loginFn(user);
        localStorage.setItem("usuarioLogado", JSON.stringify(user));

        navigate("/");
    } catch(err: any){
        console.error(err);
        if (err.response?.status === 401){
            alert("Email ou senha inválidos");
        } else {
            alert ("Erro na autenticação. Tente novamente.");
        }
    } finally {
        setLoading(false);
    }
  }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit} className="form-container-register">
                <div className="top-parte-register">
                    <h1>Login</h1>
                </div>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

                <div className="senha-container">
                    <input type="senha" name="senha" placeholder="senha" value={formData.senha} onChange={handleChange} />
                        <button type="button" onClick={toggleSenha} className="btn-view-password">
                            {showSenha ? "Ocultar" : "Mostrar"}
                        </button>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Entrando...": "Entrar"}
                </button>

            <p className="register-link">
                Não tem uma conta?{""}
                <button type="button" onClick={() => navigate("/register")} className="btn-register">
                    Cadastre-se 
                </button>
            </p>
            </form>
        </div>
    );
  }


export default Login;