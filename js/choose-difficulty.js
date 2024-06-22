const electricity = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.875 16.0821L1.91813 1.1252L1.125 1.91833L4.725 5.52395L3.9375 8.87083C3.91765 8.95467 3.91733 9.04196 3.93656 9.12595C3.95579 9.20994 3.99406 9.28839 4.04842 9.35525C4.10277 9.4221 4.17176 9.47558 4.25006 9.51155C4.32835 9.54752 4.41387 9.56502 4.5 9.5627H7.21688L6.1875 16.2283C6.16892 16.3519 6.19201 16.4781 6.25312 16.5871C6.31423 16.6961 6.40989 16.7816 6.525 16.8302C6.5965 16.8592 6.67284 16.8745 6.75 16.8752C6.8359 16.875 6.92062 16.8551 6.99765 16.8171C7.07468 16.7791 7.14197 16.7239 7.19438 16.6558L10.9519 11.7452L16.0819 16.8752L16.875 16.0821ZM12.6731 9.48958L14.5069 7.09333C14.566 7.0134 14.6028 6.91923 14.6137 6.82042C14.6246 6.72162 14.6091 6.62169 14.5687 6.53083C14.5265 6.4309 14.4562 6.34533 14.3663 6.28445C14.2765 6.22357 14.171 6.18997 14.0625 6.1877H11.3906L12.375 1.81145C12.3936 1.72844 12.3932 1.64228 12.3737 1.55946C12.3542 1.47664 12.3162 1.39932 12.2625 1.33333C12.2084 1.26656 12.1397 1.21309 12.0617 1.17701C11.9837 1.14093 11.8984 1.12321 11.8125 1.1252H6.1875C6.05824 1.12175 5.93174 1.16293 5.82929 1.24181C5.72684 1.3207 5.65469 1.43248 5.625 1.55833L5.45625 2.28958L12.6731 9.48958Z" fill="currentColor"></path></svg>';

const difficultyEasy = 7;
const difficultyNormal = 4;
const difficultyHard = 1;

let difficulty = difficultyNormal;

const showChooseDifficulty = () => {
    const difficultyWrapper = document.createElement('div');
    difficultyWrapper.classList.add('difficulty-wrapper');

    const difficultyHeading = document.createElement('h2');
    const difficultyHeadingWrapper = document.createElement('div');
    difficultyHeadingWrapper.classList.add('difficulty-heading-wrapper');

    const difficultySpan = document.createElement('span');
    const difficultySpanWrapper = document.createElement('div');
    difficultySpanWrapper.classList.add('difficulty-span-wrapper');

    const difficultySlider = document.createElement('tc-range-slider');
    const difficultySliderWrapper = document.createElement('div');
    difficultySliderWrapper.classList.add('difficulty-slider-wrapper');

    difficultySlider.addEventListener('change', (e) => {
        switch (difficultySlider.value) {
            case 'Песиміст': difficulty = difficultyEasy; break;
            case 'Реаліст': difficulty = difficultyNormal; break;
            case 'Оптиміст': difficulty = difficultyHard; break;
        }
        difficultySpan.innerHTML = electricity.repeat(difficulty);
    });

    difficultySlider.setAttribute('data', 'Песиміст, Реаліст, Оптиміст');
    difficultySlider.setAttribute('value', 'Реаліст');

    difficultySlider.setAttribute('mousewheel-disabled', 'true');

    difficultySlider.setAttribute('marks', 'true');
    difficultySlider.setAttribute('marks-count', 3);
    difficultySlider.setAttribute('marks-values-count', 3);

    difficultySlider.setAttribute('theme', 'rect');
    difficultySlider.setAttribute('css-links', './css/libraries/tcrs-themes.min.css');

    difficultySlider.setAttribute('slider-width', '100%');

    difficultySlider.setAttribute('slider-bg', 'var(--enabled-secondary-color)');
    difficultySlider.setAttribute('slider-bg-hover', 'var(--enabled-secondary-color)');
    difficultySlider.setAttribute('slider-bg-fill', 'var(--enabled-primary-color)');

    difficultySlider.setAttribute('pointer-bg', 'var(--enabled-primary-color)');
    difficultySlider.setAttribute('pointer-bg-hover', 'var(--enabled-primary-color)');
    difficultySlider.setAttribute('pointer-bg-focus', 'var(--enabled-primary-color)');

    difficultyHeading.innerHTML = 'Оберіть складність';

    difficultyHeadingWrapper.appendChild(difficultyHeading);
    difficultySpanWrapper.appendChild(difficultySpan);
    difficultySliderWrapper.appendChild(difficultySlider);

    difficultyWrapper.appendChild(difficultyHeadingWrapper);
    difficultyWrapper.appendChild(difficultySpanWrapper);
    difficultyWrapper.appendChild(difficultySliderWrapper);

    const tingleChooseDifficulty = new tingle.modal({footer: true, closeMethods: []});
    tingleChooseDifficulty.setContent(difficultyWrapper);
    tingleChooseDifficulty.addFooterBtn('Розпочати борошна', 'tingle-btn difficulty-button-choose', (e) => {
        tingleChooseDifficulty.close();
        startGame();
    });
    tingleChooseDifficulty.open();
};

document.addEventListener('DOMContentLoaded', showChooseDifficulty);
