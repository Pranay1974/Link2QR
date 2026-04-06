const form = document.getElementById('qr-form');
const input = document.getElementById('qr-input');
const sizeSelect = document.getElementById('qr-size');
const img = document.getElementById('qr-image');
const placeholder = document.getElementById('placeholder');
const downloadBtn = document.getElementById('download-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const originalBtnText = e.submitter.innerText;
    e.submitter.innerText = "Generating...";

    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${sizeSelect.value}&data=${encodeURIComponent(input.value)}`;

    // Pre-load image before showing
    img.src = apiUrl;
    img.onload = () => {
        placeholder.style.display = 'none';
        img.style.display = 'block';
        downloadBtn.style.display = 'block';
        e.submitter.innerText = originalBtnText;
    };
});

downloadBtn.addEventListener('click', async () => {
    const response = await fetch(img.src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QR_Code_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});