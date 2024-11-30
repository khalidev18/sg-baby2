import { createBalloons } from './ballons.js';
import { setupMusic } from './music.js';

document.addEventListener('DOMContentLoaded', () => {
    createBalloons();
    setupMusic();
});