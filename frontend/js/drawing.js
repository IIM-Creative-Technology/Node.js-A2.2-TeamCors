const socket = io("http://localhost:3000");

const colorInputs = document.querySelectorAll('.color-input');
const colorLabels = document.querySelectorAll('.color-input__label');
const colorPicker = document.querySelector('#color-picker');
const colorPickerLabel = document.querySelector('.color-picker__label');
const widthInputs = document.querySelectorAll('.width-input');
// const undoButton = document.querySelector('.undo-button');
// const redoButton = document.querySelector('.redo-button');
// const clearButton = document.querySelector('.clear-button');
// const validateButton = document.querySelector('.validate-button');
const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
const link = document.querySelector('.link');

// let history = [];
// let historySave;
// let lastStroke = {};

let isDrawing = false;
let strokeStyle = colorInputs[0].value;
let strokeWidth = parseInt(widthInputs[0].value);
let previousX;
let previousY;

link.textContent = window.location.href;

if (!localStorage.getItem('token')) {
    window.location.href = window.origin + "/rendu/frontend/login.html?roomId=" + findGetParameter('roomId');
}

if (findGetParameter('roomId') === null) {
    window.location.href = window.origin + "/rendu/frontend/drawing.html?roomId=" + Math.floor(Math.random() * 10000000000);
}

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

// undoButton.addEventListener('click', () => {
//     context.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
//     history.pop();
//     history.forEach(stroke => {
//         if (stroke.strokeWidth === "fill") {
//             context.fillStyle = stroke.strokeStyle;
//             context.fillRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
//         } else {
//             stroke.moves.forEach((move, index) => {
//                 drawLine(stroke.strokeStyle, stroke.strokeWidth, move.xPosition, move.yPosition, index-1 in stroke.moves ? stroke.moves[index-1].xPosition : move.xPosition, index-1 in stroke.moves ? stroke.moves[index-1].yPosition : move.yPosition);
//             })
//         }
//     })
// })

// redoButton.addEventListener('click', () => {
//     if (history.length < historySave.length) {
//         context.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
//         for (let i = 0; i <= history.length; i++) {
//             if (historySave[i].strokeWidth === "fill") {
//                 context.fillStyle = historySave[i].strokeStyle;
//                 context.fillRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
//             } else {
//                 historySave[i].moves.forEach((move, index) => {
//                     drawLine(historySave[i].strokeStyle, historySave[i].strokeWidth, move.xPosition, move.yPosition, index - 1 in historySave[i].moves ? historySave[i].moves[index - 1].xPosition : move.xPosition, index - 1 in historySave[i].moves ? historySave[i].moves[index - 1].yPosition : move.yPosition);
//                 })
//             }
//         }
//         history[history.length] = historySave[history.length];
//     }
// })
//
// clearButton.addEventListener('click', () => {
//     context.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
//     history.push({
//         strokeStyle:  "#ffffff",
//         strokeWidth: "fill",
//         moves: []
//     });
//     historySave = history.slice();
// })

// validateButton.addEventListener('click', () => {
//     socket.emit("validateDrawing", {
//         instruction: "Un loup",
//         roomId: "qohd13lNDZ91",
//         round: 2,
//         username: 'JohnDoe',
//         strokes: history.slice()
//     });
// })

canvas.addEventListener('mousedown', () => {
    isDrawing = true;
    if (strokeWidth === "fill") {
        context.fillStyle = strokeStyle;
        context.fillRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
        socket.emit('line', JSON.stringify({
            "roomId": findGetParameter("roomId"),
            strokeStyle,
            strokeWidth
        }))
    }
    // lastStroke = {
    //     strokeStyle:  strokeStyle,
    //     strokeWidth: strokeWidth,
    //     moves: []
    // }
})

document.addEventListener('mouseup', endStroke);
canvas.addEventListener('mouseleave', endStroke);

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing && strokeWidth !== "fill") {
        let xPosition = event.clientX - canvas.offsetLeft;
        let yPosition = event.clientY - canvas.offsetTop;
        previousX ??= xPosition;
        previousY ??= yPosition;
        socket.emit('line', JSON.stringify({
            "roomId": findGetParameter("roomId"),
            strokeStyle,
            strokeWidth,
            xPosition,
            yPosition,
            previousX,
            previousY
        }))
        drawLine(strokeStyle, strokeWidth, xPosition, yPosition, previousX, previousY);
        context.fill();
        // lastStroke.moves.push({
        //     xPosition: xPosition,
        //     yPosition: yPosition
        // })
        previousX = xPosition;
        previousY = yPosition;
    }
})

function drawLine(strokeStyle, strokeWidth, xPosition, yPosition, previousX, previousY) {
    context.beginPath();
    context.lineCap = "round";
    context.strokeStyle = strokeStyle;
    context.lineWidth = strokeWidth;
    context.moveTo(previousX, previousY);
    context.lineTo(xPosition, yPosition);
    context.stroke();
    context.closePath();
}

function endStroke() {
    // if (isDrawing) {
    //     history.push(lastStroke);
    //     historySave = history.slice();
    // }
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

socket.on('line', (arg) => {
    arg = JSON.parse(arg);
    if (arg.roomId == findGetParameter("roomId")) {
        if (arg.strokeWidth === "fill") {
            context.fillStyle = arg.strokeStyle;
            context.fillRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
        } else {
            drawLine(arg.strokeStyle, arg.strokeWidth, arg.xPosition, arg.yPosition, arg.previousX, arg.previousY);
        }
    }
})

function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}