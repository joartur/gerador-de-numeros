# Gerador de Números Aleatórios – Next.js

Este projeto é um gerador de números aleatórios, desenvolvido em Next.js com React, que permite ao usuário sortear números dentro de um intervalo definido, exibindo o histórico dos números já sorteados de forma visual, responsiva e intuitiva.

## Funcionalidades

- **Intervalo Personalizado:** O usuário define o número mínimo ("De") e o número máximo ("Até") para o sorteio.
- **Dois Modos de Sorteio:**  
  - **Manual:** Sorteie um número por vez, clicando no botão "Sortear".
  - **Automático:** Clique em "Sortear Automaticamente" para sortear um número a cada 20 segundos até o fim do intervalo ou até pausar/parar.
- **Controles no Modo Automático:**  
  - **Pausar/Retomar:** Permite interromper e continuar o sorteio automático.
  - **Parar:** Cancela o sorteio automático, exibe mensagem de cancelamento e permite reiniciar.
- **Áudio Dinâmico:**  
  - O navegador anuncia em voz alta cada número sorteado.
  - Para o primeiro número: "Primeiro número (número)"
  - Para os demais: "Número sorteado foi (número)"
  - A cada 10 números sorteados, anuncia: "Foram sortados (n) dezenas"
- **Exibição Destacada:** O último número sorteado é exibido em destaque.
- **Histórico Visual:** Números anteriores exibidos em grid.
- **Responsivo:** Layout mobile first e otimizado para telas grandes (>1200px).
- **Validação de Intervalo:** O sorteio só é permitido se o valor mínimo for menor ou igual ao máximo.
- **Contadores:**  
  - Mostra quantos números foram sorteados e quantos faltam.
  - Exibe mensagem ao sortear todos os números.

## Pré-requisitos

- Node.js (recomenda-se a versão 18 ou superior)
- npm ou yarn

## Como clonar e rodar a aplicação

1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/joartur/gerador-de-numeros.git](https://github.com/joartur/gerador-de-numeros.git)
   cd gerador-de-numeros
   ```

2. **Instale as dependências:**

   Com npm:
   ```bash
   npm install
   ```

   Ou com yarn:
   ```bash
   yarn
   ```

3. **Execute a aplicação em modo de desenvolvimento:**

   Com npm:
   ```bash
   npm run dev
   ```

   Ou com yarn:
   ```bash
   yarn dev
   ```

4. **Acesse no navegador:**

   Abra [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## Estrutura do Projeto

- O código principal está no arquivo `app/page.tsx` (para projetos Next.js 13+ com App Router).
- Todo o layout, lógica de sorteio, histórico, áudio e controles estão nesse componente.
- O estilo é feito via CSS-in-JS (inline) e classes CSS para responsividade.

## Detalhes sobre o Áudio

- Utiliza a [Web Speech API (SpeechSynthesis)](https://developer.mozilla.org/pt-BR/docs/Web/API/SpeechSynthesis) para anunciar os números sorteados.
- É necessário que o navegador tenha suporte e permissão para áudio.
- O áudio é em português do Brasil ("pt-BR").

## Customização

- Para mudar as cores ou o layout, altere os estilos inline ou as classes CSS no arquivo principal.
- Para alterar o intervalo permitido, ajuste os valores de "De" e "Até" nos inputs.
- Para resetar o histórico, basta mudar os valores dos inputs ou clicar em "Começar novamente" após cancelar o sorteio automático.

## Dúvidas ou sugestões?

Abra uma issue no repositório ou contribua com um Pull Request!

---

## Em Produção

https://sortearnumeros.vercel.app/

---
````
