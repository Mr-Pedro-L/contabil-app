import { useState, useRef } from "react";
import ToolsBar from "../../components/ToolsBar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PainelDidatico({ setTela, contas, setContas }) {

  const [showExport, setShowExport] = useState(false);
  const [selecionados, setSelecionados] = useState([]);
  const [opcao, setOpcao] = useState("imagem");

  const inputRefs = useRef([]);

  function adicionarConta() {
    setContas(prev => {
      const nova = [...prev, { nome: "", valor: 0 }];

      setTimeout(() => {
        const index = nova.length - 1;
        inputRefs.current[index]?.focus();
      }, 0);

      return nova;
    });
  }

  function removerConta(index) {
    const nova = contas.filter((_, i) => i !== index);
    setContas(nova);
  }

  // ✅ SALVAR SISTEMA
  function salvarSistema() {
    localStorage.setItem("contas", JSON.stringify(contas));
    alert("Dados salvos ✅");
  }

  function handleSelect(e) {
    const { value, checked } = e.target;

    if (checked) {
      setSelecionados([...selecionados, value]);
    } else {
      setSelecionados(selecionados.filter((item) => item !== value));
    }
  }

  async function capturarPainel(id) {

  const el = document.getElementById(id);

  if (!el) {
    alert(`Elemento ${id} não encontrado`);
    return null;
  }

  const canvas = await html2canvas(el);

  return canvas.toDataURL("image/png");
}

 async function salvarImagens() {

  const img = await capturarPainel("painel");

  if (!img) return;

  const link = document.createElement("a");

  link.href = img;

  link.download = "painel.png";

  link.click();
}

  async function gerarPDF() {

  const img = await capturarPainel("painel");

  if (!img) return;

  const pdf = new jsPDF();

  pdf.addImage(
    img,
    "PNG",
    10,
    10,
    180,
    100
  );

  pdf.save("painel.pdf");
}

  return (
    <div style={styles.bg}>

      <ToolsBar setTela={setTela} />

      <div style={styles.card}>

        <h2>Painel Didático</h2>

        {/* ✅ BOTÕES */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setShowExport(true)}>
            📤 Exportar
          </button>

          <button onClick={adicionarConta}>
            ➕ Adicionar Conta
          </button>

          <button onClick={salvarSistema}>
            💾 Salvar
          </button>
        </div>

        <div id="painel">

          {(contas || []).map((c, i) => (
            <div key={i} style={styles.linha}>

              <input
                ref={(el) => (inputRefs.current[i] = el)}
                placeholder="Conta"
                value={c.nome}
                onChange={(e) => {
                  const nova = [...contas];
                  nova[i].nome = e.target.value;
                  setContas(nova);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    adicionarConta();
                  }
                }}
              />

              <input
                type="number"
                placeholder="Valor"
                value={c.valor}
                onChange={(e) => {
                  const nova = [...contas];
                  nova[i].valor = Number(e.target.value);
                  setContas(nova);
                }}
              />

              <button onClick={() => removerConta(i)}>❌</button>

            </div>
          ))}

        </div>

      </div>

      {showExport && (
        <div style={styles.modal}>
          <div style={styles.modalCard}>

            <h3>Exportar</h3>

            <label>
  <input value="painel" type="checkbox" onChange={handleSelect} />
  Painel Didático
</label>
<br />

            <div style={{ marginTop: 10 }}>
              <label>
                <input
                  type="radio"
                  value="imagem"
                  checked={opcao === "imagem"}
                  onChange={(e) => setOpcao(e.target.value)}
                />
                Imagem
              </label>

              <label>
                <input
                  type="radio"
                  value="pdf"
                  checked={opcao === "pdf"}
                  onChange={(e) => setOpcao(e.target.value)}
                />
                PDF
              </label>
            </div>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => {
                  opcao === "imagem"
                    ? salvarImagens()
                    : gerarPDF();
                  setShowExport(false);
                }}
              >
                ✅ Confirmar
              </button>

              <button onClick={() => setShowExport(false)}>
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "#0f172a",
    padding: "120px 20px",
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
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    width: "300px"
  }
};