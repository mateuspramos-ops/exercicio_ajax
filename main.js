// ══════════════════════════════════════════════════════
// main.js — Requisição Ajax para a API pública do GitHub
// Módulo 23 — Fetch API com try/catch
// ══════════════════════════════════════════════════════

// Usuário do GitHub que será buscado
const GITHUB_USER = 'mateuspramos-ops';

// URL da API pública do GitHub
const API_URL = `https://api.github.com/users/${GITHUB_USER}`;

// ── Referências aos elementos do DOM ──
const avatar    = document.getElementById('profile-avatar');
const name      = document.getElementById('profile-name');
const username  = document.getElementById('profile-username');
const repos     = document.getElementById('profile-repos');
const followers = document.getElementById('profile-followers');
const following = document.getElementById('profile-following');
const link      = document.getElementById('profile-link');

// ══════════════════════════════════════
// Função: preenche o DOM com os dados
// ══════════════════════════════════════
function preencherPerfil(data) {
    avatar.src          = data.avatar_url;
    avatar.alt          = `Avatar de ${data.login}`;
    name.textContent    = data.name || data.login;
    username.textContent = `@${data.login}`;
    repos.textContent   = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;
    link.href           = data.html_url;
}

// ══════════════════════════════════════
// Função: exibe mensagem de erro no DOM
// ══════════════════════════════════════
function exibirErro(mensagem) {
    name.textContent     = 'Erro ao carregar';
    username.textContent = mensagem;
    repos.textContent    = '—';
    followers.textContent = '—';
    following.textContent = '—';
}

// ══════════════════════════════════════
// MÉTODO 1: Fetch API com try/catch
// ══════════════════════════════════════
async function buscarPerfilFetch() {
    try {
        // Faz a requisição à API do GitHub
        const response = await fetch(API_URL);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Preenche o perfil com os dados recebidos
        preencherPerfil(data);

    } catch (error) {
        // Exibe o erro no console e no DOM
        console.error('Fetch API — erro:', error.message);
        exibirErro(error.message);
    }
}

// ══════════════════════════════════════
// MÉTODO 2: XMLHttpRequest (alternativo)
// ══════════════════════════════════════
function buscarPerfilXHR() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', API_URL);

    xhr.onload = function () {
        try {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                preencherPerfil(data);
            } else {
                throw new Error(`Erro XHR: ${xhr.status} ${xhr.statusText}`);
            }
        } catch (error) {
            console.error('XMLHttpRequest — erro:', error.message);
            exibirErro(error.message);
        }
    };

    xhr.onerror = function () {
        const mensagem = 'Falha na conexão com a API.';
        console.error(mensagem);
        exibirErro(mensagem);
    };

    xhr.send();
}

// ══════════════════════════════════════
// Inicialização — usa Fetch API
// (trocar para buscarPerfilXHR() para
//  usar o método XMLHttpRequest)
// ══════════════════════════════════════
buscarPerfilFetch();
