const showGameOver = () => {
    timer = false;

    const gameOverWrapper = document.createElement('div');
    gameOverWrapper.classList.add('game-over-wrapper');

    const gameOverHeading = document.createElement('h2');
    const gameOverHeadingWrapper = document.createElement('div');
    gameOverHeadingWrapper.classList.add('game-over-heading-wrapper');

    const gameOverSpan = document.createElement('span');
    const gameOverSpanWrapper = document.createElement('div');
    gameOverSpanWrapper.classList.add('game-over-span-wrapper');

    gameOverHeading.innerHTML = 'Ви протрималися без енергохарчування';
    gameOverSpan.innerHTML = `${minutes} хв ${seconds} сек`;

    gameOverHeadingWrapper.appendChild(gameOverHeading);
    gameOverSpanWrapper.appendChild(gameOverSpan);

    gameOverWrapper.appendChild(gameOverHeadingWrapper);
    gameOverWrapper.appendChild(gameOverSpanWrapper);

    const tingleGameOver = new tingle.modal({footer: true, closeMethods: []});
    tingleGameOver.setContent(gameOverWrapper);
    tingleGameOver.addFooterBtn('Перезавантажити', 'tingle-btn game-over-button-reload', (e) => {window.location.reload(true);});
    tingleGameOver.open();
};
