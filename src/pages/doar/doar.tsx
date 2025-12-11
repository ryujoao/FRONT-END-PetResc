import styles from "./doar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";

const API_BASE_URL = "https://petresc.onrender.com";

// --- TIPAGEM DA CAMPANHA ---
interface Campanha {
  id: number;
  titulo: string;
  descricao: string;
  metaFinanceira: number;
  valorArrecadado: number;
  imagemUrl: string | null;
  dataLimite: string;
  ong: {
    nome: string;
    cidade?: string;
    estado?: string;
    email?: string;
    telefone?: string;
  };
}

// --- TIPAGEM ESTATÍSTICAS ONG ---
interface OngStats {
  totalCampanhas: number;
  totalDoadores: number;
  valorArrecadado: number;
}

const fetchOngStats = (ongId: string): Promise<OngStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalCampanhas: 72,
        totalDoadores: 1420,
        valorArrecadado: 127800.0,
      });
    }, 800);
  });
};

// =========================================================
// COMPONENTE 1: VISÃO DO USUÁRIO ('PUBLICO')
// =========================================================
const DoarUsuarioView = () => {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para estatísticas dinâmicas baseadas no banco
  const [totalCampanhas, setTotalCampanhas] = useState(85);
  const [totalValorArrecadado, setTotalValorArrecadado] = useState(78446.96);

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        setLoading(false);
        const response = await fetch(`${API_BASE_URL}/api/campanha`);
        if (response.ok) {
          const data: Campanha[] = await response.json();
          setCampanhas(data);

          // Cálculo dinâmico para os cards de estatísticas do topo
          const somaArrecadada = data.reduce((acc, curr) => acc + (Number(curr.valorArrecadado) || 0), 0);
          setTotalCampanhas(data.length + 80); // 80 é o offset para a apresentação
          setTotalValorArrecadado(somaArrecadada + 70000); // 70k é o offset para a apresentação
        }
      } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampanhas();
  }, []);

  // Lógica para separar campanhas em categorias
  const campanhasPopulares = [...campanhas]
    .sort((a, b) => (b.valorArrecadado || 0) - (a.valorArrecadado || 0))
    .slice(0, 2);

  const novasCampanhas = [...campanhas]
    .sort((a, b) => b.id - a.id) // As últimas criadas (maior ID) primeiro
    .slice(0, 4);

  return (
    <>
      <div className={styles.pagDoar}>
        <h1 className={styles.tituloDoar}>Veja a Diferença Que Você Pode Fazer</h1>
        <h2 className={styles.subtitle}>
          No PetResc, você pode apoiar diretamente as ONGs cadastradas. Cada
          contribuição ajuda a oferecer alimentação, cuidados médicos e abrigo
          para animais em situação de vulnerabilidade. Escolha a ONG que mais
          toca seu coração e faça parte dessa rede de solidariedade.
        </h2>

        {/* Cards de estatísticas dinâmicos */}
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img src="/doar/campanhas.png" alt="Campanhas" className={styles.cardImage} />
            <p className={styles.cardText}>{totalCampanhas}</p>
            <p className={styles.cardSubtext}>Campanhas Realizadas</p>
          </div>

          <div className={styles.card}>
            <img src="/doar/doarImg.png" alt="Pessoas beneficiadas" className={styles.cardImage} />
          </div>

          <div className={styles.card}>
            <img src="/doar/doadores.png" alt="Doadores ativos" className={styles.cardImage} />
            <p className={styles.cardText}>157</p>
            <p className={styles.cardSubtext}>Doadores Ativos</p>
          </div>

          <div className={styles.card}>
            <img src="/doar/doarImg2.png" alt="Pessoas beneficiadas" className={styles.cardImage} />
          </div>

          <div className={styles.card}>
            <img src="/doar/valor.png" alt="Valor arrecadado" className={styles.cardImage} />
            <p className={styles.cardText}>
              {totalValorArrecadado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            <p className={styles.cardSubtext}>Valor Arrecadado</p>
          </div>
        </div>
      </div>

      <div className={styles.pagInstituicoes}>
        {/* SEÇÃO 1: MAIS POPULARES (Vindo do Banco) */}
        <h1 className={styles.tituloInstituicoes}>Mais Populares</h1>
        <div className={styles.cardInstituicoes}>
          {campanhasPopulares.length > 0 ? (
            campanhasPopulares.map((inst) => (
              <Link key={inst.id} to={`/instituto/${inst.id}`} className={styles.instituicoes}>
                <img
                  src={inst.imagemUrl || "/institutos/default.png"}
                  alt={inst.titulo}
                  className={styles.imgInstituicoes}
                />
                <h2 className={styles.nomeInstituicoes}>{inst.titulo}</h2>
                <div className={styles.enderecoInstituicoes}>
                  <div className={styles.iconLocal}></div>
                  {inst.ong.nome}
                </div>
                <progress value={inst.valorArrecadado} max={inst.metaFinanceira}></progress>
                <p className={styles.valorInstituicoes}>
                  R$ {Number(inst.valorArrecadado).toLocaleString("pt-BR")} / R${" "}
                  {Number(inst.metaFinanceira).toLocaleString("pt-BR")} (
                  {Math.round((inst.valorArrecadado / inst.metaFinanceira) * 100)}%)
                </p>
              </Link>
            ))
          ) : (
             <p className={styles.subtitle}>Carregando campanhas populares...</p>
          )}
        </div>

        {/* SEÇÃO 2: NOVAS CAMPANHAS (Vindo do Banco) */}
        <h1 className={styles.tituloInstituicoes}>Novas Campanhas</h1>
        <div className={styles.cardInstituicoes}>
          {loading ? (
            <p style={{ textAlign: "center", width: "100%" }}>Carregando campanhas...</p>
          ) : novasCampanhas.length > 0 ? (
            novasCampanhas.map((inst) => (
              <Link key={inst.id} to={`/instituto/${inst.id}`} className={styles.instituicoes}>
                <img
                  src={inst.imagemUrl || "/institutos/default.png"}
                  alt={inst.titulo}
                  className={styles.imgInstituicoes}
                />
                <h2 className={styles.nomeInstituicoes}>{inst.titulo}</h2>
                <div className={styles.enderecoInstituicoes}>
                  <div className={styles.iconLocal}></div>
                  {inst.ong.nome}
                </div>
                <progress value={inst.valorArrecadado} max={inst.metaFinanceira}></progress>
                <p className={styles.valorInstituicoes}>
                  R$ {Number(inst.valorArrecadado).toLocaleString("pt-BR")} / R${" "}
                  {Number(inst.metaFinanceira).toLocaleString("pt-BR")} (
                  {Math.round((inst.valorArrecadado / inst.metaFinanceira) * 100)}%)
                </p>
              </Link>
            ))
          ) : (
            <p className={styles.subtitle}>Nenhuma campanha encontrada no momento.</p>
          )}
        </div>
      </div>
    </>
  );
};

