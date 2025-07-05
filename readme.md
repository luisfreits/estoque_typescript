# Sistema de Estoque em TypeScript

Este projeto foi desenvolvido como parte de um trabalho para a disciplina de Programação Comercial, ministrada pelo professor Fabrício. O objetivo era criar um software comercial simples utilizando TypeScript, com persistência de dados em arquivos JSON.

## Funcionalidades

- Adicionar novos produtos ao estoque
- Listar todos os produtos cadastrados
- Exibir informações detalhadas de um produto
- Alterar ou adicionar informações a um produto
- Alterar a quantidade de um produto
- Remover informações específicas de um produto
- Remover produtos do estoque
- Persistência automática dos dados em `produtos.json`

## Como executar

1. Instale as dependências:
   ```sh
   npm install
   ```

2. Inicie o sistema:
   ```sh
   npm start
   ```

## Estrutura dos arquivos

- `stockManager.ts`: Código principal do sistema.
- `produtos.json`: Arquivo onde os produtos são armazenados.
- `package.json`: Configurações do projeto e dependências.
- `tsconfig.json`: Configuração do compilador TypeScript.

## Dificuldades enfrentadas

- **Configuração do ambiente:** Foi necessário ajustar o ambiente para rodar TypeScript no terminal, incluindo a instalação e configuração do `ts-node` e do `typescript`.
- **Leitura de entrada:** Inicialmente foi tentado usar o módulo `readline`, mas devido a limitações e complexidade, optou-se por utilizar o `prompt-sync` para facilitar a entrada de dados pelo terminal.
- **Organização das dependências:** Houve a necessidade de organizar corretamente os arquivos de configuração e dependências, como o `package.json` e o `tsconfig.json`, para garantir o funcionamento do projeto e a persistência dos dados em arquivos `.json`.

## Autores

- [luisfreits](https://github.com/luisfreits)
- [heitor0846](https://github.com/heitor0846)

---

Desenvolvido para fins acadêmicos e de prática com TypeScript e manipulação de arquivos.