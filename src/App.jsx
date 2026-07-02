import { useState } from "react";
import Login from "./pages/Login";
import PainelDidatico from "./pages/Didatico/Painel";
import LivroRazao from "./pages/Didatico/LivroRazao";
import Diario from "./pages/Didatico/Diario";
import DRE from "./pages/Didatico/DRE";
import FichaControle from "./pages/Didatico/FichaControle";
import Balanco from "./pages/Didatico/Balanco";
import Admin from "./pages/Admin.jsx";

export default function App() {

  const [tela, setTela] = useState("login");

  // ✅ CARREGA AUTOMATICAMENTE
  const [contas, setContas] = useState(() => {
    const dados = localStorage.getItem("contas");
    return dados ? JSON.parse(dados) : [];
  });

  switch (tela) {

    case "admin":
      return <Admin setTela={setTela} />;

    case "login":
      return <Login setTela={setTela} />;

    case "painelDidatico":
      return (
        <PainelDidatico
          setTela={setTela}
          contas={contas}
          setContas={setContas}
        />
      );

    case "livroRazao":
      return (
        <LivroRazao
          setTela={setTela}
          contas={contas}
          setContas={setContas}
        />
      );

    case "diario":
      return (
        <Diario
          setTela={setTela}
          contas={contas}
          setContas={setContas}
        />
      );

    case "dre":
      return <DRE setTela={setTela} />;

    case "fichaControle":
      return <FichaControle setTela={setTela} />;

    case "balanco":
      return (
        <Balanco
          setTela={setTela}
          contas={contas}
        />
      );

    default:
      return <Login setTela={setTela} />;
  }
}
