export default function Dashboard({ setTela }) {
  return (
    <div style={styles.bg}>
      <div style={styles.container}>

        <div style={styles.card}>
          <h2>Modo Didático</h2>
          <p>Resolver exercícios e estudar contabilidade</p>

          <button onClick={() => setTela("didatico")} style={styles.button}>
            Entrar
          </button>
        </div>

        <div style={styles.card}>
          <h2>Modo Profissional</h2>
          <p>Ferramentas empresariais completas</p>

          <button style={{ ...styles.button, background: "gray" }}>
            Em breve
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  bg: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a"
  },
  container: {
    display: "flex",
    gap: "40px"
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center"
  },
  button: {
    padding: "10px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px"
  }
};
``