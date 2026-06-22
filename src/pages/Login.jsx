import { useState, useEffect } from "react";

export default function Login({ setTela }) {

  const [modo, setModo] = useState("login");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [usuarios, setUsuarios] = useState(() => {
    const dados = localStorage.getItem("usuarios");
    return dados ? JSON.parse(dados) : [];
  });

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  function logar() {

    const user = usuario.trim();
    const pass = senha.trim();

    localStorage.removeItem("usuarioLogadoTemp");

    // ✅ ADMIN
    if (user === "pedro" && pass === "1234") {
      setTela("admin");
      return;
    }

    // ✅ usuários normais
    const existe = usuarios.find(
      (u) => u.usuario === user && u.senha === pass
    );

    if (!existe) {
      alert("Usuário inválido ❌");
      return;
    }

    localStorage.setItem("usuarioLogadoTemp", user);
    setTela("saas");
  }

  function cadastrar() {
    const jaExiste = usuarios.find(
      (u) => u.usuario === usuario
    );

    if (jaExiste) {
      alert("Usuário já existe ❌");
      return;
    }

    setUsuarios([
      ...usuarios,
      { usuario, senha, ativo: true }
    ]);

    alert("Usuário cadastrado ✅");
    setModo("login");
  }

  return (
    <div style={styles.bg}>

      <div style={styles.card}>

        <h2>{modo === "login" ? "Login" : "Cadastro"}</h2>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {modo === "login" ? (
          <>
            <button onClick={logar}>Entrar</button>

            <p onClick={() => setModo("cadastro")}>
              Criar conta
            </p>
          </>
        ) : (
          <>
            <button onClick={cadastrar}>
              Cadastrar
            </button>

            <p onClick={() => setModo("login")}>
              Já tenho conta
            </p>
          </>
        )}

      </div>

    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white"
  },

  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};
``