import { useState, useEffect } from "react";
import ToolsBar from "../../../components/ToolsBar";

export default function Balanco({ setTela, contas }) {

 const [classificacao, setClassificacao] = useState(() => {
  const dados = localStorage.getItem("classificacaoBalanco");
  return dados ? JSON.parse(dados) : {};
});
useEffect(() => {
  localStorage.setItem(
    "classificacaoBalanco",
    JSON.stringify(classificacao)
  );
}, [classificacao]);

  function definirTipo(i, tipo) {
    setClassificacao({ ...classificacao, [i]: tipo });
  }
function saldoConta(conta) {

  const movs = conta.movimentos || [];

  const debitos = movs
    .filter(m => m.tipo === "debito")
    .reduce((s, m) => s + Number(m.valor || 0), 0);

  const creditos = movs
    .filter(m => m.tipo === "credito")
    .reduce((s, m) => s + Number(m.valor || 0), 0);

  return (conta.valor || 0) + debitos - creditos;
}

  function total(tipo) {
  return contas
    .filter((c, i) => classificacao[i] === tipo)
    .reduce((s, c) => s + saldoConta(c), 0);
}

  const ativo = total("ativo");
  const passivo = total("passivo");
  const pl = total("pl");

  return (
    <div style={styles.bg}>

      <ToolsBar setTela={setTela} />

      <h2>📊 Balanço Patrimonial</h2>

      <div style={styles.lista}>

        {contas.map((c, i) => (
          <div key={i} style={styles.linha}>

            <span>{c.nome}</span>

            <select
              value={classificacao[i] || ""}
              onChange={(e) =>
                definirTipo(i, e.target.value)
              }
            >
              <option value="">Tipo</option>
              <option value="ativo">Ativo</option>
              <option value="passivo">Passivo</option>
              <option value="pl">PL</option>
            </select>

            <span style={styles.valor}>
  R$ {saldoConta(c)}
</span>

          </div>
        ))}

      </div>

      <div id="balanco" style={styles.grid}>

        <div style={styles.box}>
          <h3>Ativo</h3>
          {contas.map((c, i) =>
            classificacao[i] === "ativo" && (
              <p key={i}>
  {c.nome} - R$ {saldoConta(c)}
</p>
            )
          )}
          <strong>Total: {ativo}</strong>
        </div>

        <div style={styles.box}>
          <h3>Passivo + PL</h3>
          {contas.map((c, i) =>
            (classificacao[i] === "passivo" ||
             classificacao[i] === "pl") && (
              <p key={i}>
  {c.nome} - R$ {saldoConta(c)}
</p>
            )
          )}
          <strong>Total: {passivo + pl}</strong>
        </div>

      </div>

      <div style={styles.result}>
        {ativo === passivo + pl
          ? "✅ Fechado"
          : "❌ Não fecha"}
      </div>

    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "20px"
  },
  lista: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px"
  },
  linha: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #334155"
  },
  valor: {
    color: "#22c55e",
    fontWeight: "bold"
  },
  grid: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },
  box: {
    flex: 1,
    background: "#020617",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px #22c55e33"
  },
  result: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold"
  }
};