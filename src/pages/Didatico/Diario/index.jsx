import { useState, useEffect } from "react";
import ToolsBar from "../../../components/ToolsBar";

export default function Diario({ setTela }) {

  const [empresa, setEmpresa] = useState("Minha Empresa");

  // ✅ CARGA DIRETA (evita perda de dados)
  const [lancamentos, setLancamentos] = useState(() => {
    const dados = localStorage.getItem("diario");
    return dados ? JSON.parse(dados) : [];
  });

  // ✅ SALVA SEMPRE QUE MUDAR
  useEffect(() => {
    localStorage.setItem("diario", JSON.stringify(lancamentos));
  }, [lancamentos]);

  // ✅ NOVO LANÇAMENTO
  function adicionarLancamento() {
    setLancamentos([
      ...lancamentos,
      {
        data: "",
        descricao: "",
        debitos: [{ conta: "", valor: 0 }],
        creditos: [{ conta: "", valor: 0 }],
        correcoes: []
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

  // 🔴 CORREÇÃO QUE REMOVE DO VALOR
  function aplicarCorrecao(indexL, tipo, indexLinha) {
    const nome = prompt("Nome (ex: ICMS)");
    const percentual = Number(prompt("Percentual (%)"));

    if (!nome || isNaN(percentual)) return;

    const nova = [...lancamentos];
    const linha = nova[indexL][tipo][indexLinha];

    const valorOriginal = linha.valor;
    const desconto = valorOriginal * (percentual / 100);

    linha.valor = valorOriginal - desconto;

    nova[indexL].correcoes.push({
      nome,
      percentual,
      valor: desconto,
      tipo: "desconto"
    });

    setLancamentos(nova);
  }

  // 🟢 CORREÇÃO QUE SÓ EXTRAI
  function extrairPercentual(indexL, tipo, indexLinha) {
    const nome = prompt("Nome (ex: ICMS)");
    const percentual = Number(prompt("Percentual (%)"));

    if (!nome || isNaN(percentual)) return;

    const nova = [...lancamentos];
    const linha = nova[indexL][tipo][indexLinha];

    const valorOriginal = linha.valor;
    const extraido = valorOriginal * (percentual / 100);

    nova[indexL].correcoes.push({
      nome,
      percentual,
      valor: extraido,
      tipo: "extraido"
    });

    setLancamentos(nova);
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

      <button onClick={adicionarLancamento}>
        ➕ Novo Lançamento
      </button>

      {lancamentos.map((l, index) => {

        const debTotal = total(l, "debitos");
        const credTotal = total(l, "creditos");

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

            {/* DÉBITOS */}
            <h4>Débitos</h4>
            {l.debitos.map((d, i) => (
              <div key={i} style={styles.linha}>

                <input
                  placeholder="Conta"
                  value={d.conta}
                  onChange={(e) =>
                    atualizarLinha(index, "debitos", i, "conta", e.target.value)
                  }
                />

                <input
                  type="number"
                  value={d.valor}
                  onChange={(e) =>
                    atualizarLinha(index, "debitos", i, "valor", e.target.value)
                  }
                  style={{ color: "blue" }}
                />

                <button onClick={() => aplicarCorrecao(index, "debitos", i)}>
                  -%
                </button>

                <button onClick={() => extrairPercentual(index, "debitos", i)}>
                  %
                </button>

              </div>
            ))}
            <button onClick={() => adicionarLinha(index, "debitos")}>
              + Débito
            </button>

            {/* CRÉDITOS */}
            <h4>Créditos</h4>
            {l.creditos.map((c, i) => (
              <div key={i} style={styles.linha}>

                <input
                  placeholder="Conta"
                  value={c.conta}
                  onChange={(e) =>
                    atualizarLinha(index, "creditos", i, "conta", e.target.value)
                  }
                />

                <input
                  type="number"
                  value={c.valor}
                  onChange={(e) =>
                    atualizarLinha(index, "creditos", i, "valor", e.target.value)
                  }
                  style={{ color: "red" }}
                />

                <button onClick={() => aplicarCorrecao(index, "creditos", i)}>
                  -%
                </button>

                <button onClick={() => extrairPercentual(index, "creditos", i)}>
                  %
                </button>

              </div>
            ))}
            <button onClick={() => adicionarLinha(index, "creditos")}>
              + Crédito
            </button>

            {/* VALIDAÇÃO */}
            <div style={{
              fontWeight: "bold",
              color: podeSalvar(l) ? "#22c55e" : "red"
            }}>
              Débitos: {debTotal} | Créditos: {credTotal}
            </div>

            {/* AÇÕES */}
            <div style={styles.actions}>
              <button onClick={() => removerLancamento(index)}>
                ❌ Excluir
              </button>

              <button
                disabled={!podeSalvar(l)}
                onClick={() => alert("Lançamento salvo ✅")}
              >
                💾 Salvar
              </button>
            </div>

            {/* HISTÓRICO DE CORREÇÕES */}
            {l.correcoes.map((c, i) => (
              <div key={i} style={styles.correction}>
                {c.tipo === "extraido"
                  ? `${c.nome} (${c.percentual}%) = +${c.valor.toFixed(2)}`
                  : `${c.nome} (-${c.percentual}%) = -${c.valor.toFixed(2)}`
                }
              </div>
            ))}

          </div>
        );
      })}

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

  empresa: {
    display: "block",
    marginBottom: "20px",
    fontSize: "20px",
    padding: "10px",
    borderRadius: "10px",
    border: "2px solid #22c55e",
    boxShadow: "0 0 10px #22c55e"
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },

  linha: {
    display: "flex",
    gap: "10px",
    marginBottom: "5px"
  },

  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  },

  correction: {
    marginTop: "5px",
    fontSize: "12px",
    fontWeight: "bold"
  }
};
``