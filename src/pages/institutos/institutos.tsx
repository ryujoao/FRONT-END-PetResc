import { useParams } from "react-router-dom";
import { useState } from "react"; 
import styles from "./institutos.module.css";
import Layout from "../../components/layout";
import { FaMapMarkerAlt, FaCheckCircle, FaQrcode } from "react-icons/fa"; 

type Instituto = {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  itensDescricao: string[];
  logoUrl: string;
  arrecadado: number;
  meta: number;
};

const dadosInstitutos: Record<string, Instituto> = {
  suipa: {
    id: "suipa",
    nome: "SUIPA",
    endereco: "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
    logoUrl: "/institutos/suipa.png",
    descricao:
      "Todos os dias, milhares de animais resgatados pela SUIPA recebem cuidados, alimentação e muito amor. Mas para continuarmos oferecendo abrigo, tratamento veterinário e a chance de um novo lar, precisamos da sua ajuda.",
    itensDescricao: [
      "Alimentação de cães e gatos acolhidos",
      "Tratamento médico e medicamentos essenciais",
      "Abrigo seguro...",
    ],
    arrecadado: 7613.0,
    meta: 15000.0,
  },
  caramelo: {
    id: "caramelo",
    nome: "Instituto Caramelo",
    endereco: "Rua José Felix de Oliveira, 1234 – Granja Viana, Cotia – SP",
    logoUrl: "/institutos/institutoCaramelo.png",
    descricao:
      "O Instituto Caramelo atua no resgate e reabilitação de animais vítimas de maus-tratos, proporcionando uma nova chance de vida com dignidade e amor.",
    itensDescricao: [
      "Resgate de animais em situação de risco",
      "Reabilitação física e comportamental",
      "Campanhas de adoção responsável",
    ],
    arrecadado: 8104.64,
    meta: 16000.0,
  },
  ampara: {
      id: "ampara",
      nome: "Instituto Ampara Animal",
      endereco: "Rua Exemplo, 123 - São Paulo - SP",
      logoUrl: "/ampara.png",
      descricao: "Ampara Animal trabalha em prol dos animais abandonados.",
      itensDescricao: ["Apoio a abrigos", "Castração", "Educação"],
      arrecadado: 4500,
      meta: 10000
  }
};

