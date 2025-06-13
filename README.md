````markdown name=TUTORIAL.md
# Gerador de Números Aleatórios – Next.js

Este projeto é um gerador de números aleatórios, desenvolvido em Next.js com React, que permite ao usuário sortear números dentro de um intervalo definido, exibindo o histórico dos números já sorteados de forma visual e intuitiva.

## Funcionalidades

- **Intervalo Personalizado:** O usuário define o número mínimo ("De") e o número máximo ("Até") para o sorteio.
- **Sorteio Único:** Cada número só pode ser sorteado uma vez. Não há repetições.
- **Exibição Destacada:** O último número sorteado é exibido em destaque com o rótulo "Último número sorteado".
- **Histórico Visual:** Os números anteriores são mostrados em uma grade de até 4 por linha.
- **Controle de Sorteio:** Quando todos os números do intervalo forem sorteados, o botão é desabilitado e a mensagem "Todos os números já foram sorteados" é exibida.
- **Validação de Intervalo:** O sorteio só é permitido se o valor mínimo for menor ou igual ao máximo.

## Pré-requisitos

- Node.js (recomenda-se a versão 18 ou superior)
- npm ou yarn

## Como clonar e rodar a aplicação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/joartur/gerador-de-numeros.git
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
- Todo o layout, lógica de sorteio e histórico estão nesse componente.
- O estilo é feito via CSS-in-JS (inline) para facilitar a customização.

## Customização

- Para mudar as cores ou o layout, basta alterar os estilos inline no arquivo principal.
- Para aumentar o intervalo permitido, altere os valores de `min` e `max`.
- Para resetar o histórico, basta mudar os valores de "De" ou "Até".

## Dúvidas ou sugestões?

Abra uma issue no repositório ou contribua com um Pull Request!

## Em Desenvolvimento

[https://sortearnumeros.vercel.app/](https://sortearnumeros.vercel.app/)

---
````
