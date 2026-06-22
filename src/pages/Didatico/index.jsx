import { motion } from "framer-motion";

export default function Didatico({ setTela }) {

  const ferramentas = [
    "Livro Razão",
    "Diário",
    "DRE",
    "Ficha Controle",
    "Balanço"
  ];

  return (
    <div style={styles.bg}>

      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h1>Bons estudos 📚</h1>
        <p>Você terá acesso às seguintes ferramentas:</p>

        {/* LISTA ANIMADA */}
        <div>
          {ferramentas.map((f, i) => (
            <motion.p
              key={i}
              style={styles.item}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
            >
              ✅ {f}
            </motion.p>
          ))}
        </div>

        {/* BOTÃO */}
        <button
          onClick={() => setTela("painelDidatico")}
          style={styles.button}
        >
          Começar
        </button>

      </motion.div>

    </div>
  );
}

const styles = {
  bg: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },

  container: {
    textAlign: "center"
  },

  item: {
    margin: "8px 0",
    fontSize: "18px"
  },

  button: {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#16a34a",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }
};