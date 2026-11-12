// Preencher com a URL /exec de um Google Apps Script Web App que grave na planilha.
const NEWSLETTER_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyJXWCAh-71OR7k_zrXQmoYnR-vqPAruMR91Eh2ZooeMjsyPW38E948gw5DsPHQrpT0GQ/exec';
const form = document.querySelector('#signup-form');
const email = document.querySelector('#email');
const status = document.querySelector('#form-status');

if (form && email && status) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = email.value.trim();
    status.classList.remove('error');

    if (!value || !email.validity.valid) {
      status.textContent = 'Digite um e-mail válido para continuar.';
      status.classList.add('error');
      email.focus();
      return;
    }

    if (!NEWSLETTER_ENDPOINT) {
      status.textContent = 'O formulário está pronto, mas o envio ainda precisa ser conectado à planilha.';
      status.classList.add('error');
      return;
    }

    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Enviando…';
    status.textContent = '';

    try {
      await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          email: value,
          data: new Date().toISOString(),
          origem: window.location.hostname || 'diariovoce.com'
        })
      });
      window.location.assign('/obrigado');
    } catch (error) {
      button.disabled = false;
      button.textContent = 'Quero receber ↗';
      status.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
      status.classList.add('error');
    }
  });
}
