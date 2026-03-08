
document.addEventListener('DOMContentLoaded', () => {

    function atualizarRelogio() {
        const agora = new Date();
        const display = agora.toLocaleTimeString('pt-BR', { hour12: false });
        const elementoRelogio = document.getElementById("relogio") || document.getElementById("time");
        if (elementoRelogio) elementoRelogio.textContent = display;
    }
    setInterval(atualizarRelogio, 1000);
    atualizarRelogio();

    const btnTheme = document.querySelector('.btn-theme');
    const body = document.body;

    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                localStorage.setItem('dark-mode', 'disabled');
            }
        });
    }
});