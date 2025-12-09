import { useEffect } from 'react';

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => any;
    };
  }
}

export default function VLibras() {
  useEffect(() => {
    const scriptId = 'vlibras-script';
    
    // Remove script anterior se existir
    const oldScript = document.getElementById(scriptId);
    if (oldScript) oldScript.remove();
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    
    script.onload = () => {
      console.log('VLibras script carregado');
      
      // Aguarda a inicialização do objeto global
      const tryInitialize = () => {
        if (window.VLibras?.Widget) {
          console.log('Inicializando VLibras Widget...');
          try {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
            console.log('VLibras Widget criado com sucesso!');
          } catch (error) {
            console.error('Erro ao criar VLibras Widget:', error);
          }
        } else {
          console.warn('Aguardando VLibras.Widget...');
          setTimeout(tryInitialize, 500);
        }
      };
      
      tryInitialize();
    };
    
    script.onerror = () => {
      console.error('Erro ao carregar o script VLibras.');
    };
    
    document.body.appendChild(script);
    
    return () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
    };
  }, []);

  return (
    <div id="vlibras" data-vw="true">
      <div className="vlibras"></div>
    </div>
  );
}