// =========================================================
// COMPONENTE 2: VISÃO DA ONG (DASHBOARD)
// =========================================================
const DoarOngView = ({ ongId }: { ongId: string }) => {
  const [stats, setStats] = useState<OngStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchOngStats(ongId)
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro:", err);
        setLoading(false);
      });
  }, [ongId]);

  return (
    <div className={styles.ongPageWrapper}>
      <section className={styles.ongTopSection}>
        <h1 className={styles.tituloDoar}>Veja A Diferença Que Você Pode Fazer</h1>
        <h2 className={styles.subtitle}>
          No PetResc, você pode apoiar diretamente as ONGs cadastradas. Cada
          contribuição ajuda a oferecer alimentação, cuidados médicos e abrigo
          para animais em situação de vulnerabilidade. Escolha a ONG que mais
          toca seu coração e faça parte dessa rede de solidariedade.
        </h2>

        {loading ? (
          <p style={{ color: "#fff", fontSize: "1.5rem" }}>Carregando estatísticas...</p>
        ) : !stats ? (
          <p style={{ color: "#fff" }}>Erro ao carregar dados.</p>
        ) : (
          <div className={styles.mosaicGrid}>
            <div className={styles.mosaicCol}>
              <img src="/doar/campanhas.png" alt="Campanhas" className={styles.mosaicImg} />
              <div className={styles.mosaicCard}>
                <span className={styles.mosaicValue}>{stats.totalCampanhas}</span>
                <span className={styles.mosaicLabel}>Campanhas Realizadas</span>
              </div>
            </div>

            <div className={styles.mosaicCol}>
              <img src="/doar/doarImg.png" alt="Mãos" className={`${styles.mosaicImg} ${styles.tallImg}`} />
            </div>

            <div className={styles.mosaicCol}>
              <div className={styles.mosaicCard} style={{ marginBottom: "0" }}>
                <span className={styles.mosaicValue}>{stats.totalDoadores}</span>
                <span className={styles.mosaicLabel}>Doadores Ativos</span>
              </div>
              <img src="/doar/doadores.png" alt="Doadores" className={styles.mosaicImg} />
            </div>

            <div className={styles.mosaicCol}>
              <img src="/doar/doarImg2.png" alt="Animais" className={styles.mosaicImg} style={{ height: "180px" }} />
              <div className={styles.mosaicCard}>
                <span className={styles.mosaicValue}>
                  {stats.valorArrecadado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span className={styles.mosaicLabel}>Valor Arrecadado</span>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className={styles.ongBottomSection}>
        <div className={styles.bottomContent}>
          <div className={`${styles.bottomSide} ${styles.textLeft}`}>
            <Link to="/campanhas-anteriores" className={styles.btnBlue}>VER CAMPANHAS</Link>
            <p>
              Sua doação é muito mais do que um simples gesto de solidariedade —
              ela é o que nos permite alimentar, tratar e proteger cada um dos
              nossos animais resgatados.
            </p>
          </div>

          <div className={styles.centerDogContainer}>
            <img src="/banners/cachorroDoar.png" alt="Cachorro" className={styles.centerDogImg} />
          </div>

          <div className={`${styles.bottomSide} ${styles.textRight}`}>
            <p>
              Apoiar nossa causa é se tornar parte ativa dessa transformação, é
              estender a mão àqueles que não têm voz e participar da mudança.
            </p>
            <Link to="/nova-campanha" className={styles.btnBlue}>CRIAR NOVA CAMPANHA</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function Doar() {
  const { isAuthenticated, user } = useAuth();
  const isOng = isAuthenticated && (user?.role === "ONG" || user?.role === "ADMIN");

  return (
    <Layout>
      {isOng && user ? (
        <DoarOngView ongId={user.id.toString()} />
      ) : (
        <DoarUsuarioView />
      )}
    </Layout>
  );
}