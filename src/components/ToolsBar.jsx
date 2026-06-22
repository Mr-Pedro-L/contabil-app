export default function ToolsBar({ setTela }) {
  return (
    <div style={styles.bar}>

      <button onClick={() => setTela("painelDidatico")}>🧠 Painel</button>
      <button onClick={() => setTela("livroRazao")}>📘 Livro Razão</button>
      <button onClick={() => setTela("diario")}>📓 Diário</button>
      <button onClick={() => setTela("dre")}>📊 DRE</button>
      <button onClick={() => setTela("fichaControle")}>📋 Ficha</button>
      <button onClick={() => setTela("balanco")}>🏦 Balanço</button>

      <button onClick={() => {
  localStorage.removeItem("usuarioLogado");
  localStorage.removeItem("usuarioLogadoTemp"); importante
  setTela("login");
}}>
  🚪 Sair
</button>

    </div>
  );
}

const styles = {
  bar: {
    width: "100%",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    background: "#0f172a",
    borderBottom: "1px solid #1e293b"
  }
};
