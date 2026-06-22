export default function SaaSCheck({ setTela }) {

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = localStorage.getItem("usuarioLogadoTemp");

  const existe = usuarios.find((u) => u.usuario === usuario);

  // ✅ se existe e está ativo → entra no sistema
  if (existe && existe.ativo) {
  setTimeout(() => setTela("painelDidatico"), 0);
  return null;
}

  return (
    <div style={styles.bg}>

      <div style={styles.card}>
        <h2>🚫 Acesso Bloqueado</h2>

        <p>
          Seu acesso está inativo ou pagamento pendente.
        </p>

        <button onClick={() => setTela("login")}>
          Voltar
        </button>
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
    textAlign: "center"
  }
};