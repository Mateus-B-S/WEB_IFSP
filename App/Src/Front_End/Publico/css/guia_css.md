## Arquivos CSS Principais para não se perder

### 1. `style.css` - Arquivo Principal

```
style.css
│
├─ 1. Reset & Base
│  └─ Reset de estilos padrão
│
├─ 2. Variáveis & Cores (:root)
│  ├─ Cores da paleta
│  ├─ Gradientes
│  ├─ Espaçamento
│  ├─ Transições
│  └─ Sombras
│
├─ 3. Tipografia
│  ├─ body
│  ├─ h1, h2, h3...
│  └─ Elementos de texto
│
├─ 4. Layout Geral
│  ├─ .container-fluid
│  └─ .section
│
├─ 5. Cards & Grids
│  ├─ .cards-grid
│  ├─ .card
│  ├─ .card-header-custom
│  ├─ .avatar (e .avatar.large)
│  ├─ .card-body
│  ├─ .card-footer
│  ├─ .card-title
│  └─ .card-text
│
├─ 6. Modals & Overlays
│  ├─ .modal-backdrop
│  ├─ .modal
│  ├─ .modal-inner
│  ├─ .modal-avatar
│  ├─ .modal-content
│  ├─ .modal-actions
│  └─ .close-btn
│
├─ 7. Animações
│  ├─ .fly-clone
│  ├─ .fly-clone.to-modal
│  └─ .fly-clone.from-modal
│
├─ 8. Responsividade
│  ├─ @media (max-width: 600px)
│  ├─ @media (max-width: 960px)
│  └─ @media (max-width: 800px)
│
├─ Admin Específico
│  ├─ .sections
│  ├─ .section + .section.open
│  ├─ .accordion
│  ├─ .panel
│  ├─ .table-responsive
│  └─ table.responsive-table
│
├─ Veterinário Específico
│  ├─ .form-group
│  ├─ inputs, textarea, select
│  └─ focus states
│
└─ Utilitários
   ├─ .text-muted
   ├─ .text-center
   ├─ .mb-*, .mt-*
   ├─ .w-100
   └─ .bg-light
```

## Variáveis (:root)

### Cores
```css
--primary: #6dd5ed              /* Azul claro */
--primary-dark: #2193b0         /* Azul escuro */
--primary-gradient: linear-gradient(90deg, #6dd5ed, #2193b0)

--bs-primary: #0d6efd           /* Bootstrap primary */
--bs-primary-dark: #0b5ed7
--bs-secondary: #6c757d
--bs-light: #f8f9fa
--bs-light-border: #dee2e6

--text-dark: #212529
--text-light: #6c757d
--bg-light: #f8f9fa
--border-light: #dee2e6

--avatar-gradient: linear-gradient(135deg, #6dd5ed, #2193b0)
--avatar-gradient-alt: linear-gradient(135deg, #ffd194, #d1913c)
```

### Espaçamento
```css
--gap-sm: 8px
--gap-md: 12px
--gap-lg: 18px
--gap-xl: 24px
```

### Transições
```css
--transition-sm: 0.2s ease
--transition-md: 0.28s ease
--transition-lg: 0.42s ease
```

### Sombras
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08)
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08)
--shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.12)
--shadow-xl: 0 20px 60px rgba(2, 10, 30, 0.4)
```

### Border Radius
```css
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
```

## Arquivos que Usam o CSS

### Arquivos `.ejs` (Templates EJS)
- `App/Src/Front_End/Views/Perfil/responsavel.ejs`
  - Link: `<link href="/css/style.css" rel="stylesheet">`
  - Usa: Cards, Grids, Modals, Animações
  
- `App/Src/Front_End/Views/Perfil/admin.ejs`
  - Link: `<link href="/css/style.css" rel="stylesheet">`
  - Usa: Sections, Accordion, Tables
  
- `App/Src/Front_End/Views/Perfil/veterinario.ejs`
  - Link: `<link href="/css/style.css" rel="stylesheet">`
  - Usa: Forms, Tables, Componentes Bootstrap

### Arquivos `.html` (HTML Estático)
- `App/Src/Front_End/Publico/inicial.html`
  - Link: `<link href="/css/style.css" rel="stylesheet">`
  - Usa: Botões, Layout

## Como Encontrar Algo?

### Cores:
→ Vá para `style.css`, seção **2. Variáveis & Cores**

### Spacing/gap:
→ Vá para `style.css`, seção **2. Variáveis & Cores** (variáveis `--gap-*`)

### Cards:
→ Vá para `style.css`, seção **5. Cards & Grids**

### Responsividade:
→ Vá para `style.css`, seção **8. Responsividade**

### Animações:
→ Vá para `style.css`, seção **7. Animações**

### Tabelas admin:
→ Vá para `style.css`, seção **Admin Específico**

### Formulários veterinário:
→ Vá para `style.css`, seção **Veterinário Específico**

## Adicionão de Novas Classes:

### 1. Seções
```
Cor → Seção 2 (Variáveis)
Layout → Seção 4 (Layout Geral)
Card → Seção 5 (Cards & Grids)
Animação → Seção 7 (Animações)
```

### 2. Adicionar a Classe:
```css
/* Local do código */
.nova-classe {
    /* estilos aqui */
}
```

### 3. Usar no HTML
```html
<div class="nova-classe">Conteúdo</div>
```

### 4. Documentar (se necessário)
Atualizar o `README.md` para classes importantes.

## Integração com Bootstrap

```
Bootstrap 5.3.8 CDN
        ↓
   Fornece componentes base
   (.btn, .card, .form-control, etc)
        ↓
    style.css
        ↓
   Customiza + Adiciona componentes
```

## Links de Referência

- **Bootstrap Docs**: https://getbootstrap.com/docs/5.3/
- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/var()
- **CSS Grid**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
- **CSS Flexbox**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout

## Checklist para Manutenção

- Sempre usar variáveis CSS (`var(--nome)`)
- Manter consistência de cores com paleta definida
- Usar espaçamento com `--gap-*`
- Respeitar breakpoints existentes
- Testar em mobile (600px), tablet (960px), desktop (1400px)
- Adicionar comentários em código complexo
- Documentar novas variáveis no `:root`
- Atualizar README.md se adicionar novas classes