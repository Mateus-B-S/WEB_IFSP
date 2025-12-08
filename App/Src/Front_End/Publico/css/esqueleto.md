````markdown

### 1. **Componentes Bootstrap Utilizados**

#### responsavel.ejs
```html
<!-- Cards com Bootstrap -->
<div class="card">
    <div class="card-header bg-light">
        <div class="avatar">A</div>
    </div>
    <div class="card-body">Conteúdo</div>
    <div class="card-footer bg-light">
        <button class="btn btn-primary btn-sm">Adotar</button>
    </div>
</div>

<!-- Grid responsivo -->
<div class="cards-grid"><!-- Cards aqui --></div>

<!-- Modal customizado -->
<div class="modal-backdrop">
    <div class="modal"><!-- Conteúdo --></div>
</div>
```

#### veterinario.ejs
```html
<!-- Tabelas Bootstrap -->
<div class="table-responsive">
    <table class="responsive-table">
        <thead><!-- Header --></thead>
        <tbody><!-- Dados --></tbody>
    </table>
</div>

<!-- Formulários Bootstrap -->
<form>
    <div class="form-group">
        <label for="id_animal">ID do Animal</label>
        <input type="number" id="id_animal" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-primary">Enviar</button>
</form>
```

### 2. **Variáveis CSS Centralizadas**

```css
:root {
    /* Cores */
    --primary: #6dd5ed
    --text-dark: #212529
    
    /* Espaçamento */
    --gap-md: 12px
    --gap-lg: 18px
    
    /* Transições */
    --transition-md: 0.28s ease
    
    /* Sombras */
    --shadow-lg: 0 12px 24px rgba(0,0,0,0.12)
}
```

**Como usar:**
```css
.elemento {
    color: var(--text-dark);
    gap: var(--gap-lg);
    transition: all var(--transition-md);
}
```

## Como Usar

### 1. Incluir o CSS nos templates
```html
<link href="/css/style.css" rel="stylesheet">
```

### 2. Usar variáveis
```css
.meu-elemento {
    background: var(--primary-gradient);
    color: var(--text-dark);
    padding: var(--gap-lg);
    transition: all var(--transition-md);
}
```

### 3. Usar classes Bootstrap
```html
<button class="btn btn-primary btn-sm w-100">Clique</button>
<div class="card bg-light">...</div>
<p class="text-muted mb-2">Texto</p>
```