export default function ToolsBar({ setTela }) {
  return (
    <div style={styles.bar}>
      <button onClick={() => {
  localStorage.removeItem("usuarioLogado");
  setTela("login");
}}>
  🚪 Sair
</button>

      <button onClick={() => setTela("painelDidatico")}>
        🧠 Painel
      </button>

      <button onClick={() => setTela("livroRazao")}>
        📘 Livro Razão
      </button>

      <button onClick={() => setTela("diario")}>
        📓 Diário
      </button>

      <button onClick={() => setTela("dre")}>
        📊 DRE
      </button>

      <button onClick={() => setTela("fichaControle")}>
        📋 Ficha Controle
      </button>

<button onClick={() => setTela("balanco")}>
  🏦 Balanço
</button>

      

    </div>
  );
}

const styles = {
  bar: {
    width: "100%",
    position: "fixed", // ✅ NÃO empurra layout
    top: 0,
    left: 0,
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    background: "#0f172a",
    borderBottom: "2px solid #1e293b",
    zIndex: 1000
  }
};