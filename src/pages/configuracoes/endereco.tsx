import React, { useState } from "react";
import styles from "./conta.module.css"; 
import { useAuth } from "../../auth/AuthContext";

export default function Endereco() {
  const { user, setUser } = useAuth();
  


  const [cep, setCep] = useState(user?.cep || "");
  const [rua, setRua] = useState(user?.rua || "");
  const [numero, setNumero] = useState(user?.numero || "");
  const [complemento, setComplemento] = useState(user?.complemento || "");
  const [bairro, setBairro] = useState(user?.bairro || "");
  const [cidade, setCidade] = useState(user?.cidade || "");
  const [estado, setEstado] = useState(user?.estado || "");
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const enderecoData = { cep, rua, numero, complemento, bairro, cidade, estado };
    console.log("Salvando endereço:", enderecoData);
    alert("Endereço salvo!");
  };

  return (
    <div className={styles.formContainer}>
      
      <h1 className={styles.titulo}>Endereço</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        
       
        <div className={styles.inputGroup}>
          <label htmlFor="cep">CEP</label>
          <input id="cep" type="text" maxLength={9} value={cep} onChange={(e) => setCep(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="rua">Rua</label>
          <input id="rua" type="text" value={rua} onChange={(e) => setRua(e.target.value)} />
        </div>
        
       
        <div className={styles.formRow}>
          <div className={`${styles.inputGroup} ${styles.rowItem}`}>
            <label htmlFor="numero">Número</label>
            <input id="numero" type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
          </div>
          <div className={`${styles.inputGroup} ${styles.rowItem}`}>
            <label htmlFor="complemento">Complemento (Opcional)</label>
            <input id="complemento" type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
          </div>
        </div>

        
        <div className={styles.inputGroup}>
          <label htmlFor="bairro">Bairro</label>
          <input id="bairro" type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        </div>

        
        <div className={styles.formRow}>
          <div className={`${styles.inputGroup} ${styles.rowItem}`}>
            <label htmlFor="cidade">Cidade</label>
            <input id="cidade" type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
          </div>
          <div className={`${styles.inputGroup} ${styles.rowItem}`}>
            <label htmlFor="estado">Estado (UF)</label>
            <input id="estado" type="text" maxLength={2} value={estado} onChange={(e) => setEstado(e.target.value)} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.botaoSalvar}>Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
}