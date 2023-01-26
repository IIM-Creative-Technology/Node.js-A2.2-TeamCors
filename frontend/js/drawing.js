const socket = io("http://localhost:3000");

const colorInputs = document.querySelectorAll('.color-input');
const colorLabels = document.querySelectorAll('.color-input__label');
const colorPicker = document.querySelector('#color-picker');
const colorPickerLabel = document.querySelector('.color-picker__label');
const widthInputs = document.querySelectorAll('.width-input');
const undoButton = document.querySelector('.undo-button');
const redoButton = document.querySelector('.redo-button');
const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");

let history = [];
let historySave;
let lastStroke = {};

let isDrawing = false;
let strokeStyle = colorInputs[0].value;
let strokeWidth = parseInt(widthInputs[0].value);
let previousX;
let previousY;

colorInputs.forEach((colorInput, index) => {
    colorInput.addEventListener('click', () => {
        colorPickerLabel.classList.remove('text-white/80', 'text-black/30');
        colorPickerLabel.classList.add('text-transparent');
        strokeStyle = window.getComputedStyle(colorLabels[index]).backgroundColor;
    })
})

colorPicker.addEventListener('change', updateColor);
colorPicker.addEventListener('click', updateColor);

widthInputs.forEach(widthInput => {
    widthInput.addEventListener('click', () => {
        strokeWidth = widthInput.value === "fill" ? widthInput.value:+widthInput.value;
    })
})

undoButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
    history.pop();
    history.forEach(stroke => {
        if (stroke.strokeWidth === "fill") {
            context.fillStyle = stroke.strokeStyle;
            context.fillRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
        } else {
            stroke.moves.forEach((move, index) => {
                context.beginPath();
                drawLine(stroke.strokeStyle, stroke.strokeWidth, move.xPosition, move.yPosition, index-1 in stroke.moves ? stroke.moves[index-1].xPosition : move.xPosition, index-1 in stroke.moves ? stroke.moves[index-1].yPosition : move.yPosition);
                context.closePath();
            })
        }
    })
})

redoButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
    for (let i = 0; i <= history.length; i++) {
        if (historySave[i].strokeWidth === "fill") {
            context.fillStyle = historySave[i].strokeStyle;
            context.fillRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
        } else {
            historySave[i].moves.forEach((move, index) => {
                context.beginPath();
                drawLine(historySave[i].strokeStyle, historySave[i].strokeWidth, move.xPosition, move.yPosition, index - 1 in historySave[i].moves ? historySave[i].moves[index - 1].xPosition : move.xPosition, index - 1 in historySave[i].moves ? historySave[i].moves[index - 1].yPosition : move.yPosition);
                context.closePath();
            })
        }
    }
    history[history.length] = historySave[history.length];
})

canvas.addEventListener('mousedown', () => {
    isDrawing = true;
    if (strokeWidth === "fill") {
        context.fillStyle = strokeStyle;
        context.fillRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
    }
    lastStroke = {
        strokeStyle:  strokeStyle,
        strokeWidth: strokeWidth,
        moves: []
    }
})

document.addEventListener('mouseup', endStroke);
canvas.addEventListener('mouseleave', endStroke);

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing && strokeWidth !== "fill") {
        let xPosition = event.clientX - canvas.offsetLeft;
        let yPosition = event.clientY - canvas.offsetTop;
        previousX ??= xPosition;
        previousY ??= yPosition;
        context.beginPath();
        drawLine(strokeStyle, strokeWidth, xPosition, yPosition, previousX, previousY);
        context.closePath();
        context.fillStyle = '#8ED6FF';
        context.fill();
        lastStroke.moves.push({
            xPosition: xPosition,
            yPosition: yPosition
        })
        previousX = xPosition;
        previousY = yPosition;
    }
})

function drawLine(strokeStyle, strokeWidth, xPosition, yPosition, previousX, previousY) {
    context.lineCap = "round";
    context.strokeStyle = strokeStyle;
    context.lineWidth = strokeWidth;
    context.moveTo(previousX, previousY);
    context.lineTo(xPosition, yPosition);
    context.stroke();
}

function endStroke() {
    if (isDrawing) {
        history.push(lastStroke);
        historySave = history.slice();
    }
    isDrawing = false;
    previousX = null;
    previousY = null;
}

function updateColor() {
    colorPickerLabel.classList.remove('text-white/80', 'text-black/30');
    strokeStyle = colorPickerLabel.style.backgroundColor = colorPicker.value;
    let color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorPicker.value);
    let [r, g, b] = [parseInt(color[1], 16), parseInt(color[2], 16), parseInt(color[3], 16)];
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    console.log(luma);
    if (luma < 160) {
        colorPickerLabel.classList.add('text-white/80');
    } else {
        colorPickerLabel.classList.add('text-black/30');
    }
    console.log(r, g, b);
    colorPickerLabel.classList.remove('text-transparent');
    colorInputs.forEach(colorInput => {
        colorInput.checked = false;
    })
}