# Water Quality

Este projeto é uma aplicação web desenvolvida para monitorar e analisar a qualidade da água, utilizando Vue 3, TypeScript e Vite. O objetivo é fornecer uma interface intuitiva para visualização e gestão de dados relacionados à qualidade hídrica.

## Tecnologias Utilizadas

- **[Vue 3](https://vuejs.org/)**: Framework JavaScript progressivo para construção de interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática ao código.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build que oferece uma experiência de desenvolvimento rápida e eficiente para projetos web modernos.

## Estrutura do Projeto

```
water_quality/
├── .vscode/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── App.vue
│   └── main.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

- **`.vscode/`**: Configurações específicas do Visual Studio Code.
- **`public/`**: Arquivos públicos estáticos, como o `index.html`.
- **`src/`**: Contém o código-fonte da aplicação.
  - **`assets/`**: Recursos estáticos como imagens e estilos.
  - **`components/`**: Componentes reutilizáveis da interface.
  - **`views/`**: Páginas ou telas da aplicação.
  - **`App.vue`**: Componente raiz da aplicação.
  - **`main.ts`**: Ponto de entrada da aplicação.
- **`.gitignore`**: Arquivos e diretórios ignorados pelo Git.
- **`package.json`**: Dependências e scripts do projeto.
- **`tsconfig.json`**: Configurações do TypeScript.
- **`vite.config.ts`**: Configurações do Vite.

## Funcionalidades Principais

- Monitoramento em tempo real da qualidade da água.
- Visualização de dados históricos e atuais através de gráficos interativos.
- Alertas personalizados para parâmetros fora dos limites estabelecidos.
- Gestão de múltiplos pontos de monitoramento.

## Pré-requisitos

- Node.js versão 18.3 ou superior.
- npm (gerenciador de pacotes do Node.js).

## Como Executar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/daniSoares08/water_quality.git
```

2. **Navegue até o diretório do projeto:**

```bash
cd water_quality
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Execute o servidor de desenvolvimento:**

```bash
npm run dev
```

5. **Acesse a aplicação:**

Abra o navegador e acesse `http://localhost:5173/`.

## Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Compila a aplicação para produção.
- **`npm run preview`**: Pré-visualiza a build de produção.

## Deploy no Netlify

Este projeto está configurado para ser publicado no [Netlify](https://www.netlify.com/). As funções serverless ficam em `netlify/functions` e o arquivo `netlify.toml` já define o diretório de publicação e o comando de build.

Há uma função chamada `data` que recebe requisições `POST` com os novos valores de sensores e disponibiliza esses dados via `GET` para que o dashboard atualize os gráficos em tempo real. Os dados não são persistidos em banco de dados, sendo mantidos apenas em memória enquanto a função estiver ativa.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.

