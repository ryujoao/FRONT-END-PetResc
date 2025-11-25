import React, { useEffect } from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
 data: any;
 onChange: (p: Partial<any>) => void;
 setCanProceed: (v: boolean) => void;
};

export default function StepTermo({ data, onChange, setCanProceed }: Props) {
 useEffect(
  () => setCanProceed(!!data.aceitaTermo),
  [data.aceitaTermo, setCanProceed]
 );

 return (
  <section className={styles.stepSection}>
   <h3 className={styles.finalTermTitle}>
    Termo de Responsabilidade de Adoção
   </h3>

   <p className={styles.termoText}>
    Ao adotar um animal por meio da plataforma PetControl, declaro estar
    ciente de que a adoção é um compromisso sério e de longo prazo. Assim,
    comprometo-me a:
    <br />
    <br />
   </p>
   
   {/* Estrutura de lista CORRIGIDA: usa <ol> para lista ordenada e <li> para os itens */}
   <ol className={styles.listaTermos}>
    <li className={styles.termoTextItem}>
    1. Oferecer alimentação, cuidados veterinários, abrigo seguro e carinho.
    </li>
    <li className={styles.termoTextItem}>
    2. Manter o animal vacinado, vermifugado e, quando necessário, castrado.
    </li>
    <li className={styles.termoTextItem}>
    3. Nunca praticar ou permitir maus-tratos, negligência ou abandono.
    </li>
    <li className={styles.termoTextItem}>
    4. Não vender, doar ou repassar o animal sem informar previamente a ONG.
    </li>
    <li className={styles.termoTextItem}>
    5. Permitir contatos da ONG para acompanhamento da adaptação.
    </li>
    <li className={styles.termoTextItem}>
    6. Reconhecer que o animal depende de mim e que sua guarda é de minha
     total responsabilidade.
    </li>
   </ol>

   <strong className={styles.termoText}>Importante: o animal escolhido pode não estar disponível no momento da aprovação do formulário, sendo indicada outra opção pela ONG.</strong>

   <label className={styles.checkboxCustomizado}>
    <input
     type="checkbox"
     checked={!!data.aceitaTermo}
     onChange={(e) => onChange({ aceitaTermo: e.target.checked })}
    />
    <span className={styles.checkmark}></span>
    <span>Li e aceito o Termo de Responsabilidade de Adoção.</span>
   </label>
  </section>
 );
}