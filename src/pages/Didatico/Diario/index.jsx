import { useState, useEffect } from "react";
import ToolsBar from "../../../components/ToolsBar";

export default function Diario({ setTela, contas }) {

  const [empresa, setEmpresa] = useState("Minha Empresa");

  const [lancamentos, setLancamentos] = useState(() => {
    const dados = localStorage.getItem("diario");
    return dados ? JSON.parse(dados) : [];
  });

  // ✅ CALCULADORA %
  const [valorCalc, setValorCalc] = useState("");
  const [percCalc, setPercCalc] = useState("");
  const [resultadoCalc, setResultadoCalc] = useState(null);

  useEffect(() => {
    localStorage.setItem("diario", JSON.stringify(lancamentos));
  }, [lancamentos]);

  function calcularPercentual() {
    if (!valorCalc || !percCalc) return;
    const res = (Number(valorCalc) * Number(percCalc)) / 100;
    setResultadoCalc(res.toFixed(2));
  }

  function adicionarLancamento() {
    setLancamentos([
      ...lancamentos,
      {
        data: "",
        descricao: "",
        debitos: [{ conta: "", valor: 0 }],
        creditos: [{ conta: "", valor: 0 }]
      }
    ]);
  }

  function removerLancamento(index) {
    setLancamentos(lancamentos.filter((_, i) => i !== index));
  }

  function adicionarLinha(index, tipo) {
    const nova = [...lancamentos];
    nova[index][tipo].push({ conta: "", valor: 0 });
    setLancamentos(nova);
  }

  function removerLinha(indexL, tipo, i) {
    const nova = [...lancamentos];
    nova[indexL][tipo] = nova[indexL][tipo].filter((_, idx) => idx !== i);
    setLancamentos(nova);
  }

  function atualizarLinha(indexL, tipo, i, campo, valor) {
    const nova = [...lancamentos];
    nova[indexL][tipo][i][campo] =
      campo === "valor" ? Number(valor) : valor;
    setLancamentos(nova);
  }

  function total(l, tipo) {
    return l[tipo].reduce((s, x) => s + (x.valor || 0), 0);
  }

  function podeSalvar(l) {
    return total(l, "debitos") === total(l, "creditos");
  }

  return (
    <div style={styles.bg}>

      <ToolsBar setTela={setTela} />

      {/* EMPRESA */}
      <input
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        style={styles.empresa}
      />

      {/* ✅ CALCULADORA */}
      <div style={styles.calc}>
        <h3>🧮 Calculadora %</h3>

        <input
          type="number"
          placeholder="Valor"
          value={valorCalc}
          onChange={(e) => setValorCalc(e.target.value)}
        />

        <input
          type="number"
          placeholder="%"
          value={percCalc}
          onChange={(e) => setPercCalc(e.target.value)}
        />

        <button onClick={calcularPercentual}>Calcular</button>

        {resultadoCalc && (
          <p style={styles.result}>
            Resultado: {resultadoCalc}
          </p>
        )}
      </div>

      <button onClick={adicionarLancamento}>
        ➕ Novo Lançamento
      </button>

      {lancamentos.map((l, index) => {

        const deb = total(l, "debitos");
        const cred = total(l, "creditos");

        return (
          <div key={index} style={styles.card}>

            <input
              type="date"
              value={l.data}
              onChange={(e) => {
                const nova = [...lancamentos];
                nova[index].data = e.target.value;
                setLancamentos(nova);
              }}
            />

            <input
              placeholder="Descrição"
              value={l.descricao}
              onChange={(e) => {
                const nova = [...lancamentos];
                nova[index].descricao = e.target.value;
                setLancamentos(nova);
              }}
            />

            {/* ✅ DÉBITOS */}
            <h4 style={{ color: "#3b82f6" }}>Débitos</h4>

            {l.debitos.map((d, i) => (
              <div key={i} style={styles.linha}>

                <select
                  value={d.conta}
                  onChange={(e) =>
                    atualizarLinha(index, "debitos", i, "conta", e.target.value)
                  }
                >
                  <option value="">Conta</option>

                  {(contas || []).map((c, idx) => (
                    <option key={idx} value={c.nome}>
                      {c.nome}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={d.valor}
                  onChange={(e) =>
                    atualizarLinha(index, "debitos", i, "valor", e.target.value)
                  }
                />

                <button onClick={() => removerLinha(index, "debitos", i)}>
                  ❌
                </button>

              </div>
            ))}

            <button onClick={() => adicionarLinha(index, "debitos")}>
              + Débito
            </button>

            {/* ✅ CRÉDITOS */}
            <h4 style={{ color: "#ef4444" }}>Créditos</h4>

            {l.creditos.map((c, i) => (
              <div key={i} style={styles.linha}>

                <select
                  value={c.conta}
                  onChange={(e) =>
                    atualizarLinha(index, "creditos", i, "conta", e.target.value)
                  }
                >
                  <option value="">Conta</option>

                  {(contas || []).map((c2, idx) => (
                    <option key={idx} value={c2.nome}>
                      {c2.nome}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={c.valor}
                  onChange={(e) =>
                    atualizarLinha(index, "creditos", i, "valor", e.target.value)
                  }
                />

                <button onClick={() => removerLinha(index, "creditos", i)}>
                  ❌
                </button>

              </div>
            ))}

            <button onClick={() => adicionarLinha(index, "creditos")}>
              + Crédito
            </button>

            {/* ✅ VALIDAÇÃO */}
            <div style={{
              fontWeight: "bold",
              color: podeSalvar(l) ? "#22c55e" : "red"
            }}>
              Débitos: {deb} | Créditos: {cred}
            </div>

            {/* ✅ AÇÕES */}
            <div style={styles.actions}>
              <button onClick={() => removerLancamento(index)}>
                ❌ Excluir
              </button>

              <button disabled={!podeSalvar(l)}>
                💾 Salvar
              </button>
            </div>

          </div>
        );
      })}

    </div>
  );
}

const styles = {

  bg: {
    minHeight: "100vh",
    padding: "120px 20px",
    background: "#0f172a",
    color: "white"
  },

  empresa: {
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "10px",
    border: "2px solid #22c55e"
  },

  calc: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  result: {
    color: "#22c55e",
    fontWeight: "bold"
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "15px"
  },

  linha: {
    display: "flex",
    gap: "10px",
    margin: "5px 0"
  },

  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  }
};