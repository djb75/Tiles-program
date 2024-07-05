const rows = 14;
const columns = 11;
const image1 = 'image1.jpg';
const image2 = 'image2.jpg';

// Function to create the matrix editor
function createMatrixEditor() {
    const matrixEditor = document.getElementById('matrix-editor');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = 0; // Default value
            input.className = 'matrix-input';
            input.id = `cell-${i}-${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        matrixEditor.appendChild(row);
    }
}

// Function to read the matrix from the editor
function readMatrixFromEditor() {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            const cellValue = document.getElementById(`cell-${i}-${j}`).value;
            row.push(parseInt(cellValue, 10));
        }
        matrix.push(row);
    }
    return matrix;
}

// Function to create the mosaic based on the matrix
function createMosaic(matrix, image1, image2) {
    const mosaicContainer = document.getElementById('mosaic');
    mosaicContainer.innerHTML = ''; // Clear previous mosaic
    matrix.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement('div');
            div.className = 'cell';
            div.style.backgroundImage = `url(${cell === 1 ? image1 : image2})`;
            mosaicContainer.appendChild(div);
        });
    });
}

// Function to update the mosaic based on user input
function updateMosaic() {
    const matrix = readMatrixFromEditor();
    createMosaic(matrix, image1, image2);
    document.getElementById('mosaic').style.opacity = 1; // Ensure the mosaic is visible
}

// Function to randomize the matrix
function randomizeMatrix() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const randomValue = Math.round(Math.random());
            document.getElementById(`cell-${i}-${j}`).value = randomValue;
        }
    }
    revealMosaic();
}

// Function to reveal the mosaic with an animation
function revealMosaic() {
    const mosaicContainer = document.getElementById('mosaic');
    mosaicContainer.style.opacity = 0; // Hide the mosaic initially
    setTimeout(() => {
        const matrix = readMatrixFromEditor();
        createMosaic(matrix, image1, image2);
        mosaicContainer.style.opacity = 1; // Fade in the mosaic
    }, 500); // Delay to simulate the randomize process
}

// Initialize the matrix editor on page load
window.onload = function() {
    createMatrixEditor();
};