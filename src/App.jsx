import { useState } from "react";
import SaaSCheck from "./pages/SaaSCheck";
import Login from "./pages/Login";
import PainelDidatico from "./pages/Didatico/Painel";
import LivroRazao from "./pages/Didatico/LivroRazao";
import Diario from "./pages/Didatico/Diario";
import DRE from "./pages/Didatico/DRE";
import FichaControle from "./pages/Didatico/FichaControle";
import Balanco from "./pages/Didatico/Balanco";
import Admin from "./pages/Admin.jsx";



export default function App() {

  // ✅ começa no login
  const [tela, setTela] = useState("login");

  const [contas, setContas] = useState([]);

  

  switch (tela) {
    case "admin":
  return <Admin setTela={setTela} />;

case "saas":
  return <SaaSCheck setTela={setTela} />;

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
      return (
        <DRE
          setTela={setTela}
        />
      );

    case "fichaControle":
      return (
        <FichaControle
          setTela={setTela}
        />
      );

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