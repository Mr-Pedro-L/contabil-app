import ToolsBar from "../../../components/ToolsBar";

export default function LivroRazao({ setTela, contas, setContas }) {

  function adicionarMov(indexConta, tipo) {
    const nova = [...contas];

    if (!nova[indexConta].movimentos) {
      nova[indexConta].movimentos = [];
    }

    nova[indexConta].movimentos.push({
      tipo: tipo,
      valor: 0
    });

    setContas(nova);
  }

  function atualizarMov(indexConta, indexMov, valor) {
    const nova = [...contas];
    nova[indexConta].movimentos[indexMov].valor = Number(valor);
    setContas(nova);
  }

  function removerMov(indexConta, indexMov) {
    const nova = [...contas];
    nova[indexConta].movimentos.splice(indexMov, 1);
    setContas(nova);
  }

  return (
    <div style={styles.bg}>
      <div style={styles.container}>

        <ToolsBar setTela={setTela} />

        <h2>Livro Razão</h2>

        {(contas || []).map((conta, i) => {

          const movs = conta.movimentos || [];

          const debitos = movs.filter(m => m.tipo === "debito");
          const creditos = movs.filter(m => m.tipo === "credito");

          const totalD = debitos.reduce((s, m) => s + m.valor, 0);
          const totalC = creditos.reduce((s, m) => s + m.valor, 0);

          const saldo = totalD - totalC;

          return (
            <div key={i} style={styles.conta}>

              <h3>{conta.nome || "Conta"}</h3>

              <div style={styles.T}>

                {/* DÉBITO */}
                <div style={styles.coluna}>
                  {debitos.map((m, idx) => {
                    const indexReal = movs.findIndex(x => x === m);

                    return (
                      <div key={idx} style={styles.linhaItem}>
                        <input
                          type="number"
                          value={m.valor}
                          onChange={(e) =>
                            atualizarMov(i, indexReal, e.target.value)
                          }
                          style={styles.debito}
                        />

                        <button
                          onClick={() => removerMov(i, indexReal)}
                          style={styles.deleteBtn}
                        >
                          ❌
                        </button>
                      </div>
                    );
                  })}

                  <button onClick={() => adicionarMov(i, "debito")}>
                    + Débito
                  </button>
                </div>

                {/* DIVISOR */}
                <div style={styles.divisor}></div>

                {/* CRÉDITO */}
                <div style={styles.coluna}>
                  {creditos.map((m, idx) => {
                    const indexReal = movs.findIndex(x => x === m);

                    return (
                      <div key={idx} style={styles.linhaItem}>
                        <input
                          type="number"
                          value={m.valor}
                          onChange={(e) =>
                            atualizarMov(i, indexReal, e.target.value)
                          }
                          style={styles.credito}
                        />

                        <button
                          onClick={() => removerMov(i, indexReal)}
                          style={styles.deleteBtn}
                        >
                          ❌
                        </button>
                      </div>
                    );
                  })}

                  <button onClick={() => adicionarMov(i, "credito")}>
                    + Crédito
                  </button>
                </div>

              </div>

              {/* SALDO */}
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: saldo < 0 ? "red" : "#22c55e"
                }}
              >
                Saldo: {saldo}
              </div>

            </div>
          );
        })}

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

  container: {
    maxWidth: "900px",
    margin: "auto"
  },

  conta: {
    background: "#1e293b",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px"
  },

  T: {
    display: "flex",
    justifyContent: "space-between"
  },

  coluna: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  divisor: {
    width: "2px",
    background: "white"
  },

  linhaItem: {
    display: "flex",
    gap: "5px",
    alignItems: "center"
  },

  debito: {
    color: "blue"
  },

  credito: {
    color: "red"
  },

  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "red",
    cursor: "pointer"
  }
};