import { useState, useEffect } from "react";
import ToolsBar from "../components/ToolsBar";

export default function Admin({ setTela }) {

  const [usuarios, setUsuarios] = useState(() => {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  });

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  function adicionarUsuario() {
    const usuario = prompt("Email:");
    const senha = prompt("Senha:");

    if (!usuario || !senha) return;

    setUsuarios([
      ...usuarios,
      { usuario, senha, ativo: true }
    ]);
  }

  function toggleAtivo(index) {
    const nova = [...usuarios];
    nova[index].ativo = !nova[index].ativo;
    setUsuarios(nova);
  }

  function remover(index) {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  }

  return (
    <div style={styles.bg}>

      <ToolsBar setTela={setTela} />

      <h1 style={styles.titulo}>⚡ Painel Admin</h1>

      <button onClick={adicionarUsuario} style={styles.addBtn}>
        ➕ Novo Cliente
      </button>

      <div style={styles.lista}>

        {usuarios.length === 0 && (
          <p>Nenhum usuário cadastrado</p>
        )}

        {usuarios.map((u, i) => (
          <div key={i} style={styles.card}>

            <div>
              <h3>{u.usuario}</h3>
              <p style={styles.senha}>Senha: {u.senha}</p>

              <p style={{
                color: u.ativo ? "#22ff88" : "#ff4444",
                fontWeight: "bold"
              }}>
                {u.ativo ? "ATIVO ✅" : "BLOQUEADO ❌"}
              </p>
            </div>

            <div style={styles.actions}>
              <button onClick={() => toggleAtivo(i)} style={styles.toggle}>
                {u.ativo ? "Bloquear" : "Liberar"}
              </button>

              <button onClick={() => remover(i)} style={styles.delete}>
                ❌
              </button>
            </div>

          </div>
        ))}

     
      </div>

    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    padding: "100px 20px",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    color: "white"
  },

  titulo: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#22c55e",
    textShadow: "0 0 10px #22c55e"
  },

  addBtn: {
    display: "block",
    margin: "0 auto 20px",
    padding: "10px 20px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 0 10px #22c55e"
  },

  lista: {
    maxWidth: "800px",
    margin: "auto"
  },


card: {
  background: "#le2a3d",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  maxWidth: "400px"
},



  senha: {
    fontSize: "12px",
    color: "#aaa"
  },

  actions: {
    display: "flex",
    gap: "10px"
  },

  toggle: {
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    background: "#22c55e",
    cursor: "pointer"
  },

  delete: {
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    background: "#ff4444",
    cursor: "pointer"
  }
};