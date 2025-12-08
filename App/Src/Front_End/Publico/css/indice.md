# Estrutura de CSS - App Animais ao Resgate

## Localização
`/App/Src/Front_End/Publico/css/style.css`

## Índice do Arquivo CSS

### 1. **Reset & Base**
- Reset padrão de estilos
- Configuração básica de html e body

### 2. **Variáveis & Cores** `:root`
Define todas as cores e valores reutilizáveis:

```css
--primary: #6dd5ed
--primary-dark: #2193b0
--text-dark: #212529
--text-light: #6c757d
--avatar-gradient: linear-gradient(135deg, #6dd5ed, #2193b0)
```

**Como usar:**
```css
.meu-elemento {
    color: var(--text-dark);
    background: var(--primary-gradient);
}
```

### 3. **Tipografia**
- `body` - Fonte padrão
- `h1, h2, h3...` - Estilos de títulos
- `p` - Parágrafos

### 4. **Layout Geral**
- `.container-fluid` - Container principal
- `.section` - Seções de componentes

### 5. **Cards & Grids**
Classes reutilizáveis para cards:

```html
<!-- Grid de cards -->
<div class="cards-grid">
    <!-- Cards aqui -->
</div>

<!-- Card individual -->
<div class="card">
    <div class="card-header bg-light">
        <div class="card-header-custom">
            <div class="avatar">A</div>
            <div>
                <h5 class="card-title">Título</h5>
                <p class="card-text text-muted">Subtítulo</p>
            </div>
        </div>
    </div>
    <div class="card-body">Conteúdo</div>
    <div class="card-footer bg-light">
        Ações
    </div>
</div>

<!-- Avatar grande -->
<div class="avatar large">A</div>
```

### 6. **Modals & Overlays**
Classes para modais customizados:

```html
<div class="modal-backdrop">
    <div class="modal">
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

### 7. **Animações**
Classes para elementos animados:

```html
<!-- Clone animado para zoom -->
<div class="fly-clone to-modal">Conteúdo</div>
<div class="fly-clone from-modal">Conteúdo</div>
```

### 8. **Responsividade**
Breakpoints definidos:
- **Mobile**: até 600px
- **Tablet**: até 960px
- **Desktop**: 960px+

## 🎨 Paleta de Cores

| Variável | Cor | Uso |
|----------|-----|-----|
| `--primary` | #6dd5ed | Azul claro principal |
| `--primary-dark` | #2193b0 | Azul escuro |
| `--text-dark` | #212529 | Texto principal |
| `--text-light` | #6c757d | Texto secundário |
| `--border-light` | #dee2e6 | Borders |

## Como Usar

### No HTML
```html
<!-- Incluir o CSS -->
<link href="/css/style.css" rel="stylesheet">

<!-- Usar classes -->
<div class="cards-grid">
    <div class="card">
        <div class="card-header bg-light">
            <div class="avatar">A</div>
        </div>
    </div>
</div>
```

### Variáveis CSS
```css
.meu-elemento {
    color: var(--text-dark);
    gap: var(--gap-lg);
    transition: all var(--transition-md);
    box-shadow: var(--shadow-lg);
}
```

## Espaçamento

| Variável | Tamanho | Uso |
|----------|---------|-----|
| `--gap-sm` | 8px | Espaços pequenos |
| `--gap-md` | 12px | Espaços médios |
| `--gap-lg` | 18px | Espaços grandes |
| `--gap-xl` | 24px | Espaços extra grandes |

## Transições

| Variável | Duração | Uso |
|----------|---------|-----|
| `--transition-sm` | 0.2s | Hover rápido |
| `--transition-md` | 0.28s | Transições normais |
| `--transition-lg` | 0.42s | Animações suaves |

## Sombras

| Variável | Efeito | Uso |
|----------|--------|-----|
| `--shadow-sm` | Leve | Cards |
| `--shadow-md` | Médio | Elementos normais |
| `--shadow-lg` | Grande | Hover |
| `--shadow-xl` | Extra grande | Modals |

## Seções Específicas

### Admin (`admin.ejs`)
- `.sections` - Grid de seções
- `.section` - Seção individual
- `.accordion` - Botão accordion
- `.panel` - Painel expansível
- Layout responsivo com grid

### Veterinário (`veterinario.ejs`)
- `.form-group` - Grupos de formulário
- Tabelas responsivas
- Inputs com focus customizado

### Responsável (`responsavel.ejs`)
**Estlizações não definitivas**
- Cards com animações
- Modal com zoom
- Grid de cards responsivo

## Adicionar Novas Classes

Exemplo de como adicionar uma nova variante:

```css
/* Adicione em :root */
--color-success: #28a745;

/* Adicione a classe */
.btn-success {
    background: var(--color-success);
    color: #fff;
}

/* Documente aqui */
```

## Integração com Bootstrap

O projeto usa Bootstrap 5.3.8 + CSS customizado:
- Bootstrap fornece componentes base (`.btn`, `.form-control`, etc)
- `style.css` fornece customizações e componentes específicos