export default function Institutos() {
  const { id } = useParams();
  const institutoId = id ? id.toLowerCase() : "";
  const instituto = dadosInstitutos[institutoId];

  const [valorSelecionado, setValorSelecionado] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [loading, setLoading] = useState(false);
  const [fasePagamento, setFasePagamento] = useState<"fechado" | "pix" | "sucesso">("fechado");

  // Função para lidar com o input de "Outro valor" e forçar o radio button
  const handleOutroValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Define o valor do estado como o digitado
    setValorSelecionado(e.target.value);
    
    // Força a seleção do radio button "Outro valor"
    const radioOutro = document.querySelector('input[name="valor"][value="outro"]') as HTMLInputElement;
    if (radioOutro) {
        radioOutro.checked = true;
    }
  };

  const handleFinalizar = () => {
    if (!valorSelecionado || !formaPagamento) {
      alert("Por favor, selecione um valor e uma forma de pagamento.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (formaPagamento === "Pix") {
        setFasePagamento("pix");
      } else {
        setFasePagamento("sucesso");
      }
    }, 1500);
  };

  const confirmarPix = () => {
      setFasePagamento("sucesso");
  }

  const fecharModal = () => {
      setFasePagamento("fechado");
      setValorSelecionado("");
      setFormaPagamento("");
  }

  if (!instituto) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h1>Instituto não encontrado</h1>
          <p>Verifique o link ou tente novamente.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.paginstitutos}>
        
        {/* === MODAL DE PAGAMENTO (SIMULAÇÃO) === */}
        {fasePagamento !== "fechado" && (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center',
                alignItems: 'center', zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: 'white', padding: '40px', borderRadius: '12px',
                    textAlign: 'center', maxWidth: '400px', width: '90%',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }}>
                    {fasePagamento === "pix" && (
                        <>
                            <h2 style={{color: '#2b6b99', marginBottom: '1rem'}}>Pague com Pix</h2>
                            <FaQrcode size={150} style={{margin: '20px 0', color: '#333'}} />
                            <p style={{marginBottom: '1rem'}}>Escaneie o QR Code acima para doar <strong>R$ {valorSelecionado},00</strong></p>
                            <button 
                                onClick={confirmarPix}
                                style={{
                                    backgroundColor: '#28a745', color: 'white', border: 'none',
                                    padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem'
                                }}
                            >
                                Já fiz o pagamento
                            </button>
                        </>
                    )}

                    {fasePagamento === "sucesso" && (
                        <>
                            <FaCheckCircle size={60} color="#28a745" style={{marginBottom: '1rem'}} />
                            <h2 style={{color: '#2b6b99', marginBottom: '1rem'}}>Doação Realizada!</h2>
                            <p style={{marginBottom: '1rem'}}>Muito obrigado por ajudar o <strong>{instituto.nome}</strong>.</p>
                            <button 
                                onClick={fecharModal}
                                style={{
                                    backgroundColor: '#2b6b99', color: 'white', border: 'none',
                                    padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem'
                                }}
                            >
                                Fechar
                            </button>
                        </>
                    )}
                </div>
            </div>
        )}

        <div className={styles.logoContainer}>
          <img
            src={instituto.logoUrl}
            alt={`Logo ${instituto.nome}`}
            className={styles.logo}
            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x150?text=Logo+ONG")}
          />
        </div>

        <div className={styles.cabecalho}>
          <h1 className={styles.nome}>{instituto.nome}</h1>
          <p className={styles.endereco}>
            <FaMapMarkerAlt /> {instituto.endereco}
          </p>
        </div>

        <hr className={styles.divider} />

        <div className={styles.descricaoContainer}>
          <p className={styles.descricao}>{instituto.descricao}</p>
          <p className={styles.descricao}>Com a sua doação, você garante:</p>
          <ul className={styles.listaBeneficios}>
            {instituto.itensDescricao.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
             <li style={{ listStyle: 'none' }}><a href="#" className={styles.lerMais}>Ler mais</a></li>
          </ul>
        </div>

        <hr className={styles.divider} />

        <div className={styles.areaDoacao}>
          
          {/* Coluna Esquerda: Valores */}
          <div className={`${styles.colunaOpcoes} ${styles.colunaEsquerda}`}>
            <h3 className={styles.tituloOpcao}>Escolha um valor:</h3>
            <div className={styles.listaRadios}>
              
              {/* Opção R$ 20 */}
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="20" onChange={(e) => setValorSelecionado(e.target.value)} /> 
                <span>R$ 20 - 1 dia de alimentação para um cão ou gato</span>
              </label>
              
              {/* Opção R$ 50 */}
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="50" onChange={(e) => setValorSelecionado(e.target.value)} /> 
                <span>R$ 50 - Vacina essencial para um resgatado</span>
              </label>
              
              {/* Opção R$ 100 */}
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="100" onChange={(e) => setValorSelecionado(e.target.value)} /> 
                <span>R$ 100 - Atendimento veterinário emergencial</span>
              </label>
              
              {/* Opção R$ 200 */}
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="200" onChange={(e) => setValorSelecionado(e.target.value)} /> 
                <span>R$ 200 - 1 mês de cuidados completos</span>
              </label>
              
              {/* Opção Outro valor */}
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="outro" /> 
                <span>Outro valor:
                    <input 
                        type="number" 
                        placeholder="Digite" 
                        className={styles.outroValorInput} 
                        onChange={handleOutroValorChange}
                        onClick={() => { /* Seleciona o radio quando o campo é clicado */ 
                            const radioOutro = document.querySelector('input[name="valor"][value="outro"]') as HTMLInputElement;
                            if (radioOutro) radioOutro.checked = true;
                        }}
                    />
                </span>
              </label>
            </div>
          </div>

          {/* Coluna Direita: Pagamento */}
          <div className={styles.colunaOpcoes}>
            <h3 className={styles.tituloOpcao}>Formas de pagamento:</h3>
            <div className={styles.listaRadios}>
              <label className={styles.radioItem}>
                <input type="radio" name="pagamento" value="Debito" onChange={(e) => setFormaPagamento(e.target.value)} /> 
                <span>Cartão de Débito</span>
              </label>
              <label className={styles.radioItem}>
                <input type="radio" name="pagamento" value="Credito" onChange={(e) => setFormaPagamento(e.target.value)} /> 
                <span>Cartão de Crédito</span>
              </label>
              <label className={styles.radioItem}>
                <input type="radio" name="pagamento" value="Pix" onChange={(e) => setFormaPagamento(e.target.value)} /> 
                <span>Pix</span>
              </label>
              <label className={styles.radioItem}>
                <input type="radio" name="pagamento" value="Boleto" onChange={(e) => setFormaPagamento(e.target.value)} /> 
                <span>Boleto Bancário</span>
              </label>
            </div>
            
            <button 
                className={styles.botaoFinalizar} 
                onClick={handleFinalizar}
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
            >
                {loading ? "Processando..." : "Finalizar"}
            </button>
          </div>
        </div>

        <div className={styles.barraFooter}>
          <div className={styles.infoArrecadado}>
            <h3>Arrecadado</h3>
            <p className={styles.valoresArrecadado}>
              <strong>
                {instituto.arrecadado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </strong>{" "}
              /{" "}
              {instituto.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
          <p className={styles.textoFooterDireita}>
            Todos os valores arrecadados são destinados ao cuidado e manutenção dos animais da {instituto.nome}.
          </p>
        </div>

      </div>
    </Layout>
  );
}