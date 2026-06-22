import ToolsBar from "../../components/ToolsBar";

export default function PainelDidatico({ setTela, contas, setContas }) {

  function adicionarConta() {
    setContas([...contas, { nome: "", valor: 0 }]);
  }

  function removerConta(index) {
    const nova = contas.filter((_, i) => i !== index);
    setContas(nova);
  }

  return (
    <div style={styles.bg}>

      <ToolsBar setTela={setTela} />

      <div style={styles.card}>
        <h2>Painel Didático</h2>

        <button onClick={adicionarConta}>+ Adicionar Conta</button>

        {(contas || []).map((c, i) => (
          <div key={i} style={styles.linha}>

            {/* SOMENTE NOME */}
            <input
              placeholder="Conta"
              value={c.nome}
              onChange={(e) => {
                const nova = [...contas];
                nova[i].nome = e.target.value;
                setContas(nova);
              }}
            />

            <button onClick={() => removerConta(i)}>❌</button>

          </div>
        ))}

      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "#0f172a",
    padding: "20px",
    color: "white"
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px"
  },
  linha: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  }
};
``