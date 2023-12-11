let toggler = false;

// Get user's resolution and change the body transform:scaleX(), transform:scaleY() accordingly
function updateResolution() {
    document.body.style.transform = `scaleX(${document.body.offsetWidth / 1920}) scaleY(${document.body.offsetHeight / 1080})`;
}

// Function to update display value for sliders
function updateValue(slider, displayElement) {
    if (slider.id === 'thickness-slider') {
        document.getElementById('thickness-value').textContent = slider.value;
    } else {
        displayElement.textContent = slider.value;
    }
}

window.addEventListener('message', (event) => {
    const data = event.data;
    console.log(data.type)

    if (data.type == "toggle") {
        updateResolution();
        if (toggler) {
            toggler = false;
            document.getElementById("settings").style.display = "none";
            document.getElementById("crosshair-preview").style.display = "none";
        } else {
            toggler = true;
            document.getElementById("settings").style.display = "block";
            document.getElementById("crosshair-preview").style.display = "block";
        }
    }
    if (data.type == "hide") {
        document.getElementById("crosshair-preview").style.display = "none";
    }
    if (data.type == "show") {
        document.getElementById("crosshair-preview").style.display = "block";
    }
    if (data.type == "settings") {
        // Set the settings for the crosshair
        document.getElementById('alpha-slider').value = data.settings['alpha'];
        document.getElementById('thickness-slider').value = data.settings['thickness'];
        document.getElementById('size-slider').value = data.settings['size'];
        document.getElementById('gap-slider').value = data.settings['gap'];
        document.getElementById('outline-slider').value = data.settings['outline'];
        let red = data.settings['color'][0]
        let green = data.settings['color'][1]
        let blue = data.settings['color'][2]
        if (red == 0 && green == 255 && blue == 0) {
            document.getElementById('color-select').value = 'green';
        } else if (red == 255 && green == 255 && blue == 0) {
            document.getElementById('color-select').value = 'yellow';
        } else if (red == 0 && green == 0 && blue == 255) {
            document.getElementById('color-select').value = 'blue';
        } else if (red == 0 && green == 255 && blue == 255) {
            document.getElementById('color-select').value = 'cyan';
        } else {
            document.getElementById('color-select').value = 'custom';
        }
        document.getElementById('red-slider').value = red;
        document.getElementById('green-slider').value = green;
        document.getElementById('blue-slider').value = blue;
        document.getElementById('dot-checkbox').checked = data.settings['dot'];
        // Update the display values
        updateValue(document.getElementById('alpha-slider'), document.getElementById('alpha-value'));
        updateValue(document.getElementById('thickness-slider'), document.getElementById('thickness-value'));
        updateValue(document.getElementById('size-slider'), document.getElementById('size-value'));
        updateValue(document.getElementById('gap-slider'), document.getElementById('gap-value'));
        updateValue(document.getElementById('outline-slider'), document.getElementById('outline-value'));
        updateValue(document.getElementById('red-slider'), document.getElementById('red-value'));
        updateValue(document.getElementById('green-slider'), document.getElementById('green-value'));
        updateValue(document.getElementById('blue-slider'), document.getElementById('blue-value'));
        // Update the crosshair
        updateCrosshair();
    }
});

