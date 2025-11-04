// Se a URL contém ?created=1, mostra um alerta de sucesso
(function() {
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('created') === '1') {
            window.alert('Responsável criado com sucesso! Faça o login para continuar.');
            // opcional: remover o query param do histórico para evitar alertas repetidos
            if (history.replaceState) {
                const url = new URL(window.location.href);
                url.searchParams.delete('created');
                history.replaceState({}, document.title, url.pathname + url.search + url.hash);
            }
        }
    } catch (e) {
        // ambiente antigo/navegador sem URLSearchParams: ignore
    }
})();

