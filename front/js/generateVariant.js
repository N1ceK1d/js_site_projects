let variantCounter = 100;

document.querySelector('.variant_counter').addEventListener('input', (e) => {
    variantCounter = e.target.value;
})

document.querySelector('.get_variant').addEventListener('click', () => {
    document.querySelector('.variant').textContent = "Ваш вариант: " + Math.floor(Math.random() * variantCounter);
})