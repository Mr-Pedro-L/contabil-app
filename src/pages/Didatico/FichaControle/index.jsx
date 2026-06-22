import { useState, useEffect } from "react";
import ToolsBar from "../../../components/ToolsBar";

export default function FichaControle({ setTela }) {

  const [mercadoria, setMercadoria] = useState("Produto");
  
  const [linhas, setLinhas] = useState(() => {
    const dados = localStorage.getItem("ficha");
    return dados ? JSON.parse(dados) : [];
  });

  useEffect(() => {
    localStorage.setItem("ficha", JSON.stringify(linhas));
  }, [linhas]);

  function adicionarLinha() {
    setLinhas([
      ...linhas,
      {
        data: "",
        historico: "",
        entradaQtd: 0,
        entradaCusto: 0,
        saidaQtd: 0,
        saidaCusto: 0
      }
    ]);
  }

  function removerLinha(index) {
    setLinhas(linhas.filter((_, i) => i !== index));
  }

  function atualizar(index, campo, valor) {
    const nova = [...linhas];
    nova[index][campo] = Number.isNaN(Number(valor))
      ? valor
      : Number(valor);
    setLinhas(nova);
  }

  return (
    <div style={styles.bg}>

      <ToolsBar setTela={setTela} />

      <h2>FICHA DE CONTROLE DE ESTOQUE</h2>

      {/* MERCADORIA */}
      <input
        value={mercadoria}
        onChange={(e) => setMercadoria(e.target.value)}
        style={styles.mercadoria}
      />

      {/* BOTÕES */}
      <div style={styles.topBar}>
        <button onClick={adicionarLinha}>➕ Adicionar</button>
        <button onClick={() => alert("Salvo ✅")}>💾 Salvar</button>
      </div>

      {/* TABELA */}
      <div style={styles.tabela}>

        {/* CABEÇALHO */}
        <div style={styles.header}>

          <span>Data</span>
          <span>Histórico</span>

          <span>Qtd</span>
          <span>Custo Unit</span>
          <span>Total</span>

          <span>Qtd</span>
          <span>Custo Unit</span>
          <span>Total</span>

          <span>Qtd</span>
          <span>Custo Unit</span>
          <span>Total</span>

          <span>Ação</span>
        </div>

        {/* LINHAS */}
        {linhas.map((l, i) => {

          // 🔵 ENTRADA
          const entradaTotal = l.entradaQtd * l.entradaCusto;

          // 🔴 SAÍDA
          const saidaTotal = l.saidaQtd * l.saidaCusto;

          // 🟢 SALDO ACUMULADO
          const anterior = linhas.slice(0, i).reduce((acc, linha) => {
            return {
              qtd:
                acc.qtd +
                linha.entradaQtd -
                linha.saidaQtd,
              valor:
                acc.valor +
                linha.entradaQtd * linha.entradaCusto -
                linha.saidaQtd * linha.saidaCusto
            };
          }, { qtd: 0, valor: 0 });

          const saldoQtd =
            anterior.qtd + l.entradaQtd - l.saidaQtd;

          const saldoValor =
            anterior.valor + entradaTotal - saidaTotal;

          const custoMedio =
            saldoQtd !== 0 ? saldoValor / saldoQtd : 0;

          const saldoTotal = saldoQtd * custoMedio;

          return (
            <div key={i} style={styles.row}>

              <input
                type="date"
                value={l.data}
                onChange={(e) =>
                  atualizar(i, "data", e.target.value)
                }
              />

              <input
                value={l.historico}
                onChange={(e) =>
                  atualizar(i, "historico", e.target.value)
                }
              />

              {/* ENTRADA */}
              <input
                type="number"
                value={l.entradaQtd}
                onChange={(e) =>
                  atualizar(i, "entradaQtd", e.target.value)
                }
              />

              <input
                type="number"
                value={l.entradaCusto}
                onChange={(e) =>
                  atualizar(i, "entradaCusto", e.target.value)
                }
              />

              <div>{entradaTotal}</div>

              {/* SAÍDA */}
              <input
                type="number"
                value={l.saidaQtd}
                onChange={(e) =>
                  atualizar(i, "saidaQtd", e.target.value)
                }
              />

              <input
                type="number"
                value={l.saidaCusto}
                onChange={(e) =>
                  atualizar(i, "saidaCusto", e.target.value)
                }
              />

              <div>{saidaTotal}</div>

              {/* SALDO */}
              <div>{saldoQtd}</div>
              <div>{custoMedio.toFixed(2)}</div>
              <div>{saldoTotal.toFixed(2)}</div>

              <button onClick={() => removerLinha(i)}>
                ❌
              </button>

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
    padding: "20px",
    paddingTop: "80px",
    background: "#0f172a",
    color: "white"
  },

  mercadoria: {
    marginBottom: "20px",
    padding: "10px",
    fontSize: "16px"
  },

  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  tabela: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  header: {
    display: "grid",
    gridTemplateColumns:
      "120px 180px repeat(9, 90px) 80px",
    fontWeight: "bold",
    background: "#1e293b",
    padding: "10px"
  },

  row: {
    display: "grid",
    gridTemplateColumns:
      "120px 180px repeat(9, 90px) 80px",
    gap: "5px",
    padding: "14px", // ✅ MAIS ESPAÇADO
    background: "#1e293b",
    borderRadius: "6px"
  }
};