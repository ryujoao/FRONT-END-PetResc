import style from "../style/meusAnimais.module.css";

export default function MeusAnimais() {
  return (
    <div className={style.containerPrincipal}>
      <div className={style.containerMeusAnimais}>
        <h2 className={style.titulo}>Meus Animais</h2>

        <div className={style.card}>
          <div className={style.imgCard}>
            <img src="/animalSemNome.png" alt="Animal Sem Nome" />
          </div>

          <div className={style.infoCard}>
            <div className={style.cardNome}>
              <h1>Não possui nome</h1>
              <p className={style.descricaoCard}>Sem raça definida, AD.</p>
              <p className={style.descricaoCard}>(SRD)</p>
            </div>
          </div>

          <div className={style.statusSuperior}>Animal cadastrado</div>
          <div className={style.statusInferior}>Status: Em tratamento</div>
        </div>

        <div className={style.card}>
          <div className={style.imgCard}>
            <img src="/amendoim.png" alt="Amendoim" />
          </div>

          <div className={style.infoCard}>
            <div className={style.cardNome}>
              <h1>Amendoim</h1>
            </div>

            <p className={style.descricaoCard}>Sem raça definida, FI.</p>
            <p className={style.descricaoCard}>(SRD)</p>

            <div className={style.statusSuperior}>Lar temporário</div>
            <div className={style.statusInferior}>Status: Disponível</div>
          </div>
        </div>
      </div>

      <div className={style.adocaoProcesso}>
        <h2 className={style.titulo}>Adoção em Processo</h2>

        <div className={style.card}>
          <div className={style.imgCard}>
            <img src="/estrela.png" alt="Estrela" />
          </div>

          <div className={style.infoCard}>
            <div className={style.cardNome}>
              <h1>Estrela</h1>
            </div>

            <p className={style.descricaoCard}>Sem raça definida, AD.</p>
            <p className={style.descricaoCard}>(SRD)</p>

            <div className={style.statusInferior}>
              Status: Dicumentação em Análise
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
