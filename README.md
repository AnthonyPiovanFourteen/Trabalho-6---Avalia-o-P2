# GRUPO
## ANTHONY GABRIEL PIOVAN DOS SANTOS - RA1987602 
## WENDELL PEREIRA RIBEIRO - RA2004501 

# LINK DO VIDEO - https://youtu.be/cFek2ZwZQmg

# Catálogo Online de E-commerce com Vue.js

Bem-vindo ao Catálogo Online de E-commerce! Esta aplicação permite aos usuários visualizar produtos, buscar itens específicos, ordenar a listagem e ver detalhes de cada produto.

## Descrição

Este projeto é uma interface de frontend para um catálogo de produtos, construída com Vue.js 3, Vite, e estilizada com TailwindCSS (via CDN). Os dados dos produtos são consumidos em tempo real da API pública DummyJSON utilizando Axios.

## Funcionalidades Principais

* **Listagem de Produtos:** Exibe os produtos disponíveis em um layout de grade responsivo.
* **Busca de Produtos:** Permite buscar produtos por nome através de uma barra de busca localizada no cabeçalho.
* **Ordenação de Produtos:** Oferece opções para ordenar os produtos por diferentes critérios (preço, nome).
* **Paginação:** Permite navegar entre diferentes páginas de produtos.
* **Visualização de Detalhes do Produto:** Ao clicar em um produto, o usuário é direcionado para uma página com informações detalhadas sobre o item.

## Como Usar a Aplicação

Após iniciar a aplicação localmente (veja instruções abaixo), você poderá interagir com as seguintes funcionalidades no seu navegador:

### 1. Visualizando Produtos

* Ao abrir a aplicação, você será apresentado à página inicial com uma lista de produtos.
* Cada produto é exibido em um card individual, mostrando sua imagem principal, nome, categoria (se disponível nos dados do produto) e preço.

### 2. Buscando Produtos

* No topo da página, no cabeçalho azul, você encontrará uma barra de busca com o texto "Buscar produtos...".
* Digite o nome ou parte do nome do produto que deseja encontrar.
* A lista de produtos abaixo será atualizada automaticamente para mostrar apenas os itens que correspondem ao seu termo de busca.
* Para limpar a busca e ver todos os produtos novamente, apague o texto da barra de busca.
* A busca também atualiza a URL, permitindo que você compartilhe links com termos de busca específicos.

### 3. Ordenando Produtos

* Na página de listagem de produtos, logo acima da grade de produtos, você verá um menu dropdown (caixa de seleção) geralmente rotulado como "Ordenar por: Padrão".
* Clique neste dropdown para ver as opções de ordenação disponíveis, como:
    * Preço: Crescente
    * Preço: Decrescente
    * Nome: A-Z
    * Nome: Z-A
* Selecione uma opção, e a lista de produtos na página atual será reorganizada de acordo com o critério escolhido.

### 4. Navegando pelas Páginas (Paginação)

* Se houver mais produtos do que cabem em uma única página, controles de paginação aparecerão na parte inferior da lista de produtos.
* Você verá botões como "Anterior", "Próxima" e números de página.
* Clique em "Próxima" para ir para a próxima página de produtos, "Anterior" para voltar, ou em um número de página específico para pular diretamente para ela.
* A URL será atualizada para refletir a página atual que você está visualizando.

### 5. Vendo Detalhes de um Produto

* Na lista de produtos, clique em qualquer card de produto que lhe interesse.
* Você será redirecionado para uma página de detalhes específica para aquele produto.
* Nesta página, você encontrará:
    * Uma imagem maior do produto.
    * Nome completo, categoria e marca.
    * Preço detalhado, incluindo possíveis descontos.
    * Avaliação do produto (se disponível).
    * Informações de estoque.
    * Uma descrição completa do produto.
* Para retornar à lista principal de produtos, clique no link que geralmente diz "&larr; Voltar para a lista de produtos".

## Tecnologias Utilizadas

* **Vue.js 3:** Framework JavaScript progressivo para construção de interfaces de usuário.
* **Vite:** Ferramenta de build moderna e rápida para desenvolvimento frontend.
* **Vue Router:** Para gerenciamento de rotas e navegação entre páginas.
* **Axios:** Cliente HTTP baseado em Promises para fazer requisições à API.
* **TailwindCSS (via CDN):** Framework CSS utility-first para estilização rápida.
* **DummyJSON API:** API pública utilizada para fornecer os dados dos produtos.

## Configuração e Instalação (Para Desenvolvedores)

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS recomendada, que inclui npm)
* Um editor de código de sua preferência (ex: VS Code)
* Git (opcional, mas recomendado para controle de versão)

### Passos para Instalação

1.  **Clone o repositório (se estiver no GitHub):**
    ```bash
    git clone URL_DO_SEU_REPOSITORIO
    cd NOME_DA_PASTA_DO_PROJETO
    ```
    Se você tem os arquivos localmente, apenas navegue até a pasta raiz do projeto no seu terminal.

2.  **Instale as dependências do projeto:**
    Abra o terminal na pasta raiz do projeto e execute:
    ```bash
    npm install
    ```
    Este comando irá baixar e instalar todos os pacotes listados no arquivo `package.json` (como Vue, Vue Router, Axios).

### Rodando o Projeto em Desenvolvimento

1.  Após a instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento Vite:
    ```bash
    npm run dev
    ```
2.  O terminal mostrará uma mensagem indicando que o servidor está rodando, geralmente em `http://localhost:5173` (ou outra porta se a 5173 estiver ocupada).
3.  Abra este endereço no seu navegador para ver a aplicação em funcionamento. O servidor de desenvolvimento possui Hot Module Replacement (HMR), o que significa que as alterações no código são refletidas no navegador quase instantaneamente.

### Build para Produção (Opcional)

Quando você estiver pronto para fazer o deploy da sua aplicação, você pode criar uma versão otimizada para produção com o comando:
```bash
npm run build

