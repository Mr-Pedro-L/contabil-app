import { useState } from "react";

export default function Admin({ setTela, usuarios, setUsuarios }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar() {
    setUsuarios([...usuarios, { email, senha }]);
    setEmail("");
    setSenha("");
    alert("Contador criado!");
  }

  function excluir(index) {
    const novaLista = usuarios.filter((_, i) => i !== index);
    setUsuarios(novaLista);
  }

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h2>Painel do Admin</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
        />

        <button onClick={cadastrar} style={styles.button}>
          Criar Contador
        </button>

        <h3>Contadores:</h3>

        {usuarios.map((u, i) => (
          <div key={i}>
            <p>{u.email}</p>
            <button onClick={() => excluir(i)}>Excluir</button>
          </div>
        ))}

        <button onClick={() => setTela("login")}>
          Voltar
        </button>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111"
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px"
  },

  input: {
    display: "block",
    margin: "10px 0",
    padding: "10px"
  },

  button: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }
};
``