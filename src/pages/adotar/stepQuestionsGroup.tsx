import React from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
  groupId: number;
  subStep: number;
  onAnswer: (p: Partial<any>) => void;
  currentValue?: string; // valor atual vindo do state do pai
};

const groups: Record<
  number,
  { questions: { key: string; title: string; options?: string[]; type?: "options" | "text" }[] }
> = {
  2: {
    questions: [
      { key: "tipoMoradiaChoice", title: "Tipo de moradia", options: ["Casa", "Apartamento", "Sítio", "Outro"], type: "options" },
      { key: "portesAceitos", title: "Quais portes são aceitos", options: ["Pequeno", "Médio", "Grande", "Todos"], type: "options" },
      { key: "animaisAceitos", title: "Quais animais são aceitos", options: ["Gato", "Cachorro", "Pássaros", "Todos"], type: "options" },
    ],
  },
  3: {
    questions: [
      { key: "jaViuPet", title: "Você já viu algum pet que tem interesse em adotar?", options: ["Sim, já vi", "Não, quero achar um"], type: "options" },
      { key: "qualTipoPet", title: "Qual tipo pet que tem interesse em adotar?", options: ["Cachorro", "Gato", "Pássaros"], type: "options" },
      { key: "preferenciaPet", title: "Qual a sua preferência que o pet seja:", options: ["Macho", "Fêmea", "Tanto faz"], type: "options" },
    ],
  },
  4: {
    questions: [
      { key: "pessoasNoLar", title: "Quantas pessoas moram no lar?", type: "text" },
      { key: "outrosAnimaisLocal", title: "Outros animais no local? (quantidade / tipo)", type: "text" },
      { key: "alergia", title: "Alguma pessoa com alergia?", options: ["Sim", "Não"], type: "options" },
    ],
  },
};

export default function StepQuestionsGroup({ groupId, subStep, onAnswer, currentValue }: Props) {
  const group = groups[groupId];
  if (!group) return null;
  const q = group.questions[subStep];
  if (!q) return null;

  const handleOption = (key: string, value: string) => onAnswer({ [key]: value });

  return (
    <section className={styles.stepSection}>
      <h3 className={styles.questionTitle}>{q.title}</h3>

      {q.type === "options" &&
        q.options?.map((opt) => {
          const checked = currentValue === opt;
          return (
            <label
              key={opt}
              className={`${styles.optionButton} ${checked ? styles.selectedOption : ""}`}
              onClick={() => handleOption(q.key, opt)} // garante atualização ao clicar na label
              role="button"
              aria-pressed={checked}
            >
              <input
                type="radio"
                name={q.key}
                value={opt}
                checked={checked}
                onChange={() => handleOption(q.key, opt)}
                aria-label={opt}
              />
              <span className={styles.optionLabel}>{opt}</span>
            </label>
          );
        })}

      {q.type === "text" && (
        <textarea
          className={styles.input}
          rows={3}
          value={currentValue ?? ""}
          onChange={(e) => handleOption(q.key, e.target.value)}
        />
      )}
    </section>
  );
}