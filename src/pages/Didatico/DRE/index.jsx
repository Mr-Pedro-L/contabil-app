import { useState, useEffect } from "react";
import ToolsBar from "../../../components/ToolsBar";

export default function DRE({ setTela }) {

  const [categorias, setCategorias] = useState(() => {

  const dados = localStorage.getItem("dreCategorias");

  return dados
    ? JSON.parse(dados)
    : [
        { nome: "Receita Bruta", contas: [] },
        { nome: "Deduções", contas: [] },
        { nome: "Custo das Mercadorias", contas: [] },
        { nome: "Despesas Operacionais", contas: [] }
      ];

});
useEffect(() => {
  localStorage.setItem(
    "dreCategorias",
    JSON.stringify(categorias)
  );
}, [categorias]);

  function adicionarConta(index) {
    const nova = [...categorias];
    nova[index].contas.push({ nome: "", valor: 0 });
    setCategorias(nova);
  }

  function removerConta(catIndex, i) {
    const nova = [...categorias];
    nova[catIndex].contas.splice(i, 1);
    setCategorias(nova);
  }

  function atualizarConta(catIndex, i, campo, valor) {
    const nova = [...categorias];
    nova[catIndex].contas[i][campo] =
      campo === "valor" ? Number(valor) : valor;
    setCategorias(nova);
  }

  function totalCategoria(cat) {
    return (cat.contas || []).reduce((s, c) => s + (c.valor || 0), 0);
  }

  const receita = totalCategoria(categorias[0]);
  const deducoes = totalCategoria(categorias[1]);
  const custos = totalCategoria(categorias[2]);
  const despesas = totalCategoria(categorias[3]);

  const lucroBruto = receita - deducoes - custos;
  const lucroLiquido = lucroBruto - despesas;

  return (
    <div style={styles.bg}>

      <ToolsBar setTela={setTela} />

      <div style={styles.main}>

        {/* ✅ DRE */}
        <div style={styles.colDRE}>

          <h2>DRE (Resultado do Exercício)</h2>

          {categorias.map((cat, index) => (
            <div key={index} style={styles.card}>

              <input
                value={cat.nome}
                onChange={(e) => {
                  const nova = [...categorias];
                  nova[index].nome = e.target.value;
                  setCategorias(nova);
                }}
                style={styles.nomeCat}
              />

              {(cat.contas || []).map((c, i) => (
                <div key={i} style={styles.linha}>

                  <input
                    placeholder="Conta"
                    value={c.nome}
                    onChange={(e) =>
                      atualizarConta(index, i, "nome", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    value={c.valor}
                    onChange={(e) =>
                      atualizarConta(index, i, "valor", e.target.value)
                    }
                  />

                  {/* ✅ BOTÃO EXCLUIR */}
                  <button
                    onClick={() => removerConta(index, i)}
                    style={styles.deleteBtn}
                  >
                    ❌
                  </button>

                </div>
              ))}

              <button onClick={() => adicionarConta(index)}>
                + Conta
              </button>

              <div style={styles.total}>
                Total: {totalCategoria(cat)}
              </div>

            </div>
          ))}

          {/* RESULTADOS */}
          <div style={styles.resultado}>
            <p>Receita: {receita}</p>
            <p>Deduções: {deducoes}</p>
            <p>Custos: {custos}</p>

            <p><b>Lucro Bruto: {lucroBruto}</b></p>

            <p>Despesas: {despesas}</p>

            <h3 style={{
              color: lucroLiquido < 0 ? "red" : "#22c55e"
            }}>
              Lucro Líquido: {lucroLiquido}
            </h3>
          </div>

        </div>

        {/* ✅ INFO */}
        <div style={styles.info}>

          <h3>O que é DRE?</h3>

          <p>
            A DRE (Demonstração do Resultado do Exercício) mostra se a empresa teve lucro ou prejuízo.
          </p>

          <p>
            Ela parte da receita, desconta custos, despesas e impostos até chegar ao lucro líquido.
          </p>

          <p>
            É uma ferramenta essencial para análise financeira.
          </p>

        </div>

      </div>

    </div>
  );
}

const styles = {
 
bg: {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",   // ✅ centraliza tudo
  paddingTop: "120px",    // ✅ espaço pro ToolsBar
  background: "#0f172a",
  color: "white"
},

  main: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },

  colDRE: {
    flex: 2
  },

  info: {
    flex: 1,
    background: "#111",
    padding: "15px",
    borderRadius: "10px"
  },

  card: {
  background: "#le2a3d",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  maxWidth: "400px"
},

  linha: {
    display: "flex",
    gap: "10px",
    marginBottom: "5px",
    alignItems: "center"
  },

  nomeCat: {
    width: "100%",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  total: {
    marginTop: "10px",
    fontWeight: "bold"
  },

  resultado: {
    marginTop: "20px",
    background: "#111",
    padding: "15px",
    borderRadius: "10px"
  },

  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "red",
    cursor: "pointer"
  }
};