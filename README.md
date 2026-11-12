# Diário Você — pacote para GitHub Pages

Este pacote contém a landing page estática da newsletter Diário Você, pronta para subir na raiz de um repositório GitHub Pages. O arquivo `CNAME` já está configurado para `diariovoce.com`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie **o conteúdo desta pasta** para a raiz da branch `main`.
2. Em **Settings → Pages**, selecione **Deploy from a branch**, escolha `main` e a pasta `/ (root)`.
3. Em **Custom domain**, informe `diariovoce.com` e salve. O arquivo `CNAME` já foi incluído.
4. No provedor do domínio, aponte `@` para os IPs do GitHub Pages ou use o CNAME recomendado pelo GitHub para `www`. Aguarde a propagação e ative **Enforce HTTPS** quando aparecer disponível.

A página principal está em `/`. As páginas auxiliares são `/privacidade` e `/obrigado`.

## Ativar o cadastro na planilha

O site não deve receber credenciais do Google no navegador. O arquivo `google-apps-script/Code.gs` contém um endpoint seguro para gravar as inscrições na planilha autorizada.

1. Abra [script.google.com](https://script.google.com), crie um projeto e cole o conteúdo de `google-apps-script/Code.gs`.
2. Em **Deploy → New deployment**, escolha **Web app**.
3. Em **Execute as**, escolha sua conta. Em **Who has access**, escolha **Anyone**.
4. Copie a URL que termina em `/exec`.
5. Abra `script.js` e substitua:

```js
const NEWSLETTER_ENDPOINT = '';
```

por:

```js
const NEWSLETTER_ENDPOINT = 'COLE_A_URL_EXEC_AQUI';
```

6. Envie novamente `script.js` ao GitHub. Depois de publicar, o formulário grava `e-mail`, `data de inscrição` e `origem` na aba `Página1` e redireciona para `/obrigado`.

O projeto do Apps Script usa o ID da planilha que foi informado para este site. Se você duplicar a planilha, atualize `SPREADSHEET_ID` em `Code.gs` antes de publicar o Web App.
