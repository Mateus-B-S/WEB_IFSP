````markdown
# Referência Rápida - CSS & Bootstrap

## Pasta CSS:
**`/App/Src/Front_End/Publico/css/style.css`**

## Como Usar nos Templates:

```html
<!-- Adicione no <head> -->
<link href="/css/style.css" rel="stylesheet">
```

## Variáveis CSS Principais

```css
/* Cores */
var(--primary)              /* #6dd5ed - Azul claro */
var(--primary-dark)         /* #2193b0 - Azul escuro */
var(--text-dark)            /* #212529 - Texto escuro */
var(--text-light)           /* #6c757d - Texto cinza */

/* Espaçamento */
var(--gap-sm)              /* 8px */
var(--gap-md)              /* 12px */
var(--gap-lg)              /* 18px */
var(--gap-xl)              /* 24px */

/* Transições */
var(--transition-sm)        /* 0.2s ease */
var(--transition-md)        /* 0.28s ease */
var(--transition-lg)        /* 0.42s ease */

/* Sombras */
var(--shadow-md)            /* Sombra normal */
var(--shadow-lg)            /* Sombra grande */
var(--shadow-xl)            /* Sombra extra grande */
```

## Classes Principais

### Cards
```html
<div class="cards-grid">               <!-- Grid de cards -->
    <div class="card">                 <!-- Card individual -->
        <div class="card-header bg-light">    <!-- Topo -->
            <div class="avatar">A</div>       <!-- Avatar 56x56 -->
            <div class="card-title">Título</div>
        </div>
        <div class="card-body">        <!-- Conteúdo -->
            <p class="card-text">Texto</p>
        </div>
        <div class="card-footer bg-light">    <!-- Rodapé -->
            <button class="btn btn-primary">Botão</button>
        </div>
    </div>
</div>
```

### Avatar Grande
```html
<div class="avatar large">A</div>  <!-- 160x160px -->
```

### Modal
```html
<div class="modal-backdrop">        <!-- Fundo escuro -->
    <div class="modal">              <!-- Modal container -->
        <div class="modal-inner">
            <div class="modal-avatar">A</div>
            <div class="modal-content">
                <h3>Título</h3>
                <p>Conteúdo</p>
            </div>
        </div>
    </div>
</div>
```

### Tabelas
```html
<div class="table-responsive">
    <table class="responsive-table">
        <thead>
            <tr>
                <th>Coluna 1</th>
                <th>Coluna 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td data-label="Coluna 1">Dado 1</td>
                <td data-label="Coluna 2">Dado 2</td>
            </tr>
        </tbody>
    </table>
</div>
```

### Formulários
```html
<div class="form-group">
    <label for="campo">Label</label>
    <input type="text" id="campo" class="form-control">
</div>
```

### Botões (Bootstrap)
```html
<button class="btn btn-primary">Primário</button>
<button class="btn btn-secondary">Secundário</button>
<button class="btn btn-danger">Perigo</button>
<button class="btn btn-primary btn-sm">Pequeno</button>
<button class="btn btn-primary w-100">Largura 100%</button>
```

### Utilitários
```html
<p class="text-muted">Texto cinza</p>
<p class="text-center">Centralizado</p>
<div class="mb-2">Margem embaixo</div>
<div class="mt-3">Margem em cima</div>
<div class="bg-light">Fundo claro</div>
<div class="w-100">Largura 100%</div>
```

## Exemplos Práticos

### Exemplo 1: Card de Animal (adoções)
```html
<div class="card">
    <div class="card-header bg-light">
        <div class="card-header-custom">
            <div class="avatar">P</div>
            <div>
                <h5 class="card-title mb-1">Pipoca</h5>
                <p class="card-text text-muted mb-0" style="font-size:13px">
                    <strong>Raça:</strong> Persa
                </p>
            </div>
        </div>
    </div>
    <div class="card-body"></div>
    <div class="card-footer bg-light">
        <form action="/adotar" method="POST">
            <button type="submit" class="btn btn-primary w-100">Adotar</button>
        </form>
    </div>
</div>
```

### Exemplo 2: Modal
```html
<div class="modal-backdrop">
    <div class="modal">
        <div class="modal-inner">
            <div class="modal-avatar">F</div>
            <div class="modal-content">
                <h3>Fluffy</h3>
                <p><strong>Raça:</strong> Persa</p>
                <p><strong>Tipo:</strong> Gato</p>
                <div class="modal-actions">
                    <button class="btn btn-primary btn-sm">Adotar</button>
                    <button class="btn btn-secondary btn-sm">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Exemplo 3: Seção Admin
```html
<div class="section">
    <button class="accordion">Animais</button>
    <div class="panel">
        <!-- Conteúdo -->
    </div>
</div>
```

## Responsividade

| Tamanho | Width | Breakpoint |
|---------|-------|-----------|
| Mobile | até 600px | `@media (max-width: 600px)` |
| Tablet | 600-960px | `@media (max-width: 960px)` |
| Desktop | 960px+ | Sem media query |

## Como Editar CSS

### Encontrar algo
1. Abra `/App/Src/Front_End/Publico/css/style.css`
2. Use Ctrl+F para procurar a classe
3. Encontre na seção apropriada

### Editar cores
1. Vá à seção **2. Variáveis & Cores**
2. Mude o valor da variável `--color-name`

### Editar espaçamento
1. Vá à seção **2. Variáveis & Cores**
2. Mude o valor de `--gap-*`

### Adicionar nova classe
1. Vá à seção apropriada
2. Copie uma classe similar
3. Adapte para suas necessidades

## Bootstrap Classes Úteis

```html
<!-- Margins -->
m-0 m-1 m-2 m-3       <!-- margin -->
mt-2 mb-2 ml-2 mr-2   <!-- margin direções -->

<!-- Padding -->
p-0 p-1 p-2 p-3       <!-- padding -->
pt-2 pb-2 pl-2 pr-2   <!-- padding direções -->

<!-- Display -->
d-flex d-grid d-block d-none

<!-- Flex -->
justify-content-center align-items-center flex-column

<!-- Grid -->
col-sm-6 col-md-4 col-lg-3

<!-- Colors -->
text-primary text-secondary text-danger text-success
bg-light bg-dark bg-primary

<!-- Borders -->
border border-top border-primary rounded rounded-circle

<!-- Sizing -->
w-100 h-100 w-50 h-auto

<!-- Shadow -->
shadow shadow-sm shadow-lg

<!-- Text -->
text-center text-start text-end
text-uppercase text-lowercase text-capitalize
fw-bold fw-normal
```

## Debug

### Verificar variável CSS
```css
/* No DevTools da Página, teste: */
console.log(getComputedStyle(document.documentElement).getPropertyValue('--primary'));
```

### Verificar se CSS está carregando
1. Abra DevTools (F12)
2. Vá para "Sources"
3. Procure por `style.css`
4. Verifique se está em `/css/style.css`

## 

- **Documentação completa**: `/App/Src/Front_End/Publico/css/sumario.md`
- **Estrutura detalhada**: `/App/Src/Front_End/Publico/css/indice.md`
- **Bootstrap oficial**: https://getbootstrap.com/
```