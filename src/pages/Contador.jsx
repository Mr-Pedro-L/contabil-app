import { useState } from "react";

export default function Contador({ setTela, usuarios }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function login() {
    const user = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

   if (user) {
  setTela("dashboard");
} else {
  alert("Email ou senha incorretos");
}
  }

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h2>Login do Contador</h2>

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

        <button onClick={login} style={styles.button}>
          Entrar
        </button>

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
    background: "purple",
    color: "white",
    border: "none"
  }
};