// script.js

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const wordListItems = document.querySelectorAll('.word-list .word');
    let isSelecting = false;
    let selectedCells = [];

    grid.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'SPAN') {
            isSelecting = true;
            selectCell(e.target);
            selectedCells = [e.target];
        }
    });

    grid.addEventListener('mouseover', (e) => {
        if (isSelecting && e.target.tagName === 'SPAN') {
            if (!selectedCells.includes(e.target)) {
                selectCell(e.target);
                selectedCells.push(e.target);
            }
        }
    });

    grid.addEventListener('mouseup', () => {
        isSelecting = false;
        checkWord(selectedCells);
        selectedCells = [];
    });

    function selectCell(cell) {
        cell.classList.toggle('selected');
    }

    function checkWord(cells) {
        if (cells.length === 0) return;

        const word = cells.map(cell => cell.textContent).join('');
        const words = ['SEMENTE', 'PLANTIO', 'COLHEITA', 'HORTA', 'FAZENDA', 'SOLO', 'ANIMAL', 'TRACTOR', 'CULTIVO', 'ADUBO', 'TOMATE', 'PORCO'];

        // Remove a classe 'selected' de todas as células antes de destacar
        document.querySelectorAll('.grid span').forEach(span => {
            span.classList.remove('selected');
        });

        // Verifica se a palavra é válida
        if (words.includes(word)) {
            cells.forEach(cell => cell.classList.add('correct'));
            alert(`Você encontrou a palavra: ${word}`);

            // Atualiza a lista de palavras encontradas
            wordListItems.forEach(item => {
                if (item.textContent === word) {
                    item.classList.add('found');
                }
            });
        } else {
            // Desmarcar células se não for uma palavra válida
            cells.forEach(cell => cell.classList.remove('selected'));
        }
    }
});