function initializeCrosshairSettings() {
    // Get all relevant input elements
    const alphaSlider = document.getElementById('alpha-slider');
    const thicknessSlider = document.getElementById('thickness-slider');
    const sizeSlider = document.getElementById('size-slider');
    const gapSlider = document.getElementById('gap-slider');
    const outlineSlider = document.getElementById('outline-slider');
    const colorSelect = document.getElementById('color-select');
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const dotCheckbox = document.getElementById('dot-checkbox');

    // Display elements
    const alphaValue = document.getElementById('alpha-value');
    const thicknessValue = document.getElementById('thickness-value');
    const sizeValue = document.getElementById('size-value');
    const gapValue = document.getElementById('gap-value');
    const outlineValue = document.getElementById('outline-value');
    const redValue = document.getElementById('red-value');
    const greenValue = document.getElementById('green-value');
    const blueValue = document.getElementById('blue-value');

    // Initial gray out of RGB sliders
    disableRGBSliders();

    // Event listeners for sliders
    alphaSlider.addEventListener('input', updateValue.bind(null, alphaSlider, alphaValue));
    thicknessSlider.addEventListener('input', updateValue.bind(null, thicknessSlider, thicknessValue));
    sizeSlider.addEventListener('input', updateValue.bind(null, sizeSlider, sizeValue));
    gapSlider.addEventListener('input', updateValue.bind(null, gapSlider, gapValue));
    outlineSlider.addEventListener('input', updateValue.bind(null, outlineSlider, outlineValue));

    redSlider.addEventListener('input', function () {
        updateValue(redSlider, redValue);
        checkAndUpdateColorSelect('red');
    });
    greenSlider.addEventListener('input', function () {
        updateValue(greenSlider, greenValue);
        checkAndUpdateColorSelect('green');
    });
    blueSlider.addEventListener('input', function () {
        updateValue(blueSlider, blueValue);
        checkAndUpdateColorSelect('blue');
    });

    // Event listener for color select
    colorSelect.addEventListener('change', updateColorSelect);

    // Function to check and update color select
    function checkAndUpdateColorSelect(changedColor) {
        const selectedColor = colorSelect.value;
        const predefinedColors = ['green', 'yellow', 'blue', 'cyan'];

        if (!predefinedColors.includes(selectedColor)) {
            colorSelect.value = 'custom';
        } else {
            updateColorSelect();
        }
    }

    // Function to disable RGB sliders
    function disableRGBSliders() {
        redSlider.disabled = true;
        greenSlider.disabled = true;
        blueSlider.disabled = true;
    }

    // Function to enable RGB sliders
    function enableRGBSliders() {
        redSlider.disabled = false;
        greenSlider.disabled = false;
        blueSlider.disabled = false;
    }

    // Function to update display value for color select
    function updateColorSelect() {
        const selectedColor = colorSelect.value;
        const colorValues = {
            green: { red: 0, green: 255, blue: 0 },
            yellow: { red: 255, green: 255, blue: 0 },
            blue: { red: 0, green: 0, blue: 255 },
            cyan: { red: 0, green: 255, blue: 255 },
            custom: { red: 50, green: 200, blue: 50 }
        };

        if (selectedColor === 'custom') {
            enableRGBSliders();
            const { red, green, blue } = colorValues[selectedColor];
            redSlider.value = red;
            greenSlider.value = green;
            blueSlider.value = blue;
            updateValue(redSlider, redValue);
            updateValue(greenSlider, greenValue);
            updateValue(blueSlider, blueValue);
        } else {
            disableRGBSliders();
            redSlider.value = colorValues[selectedColor].red;
            greenSlider.value = colorValues[selectedColor].green;
            blueSlider.value = colorValues[selectedColor].blue;
            updateValue(redSlider, redValue);
            updateValue(greenSlider, greenValue);
            updateValue(blueSlider, blueValue);
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeCrosshairSettings);

// Function to adjust slider value with up and down buttons
function adjustSlider(sliderId, increment) {
    const slider = document.getElementById(sliderId);
    const currentValue = parseFloat(slider.value);
    const step = sliderId === 'thickness-slider' ? 0.5 : 1;
    const newValue = currentValue + increment * step;
    if (newValue >= parseFloat(slider.min) && newValue <= parseFloat(slider.max)) {
        slider.value = newValue;
        updateValue(slider, document.getElementById(`${sliderId.split('-')[0]}-value`));

        if (sliderId === 'color-select') {
            updateColorSelect();
        } else if (sliderId.includes('red') || sliderId.includes('green') || sliderId.includes('blue')) {
            checkAndUpdateColorSelect(sliderId.split('-')[0]);
        }
    }
}

// Function to draw the crosshair on the canvas
function drawCrosshair(ctx, alpha, thickness, size, gap, outline, color, dot) {
    // Clear the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Set alpha
    ctx.globalAlpha = alpha / 255;

    // Calculate center of the canvas
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2 + 1;

    // Draw the main crosshair
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.fillStyle = color;

    // Draw horizontal line
    ctx.beginPath();
    ctx.moveTo(centerX - size / 2, centerY);
    ctx.lineTo(centerX - gap / 2, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + size / 2, centerY);
    ctx.lineTo(centerX + gap / 2, centerY);
    ctx.stroke();

    // Draw vertical line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - size / 2);
    ctx.lineTo(centerX, centerY - gap / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY + size / 2);
    ctx.lineTo(centerX, centerY + gap / 2);
    ctx.stroke();

    // Draw dot if applicable
    if (dot) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, thickness / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Draw the outline
    if (outline > 0) {
        ctx.strokeStyle = 'black'; // replace with the actual color
        ctx.lineWidth = outline;

        // Draw horizontal line
        ctx.beginPath();
        ctx.moveTo(centerX - size / 2, centerY - thickness / 2);
        ctx.lineTo(centerX - gap / 2, centerY - thickness / 2);
        ctx.moveTo(centerX + size / 2, centerY + thickness / 2);
        ctx.lineTo(centerX + gap / 2, centerY + thickness / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX + size / 2, centerY - thickness / 2);
        ctx.lineTo(centerX + gap / 2, centerY - thickness / 2);
        ctx.moveTo(centerX - size / 2, centerY + thickness / 2);
        ctx.lineTo(centerX - gap / 2, centerY + thickness / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX + size / 2, centerY - thickness / 2);
        ctx.lineTo(centerX + size / 2, centerY + thickness / 2);
        ctx.moveTo(centerX - size / 2, centerY - thickness / 2);
        ctx.lineTo(centerX - size / 2, centerY + thickness / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX + gap / 2, centerY - thickness / 2);
        ctx.lineTo(centerX + gap / 2, centerY + thickness / 2);
        ctx.moveTo(centerX - gap / 2, centerY - thickness / 2);
        ctx.lineTo(centerX - gap / 2, centerY + thickness / 2);
        ctx.stroke();

        // Draw vertical line
        ctx.beginPath();
        ctx.moveTo(centerX - thickness / 2, centerY - size / 2);
        ctx.lineTo(centerX - thickness / 2, centerY - gap / 2);
        ctx.moveTo(centerX + thickness / 2, centerY + size / 2);
        ctx.lineTo(centerX + thickness / 2, centerY + gap / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX - thickness / 2, centerY + size / 2);
        ctx.lineTo(centerX - thickness / 2, centerY + gap / 2);
        ctx.moveTo(centerX + thickness / 2, centerY - size / 2);
        ctx.lineTo(centerX + thickness / 2, centerY - gap / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX - thickness / 2, centerY + size / 2);
        ctx.lineTo(centerX + thickness / 2, centerY + size / 2);
        ctx.moveTo(centerX - thickness / 2, centerY - size / 2);
        ctx.lineTo(centerX + thickness / 2, centerY - size / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX - thickness / 2, centerY + gap / 2);
        ctx.lineTo(centerX + thickness / 2, centerY + gap / 2);
        ctx.moveTo(centerX - thickness / 2, centerY - gap / 2);
        ctx.lineTo(centerX + thickness / 2, centerY - gap / 2);
        ctx.stroke();

        // Draw dot if applicable
        if (dot) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, thickness / 2, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}

// Function to update the crosshair based on slider values
function updateCrosshair() {
    // Get canvas and its 2D context
    const canvas = document.getElementById('crosshairCanvas');
    const ctx = canvas.getContext('2d');

    // Get slider values
    const alpha = parseFloat(document.getElementById('alpha-slider').value);
    const thickness = parseFloat(document.getElementById('thickness-slider').value);
    const size = parseFloat(document.getElementById('size-slider').value);
    const gap = parseFloat(document.getElementById('gap-slider').value);
    const outline = parseFloat(document.getElementById('outline-slider').value);
    const color = `rgb(${parseFloat(document.getElementById('red-slider').value)}, ${parseFloat(document.getElementById('green-slider').value)}, ${parseFloat(document.getElementById('blue-slider').value)})`;
    const dot = document.getElementById('dot-checkbox').checked;

    // Draw the crosshair
    drawCrosshair(ctx, alpha, thickness, size, gap, outline, color, dot);
}

// Function to add event listeners to sliders for live updates
function addSliderEventListeners() {
    const sliders = ['alpha-slider', 'size-slider', 'thickness-slider', 'gap-slider', 'outline-slider', 'red-slider', 'green-slider', 'blue-slider'];

    sliders.forEach((sliderId) => {
        const slider = document.getElementById(sliderId);
        slider.addEventListener('input', updateCrosshair);
    });

    // Event listener for color select
    document.getElementById('color-select').addEventListener('change', updateCrosshair);

    // Event listener for dot checkbox
    document.getElementById('dot-checkbox').addEventListener('change', updateCrosshair);
}

// Initialize crosshair settings and add event listeners
document.addEventListener('DOMContentLoaded', function () {
    initializeCrosshairSettings();
    addSliderEventListeners();
    updateCrosshair(); // Initial draw
});

function CloseMenu() {
    $.post(`https://${GetParentResourceName()}/close`, JSON.stringify({
        alpha: parseInt(document.getElementById('alpha-slider').value),
        thickness: parseFloat(document.getElementById('thickness-slider').value),
        size: parseInt(document.getElementById('size-slider').value),
        gap: parseInt(document.getElementById('gap-slider').value),
        outline: parseInt(document.getElementById('outline-slider').value),
        color: `rgb(${parseInt(document.getElementById('red-slider').value)}, ${parseInt(document.getElementById('green-slider').value)}, ${parseInt(document.getElementById('blue-slider').value)})`,
        dot: document.getElementById('dot-checkbox').checked
    }));
}