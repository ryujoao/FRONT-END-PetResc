import React, { useState } from "react";
import styles from "./formularioLarTemporario.module.css";
import Sucesso from "../../components/sucesso";
import Layout from "../../components/layout";

/** Tipagens */
type YesNo = "sim" | "nao" | "";

interface FormData {
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;

  // endereco
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;

  // moradia / animais
  tipoMoradia: string;
  quintal: YesNo;
  porteAnimal: string[];
  tipoAnimal: string[];

  // experiencia / condicoes
  outrosAnimais: YesNo;
  administraMedicamentos: YesNo;
  levarVeterinario: YesNo;
  arcarCustos: YesNo;
  ajudaSuprimentos: YesNo;

  periodoDisponibilidade: string;

  // declarações
  declaroLido: boolean;
  declaroVerdade: boolean;
}

// --- TEXTO DO TERMO DE LAR TEMPORÁRIO ---
const termoTexto = `
TERMO DE RESPONSABILIDADE - LAR TEMPORÁRIO

1. O VOLUNTÁRIO compromete-se a oferecer abrigo, alimentação de qualidade, água fresca e, principalmente, carinho e atenção ao animal acolhido.

2. SEGURANÇA: O voluntário garante que o animal não terá acesso à rua desacompanhado e que sua residência possui condições seguras (muros altos, telas em apartamentos, portões fechados) para evitar fugas.

3. SAÚDE: Qualquer alteração de saúde ou comportamento do animal deve ser comunicada imediatamente à equipe do PetResc. É proibido administrar medicamentos ou realizar procedimentos sem a autorização prévia da ONG, salvo em casos de emergência com risco de morte iminente.

4. CUSTOS: O acordo sobre custos (ração, areia, medicamentos) deve ser pré-estabelecido. Caso o voluntário tenha concordado em arcar com custos no formulário, este compromisso deve ser honrado.

5. ADOÇÃO: O animal permanece sob a tutela da ONG PetResc até sua adoção definitiva. O Lar Temporário não tem autorização para doar, vender, emprestar ou repassar o animal a terceiros sem o consentimento formal da ONG.

6. DEVOLUÇÃO: Caso o voluntário não possa mais manter o animal por qualquer motivo, deve comunicar a ONG com antecedência mínima de 7 dias para que um novo lar seja encontrado. Jamais, em hipótese alguma, o animal deverá ser abandonado.

Ao marcar "Li e concordo", você aceita as condições acima descritas.
`;

