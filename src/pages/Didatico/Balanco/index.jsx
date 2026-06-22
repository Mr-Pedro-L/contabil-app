import { useState } from "react";
import ToolsBar from "../../../components/ToolsBar";

export default function Balanco({ setTela, contas }) {

  const [classificacao, setClassificacao] = useState({});

  function definirTipo(index, tipo) {
    setClassificacao({
      ...classificacao,
      [index]: tipo
    });
  }

  function total(tipo) {
    return (contas || [])
      .filter((c, i) => classificacao[i] === tipo)
      .reduce((s, c) => s + (c.valor || 0), 0);
  }

  const totalAtivo = total("ativo");
  const totalPassivo = total("passivo");
  const totalPL = total("pl");

  return (
    <div style={styles.bg}>

      <ToolsBar setTela={setTela} />

      <h2>Balanço Patrimonial</h2>

      <div style={styles.card}>

        {(contas || []).map((c, i) => (
          <div key={i} style={styles.linha}>

            <span>{c.nome}</span>

            <select
              value={classificacao[i] || ""}
              onChange={(e) =>
                definirTipo(i, e.target.value)
              }
            >
              <option value="">Selecionar</option>
              <option value="ativo">Ativo</option>
              <option value="passivo">Passivo</option>
              <option value="pl">Patrimônio Líquido</option>
            </select>

            <span>{c.valor}</span>

          </div>
        ))}

      </div>

      <div style={styles.balanco}>

        <div style={styles.col}>
          <h3>Ativo</h3>
          {(contas || []).map((c, i) =>
            classificacao[i] === "ativo" &&
              <p key={i}>{c.nome}: {c.valor}</p>
          )}
          <h4>Total: {totalAtivo}</h4>
        </div>

        <div style={styles.col}>
          <h3>Passivo + PL</h3>
          {(contas || []).map((c, i) =>
            (classificacao[i] === "passivo" ||
             classificacao[i] === "pl") &&
              <p key={i}>{c.nome}: {c.valor}</p>
          )}
          <h4>Total: {totalPassivo + totalPL}</h4>
        </div>

      </div>

      <div style={styles.result}>
        {totalAtivo === totalPassivo + totalPL
          ? "✅ Balanço fechado"
          : "❌ Balanço não fecha"}
      </div>

    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    paddingTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#0f172a",
    color: "white"
  },

  card: {
    width: "90%",
    maxWidth: "800px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px"
  },

  linha: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },

  balanco: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    width: "90%",
    maxWidth: "800px"
  },

  col: {
    flex: 1,
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px"
  },

  result: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold"
  }
};
