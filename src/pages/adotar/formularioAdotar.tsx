import styles from "./formularioAdotar.module.css";
import Nav from "../../components/navbar";
import Footer from "../../components/footer";
import { useState } from "react";
import Sucesso from "../../components/sucesso";

export default function FormularioAdotar() {
  return (
    <>
      <Nav />
        <div className={styles.container}>
            <h1 className={styles.titulo}>Formulário de Adoção</h1>
            <p className={styles.subtitulo}>Preencha o formulário abaixo para iniciar o processo de adoção.</p>
            <form className={styles.form}>
                <label className={styles.label}>Nome Completo</label>
                <input type="text" className={styles.input} required />
                <label className={styles.label}>Email</label>
                <input type="email" className={styles.input} required />
                <label className={styles.label}>Telefone</label>
                <input type="tel" className={styles.input} required />
                <label className={styles.label}>Endereço</label>
                <input type="text" className={styles.input} required />
                <label className={styles.label}>Por que você quer adotar um pet?</label>
                <textarea className={styles.textarea} required></textarea>
                <button type="submit" className={styles.botao}>Enviar</button>
            </form>
        </div>
      <Footer />
        <Sucesso isOpen={false} onClose={() => {}} />
    </>
  );
}