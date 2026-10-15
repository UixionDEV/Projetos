# Casa Alta

Homepage responsiva para uma imobiliária premium, com curadoria de imóveis e captação de contatos.

## Desenvolvimento

```sh
npm install
npm run dev
```

O Vite informa o endereço local no terminal. Para validar a versão de produção:

```sh
npm run build
```

## Imagens e formulário

As fotografias demonstrativas são carregadas do Unsplash por URL, com recortes definidos por seção e carregamento tardio nas imagens de imóveis. Antes de publicar, confirme a licença e os termos vigentes para cada imagem, registre os créditos necessários e, idealmente, hospede versões WebP/AVIF responsivas no domínio do projeto.

O formulário valida os campos no navegador e exibe uma confirmação local. Ele ainda não envia dados para um serviço ou backend.

## Identidade provisória

Casa Alta é um nome temporário. A tipografia usa Cormorant Garamond e DM Sans via Google Fonts; se for necessário operar sem dependências externas, disponibilize fontes locais e imagens otimizadas no projeto.