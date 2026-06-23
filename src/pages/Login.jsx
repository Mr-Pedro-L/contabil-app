import { useState, useEffect } from "react";
import { supabase } from "../supabase";

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

  async function logar() {

  const user = usuario.trim();
  const pass = senha.trim();

  // ✅ ADMIN
  if (user === "pedro" && pass === "1234") {
    setTela("admin");
    return;
  }

  // ✅ verifica internet real
  if (!navigator.onLine) {
    validarOffline();
    return;
  }

  // ✅ consulta Supabase
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("usuario", user)
    .eq("senha", pass)
    .single();

  // ❌ erro real (não é offline)
  if (error || !data) {
    alert("Usuário inválido ❌");
    return;
  }

  // ✅ salva dados locais
  localStorage.setItem("usuarioLogado", user);
  localStorage.setItem("vencimentoLocal", data.vencimento);
  localStorage.setItem("ultimoOnline", new Date().toISOString());

  setTela("painelDidatico");
}
function validarOffline() {

  console.log("Modo offline ativado");

  const vencimentoLocal = localStorage.getItem("vencimentoLocal");
  const ultimoOnline = localStorage.getItem("ultimoOnline");

  if (!vencimentoLocal || !ultimoOnline) {
    alert("Sem acesso offline disponível ❌");
    return;
  }

  const hoje = new Date();
  const vencimento = new Date(vencimentoLocal);
  const ultimo = new Date(ultimoOnline);

  const diasOffline = (hoje - ultimo) / (1000 * 60 * 60 * 24);

  if (diasOffline > 7) {
    alert("Conecte à internet ❌");
    return;
  }

  if (hoje > vencimento) {
    alert("Plano vencido ❌");
    return;
  }

  setTela("painelDidatico");
}
  function cadastrar() {
    if (usuario === "pedro") {
      alert("Usuário reservado ❌");
      return;
    }

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
          style={styles.input}
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {modo === "login" ? (
          <>
            <button style={styles.button} onClick={logar}>
              Entrar
            </button>

            <p style={styles.link} onClick={() => setModo("cadastro")}>
              Criar conta
            </p>
          </>
        ) : (
          <>
            <button style={styles.button} onClick={cadastrar}>
              Cadastrar
            </button>

            <p style={styles.link} onClick={() => setModo("login")}>
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
    padding: "20px",
    background: "#0f172a",
    color: "white"
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "400px"
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none"
  },

  button: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer"
  },

  link: {
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center"
  }
};