export default function FormularioLarTemporario() {
  const [sucessoOpen, setSucessoOpen] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    cpf: "",
    email: "",
    telefone: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    tipoMoradia: "",
    quintal: "" as YesNo,
    porteAnimal: [], 
    tipoAnimal: [],  
    outrosAnimais: "" as YesNo,
    administraMedicamentos: "" as YesNo,
    levarVeterinario: "" as YesNo,
    arcarCustos: "" as YesNo,
    ajudaSuprimentos: "" as YesNo,
    periodoDisponibilidade: "",
    declaroLido: false,
    declaroVerdade: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: rawName, value, type, checked } = e.target;
    const name = rawName as keyof FormData;

    if (type === "checkbox") {
      if (name === "declaroLido" || name === "declaroVerdade") {
          setFormData((prev) => ({ ...prev, [name]: checked }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value } as FormData));
  };

  const handleMultiSelect = (field: "porteAnimal" | "tipoAnimal", value: string) => {
    setFormData((prev) => {
      const currentList = prev[field];
      if (currentList.includes(value)) {
        return { ...prev, [field]: currentList.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...currentList, value] };
      }
    });
  };

  const buscarCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Não foi possível buscar o endereço automaticamente.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formData.porteAnimal.length === 0) {
        alert("Por favor, selecione pelo menos um porte de animal.");
        return;
      }
      if (formData.tipoAnimal.length === 0) {
        alert("Por favor, selecione pelo menos um tipo de animal.");
        return;
      }

      if (!formData.periodoDisponibilidade) {
        alert("Informe o período de disponibilidade.");
        return;
      }

      if (!formData.declaroLido || !formData.declaroVerdade) {
        alert("Você precisa aceitar os termos e declarar a veracidade das informações.");
        return;
      }

      const token = localStorage.getItem("@AuthData:token");

      if (!token) {
        alert("Erro: usuário não autenticado.");
        return;
      }

      const payload = {
        nomeCompleto: formData.nomeCompleto,
        cpf: formData.cpf,
        email: formData.email,
        telefone: formData.telefone,
        endereco: {
          cep: formData.cep,
          rua: formData.rua,
          numero: formData.numero,
          complemento: formData.complemento || null,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
        },
        tipoResidencia: formData.tipoMoradia,
        espacoDisponivel: formData.quintal === "sim",
        porteAnimal: formData.porteAnimal.join(", "),
        tipoAnimalInteresse: formData.tipoAnimal.join(", "),
        possuiAnimais: formData.outrosAnimais === "sim",
        experiencia: formData.administraMedicamentos === "sim",
        levarVeterinario: formData.levarVeterinario === "sim",
        arcarCustos: formData.arcarCustos === "sim",
        ajudaSuprimentos: formData.ajudaSuprimentos === "sim",
        periodoDisponibilidade: formData.periodoDisponibilidade,
        declaroLido: formData.declaroLido,
        declaroVerdade: formData.declaroVerdade,
      };

      console.log("🔵 ENVIANDO PAYLOAD:", payload);

      const response = await fetch(
        "https://petresc.onrender.com/api/lares-temporarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const erro = await response.json();
        console.error("❌ Erro do servidor:", erro);
        alert("Erro ao enviar formulário: " + erro.error);
        return;
      }

      setSucessoOpen(true);
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Erro inesperado ao enviar o formulário.");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Seja um lar temporário</h1>
        <p className={styles.subtitulo}>
          Preencha o formulário para se candidatar. 
          <br />
          <span className={styles.avisoObrigatorio}>
            * Campos obrigatórios
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* --- DADOS PESSOAIS --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Informações Pessoais</h2>

            <label className={styles.label}>Nome Completo *</label>
            <input
              name="nomeCompleto"
              className={styles.input}
              type="text"
              required
              onChange={handleChange}
              value={formData.nomeCompleto}
            />

            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>CPF *</label>
                <input
                  name="cpf"
                  className={styles.input}
                  type="text"
                  required
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                />
              </div>
            </div>

            <label className={styles.label}>Email *</label>
            <input
              name="email"
              className={styles.input}
              type="email"
              required
              onChange={handleChange}
              placeholder="user@gmail.com"
              value={formData.email}
            />

            <label className={styles.label}>Telefone *</label>
            <input
              name="telefone"
              className={styles.input}
              type="text"
              required
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              value={formData.telefone}
            />
          </div>

          {/* --- ENDEREÇO --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Endereço</h2>

            <label className={styles.label}>CEP *</label>
            <input
              name="cep"
              className={styles.input}
              type="text"
              required
              onChange={handleChange}
              onBlur={buscarCep} 
              value={formData.cep}
            />

            <label className={styles.label}>Rua/Avenida *</label>
            <input
              name="rua"
              className={styles.input}
              type="text"
              required
              onChange={handleChange}
              value={formData.rua}
            />

            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>Número *</label>
                <input
                  name="numero"
                  className={styles.input}
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.numero}
                />
              </div>
              <div className={styles.col}>
                <label className={styles.label}>Complemento</label>
                <input
                  name="complemento"
                  className={styles.input}
                  type="text"
                  placeholder="Opcional"
                  onChange={handleChange}
                  value={formData.complemento}
                />
              </div>
            </div>

            <label className={styles.label}>Bairro *</label>
            <input
              name="bairro"
              className={styles.input}
              type="text"
              required
              onChange={handleChange}
              value={formData.bairro}
            />

            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>Cidade *</label>
                <input
                  name="cidade"
                  className={styles.input}
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.cidade}
                />
              </div>
              <div className={styles.col}>
                <label className={styles.label}>Estado *</label>
                <input
                  name="estado"
                  className={styles.input}
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.estado}
                />
              </div>
            </div>
          </div>

          {/* --- MORADIA / ANIMAIS --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Sobre o Espaço e Preferências</h2>

            <h3 className={styles.tituloQuestao}>Tipo de Moradia: *</h3>
            <div className={styles.grupoOpcoes}>
              {["casa", "apartamento", "sitio", "outro"].map((tipo) => (
                <label key={tipo} className={styles.checkboxCustomizado}>
                  <input
                    type="radio"
                    name="tipoMoradia"
                    value={tipo}
                    required
                    onChange={handleChange}
                    checked={formData.tipoMoradia === tipo}
                  />
                  <span className={styles.checkmark}></span>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </label>
              ))}
            </div>

            <h3 className={styles.tituloQuestao}>Possui quintal? *</h3>
            <div className={styles.grupoOpcoes}>
              {["sim", "nao"].map((v) => (
                <label key={v} className={styles.checkboxCustomizado}>
                  <input
                    type="radio"
                    name="quintal"
                    value={v}
                    required
                    onChange={handleChange}
                    checked={formData.quintal === v}
                  />
                  <span className={styles.checkmark}></span>
                  {v === "sim" ? "Sim" : "Não"}
                </label>
              ))}
            </div>

            <h3 className={styles.tituloQuestao}>Quais portes aceita? * (Pode marcar vários)</h3>
            <div className={styles.grupoOpcoes}>
              {["pequeno", "medio", "grande"].map((v) => (
                <label key={v} className={styles.checkboxCustomizado}>
                  <input
                    type="checkbox" 
                    name="porteAnimal"
                    value={v}
                    onChange={() => handleMultiSelect("porteAnimal", v)}
                    checked={formData.porteAnimal.includes(v)}
                  />
                  <span className={styles.checkmark}></span>
                  {v}
                </label>
              ))}
            </div>

            <h3 className={styles.tituloQuestao}>Quais animais aceita? * (Pode marcar vários)</h3>
            <div className={styles.grupoOpcoes}>
              {["gato", "cachorro", "todos"].map((v) => (
                <label key={v} className={styles.checkboxCustomizado}>
                  <input
                    type="checkbox"  
                    name="tipoAnimal"
                    value={v}
                    onChange={() => handleMultiSelect("tipoAnimal", v)}
                    checked={formData.tipoAnimal.includes(v)}
                  />
                  <span className={styles.checkmark}></span>
                  {v}
                </label>
              ))}
            </div>

            <h2 className={styles.tituloSecao}>Experiência e Condições</h2>

            {[
              { label: "Possui outros animais em casa? *", name: "outrosAnimais" },
              { label: "Está disposto a administrar medicamentos? *", name: "administraMedicamentos" },
              { label: "Tem disponibilidade para levar o animal ao veterinário? *", name: "levarVeterinario" },
              { label: "Pode arcar com custos básicos? *", name: "arcarCustos" },
              { label: "Precisa de ajuda com suprimentos? *", name: "ajudaSuprimentos" },
            ].map((q) => (
              <div key={q.name}>
                <h3 className={styles.tituloQuestao}>{q.label}</h3>
                <div className={styles.grupoOpcoes}>
                  {["sim", "nao"].map((v) => (
                    <label key={v} className={styles.checkboxCustomizado}>
                      <input
                        type="radio"
                        name={q.name}
                        value={v}
                        required
                        onChange={handleChange}
                        checked={formData[q.name as keyof FormData] === v}
                      />
                      <span className={styles.checkmark}></span>
                      {v === "sim" ? "Sim" : "Não"}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <h2 className={styles.tituloQuestao}>Tempo de Disponibilidade</h2>
            <label className={styles.label}>Por quanto tempo você pode abrigar o animal? *</label>
            <input
              name="periodoDisponibilidade"
              className={styles.input}
              type="text"
              required
              placeholder="Ex: 15 dias, 1 mês..."
              onChange={handleChange}
              value={formData.periodoDisponibilidade}
            />
          </div>

          {/* --- DECLARAÇÕES --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Declarações</h2>

            {/* Apliquei as novas classes checkboxTop e checkmarkTop para alinhar no topo */}
            <label className={`${styles.checkboxCustomizado} ${styles.checkboxTop}`}>
              <input
                type="checkbox"
                name="declaroVerdade"
                required
                checked={formData.declaroVerdade}
                onChange={handleChange}
              />
              <span className={`${styles.checkmark} ${styles.checkmarkTop}`}></span>
              <span className={styles.spanCheckmark}>
                Declaro que as informações acima são verdadeiras. *
              </span>
            </label>

            {/* CAIXA DE TEXTO COM O TERMO - Agora usa classe CSS */}
            <div className={styles.termosBox}>
              {termoTexto}
            </div>

            <label className={styles.checkboxCustomizado}>
              <input
                type="checkbox"
                name="declaroLido"
                required
                checked={formData.declaroLido}
                onChange={handleChange}
              />
              <span className={styles.checkmark}></span>
              <span className={styles.spanCheckmark}>Li e concordo com os termos. *</span>
            </label>
          </div>

          <button type="submit" className={styles.botaoEnviar}>
            Finalizar
          </button>
        </form>
      </div>

      <Sucesso
        isOpen={sucessoOpen}
        onClose={() => {
          setSucessoOpen(false);
          window.location.href = "/";
        }}
      />
    </Layout>
  );
}