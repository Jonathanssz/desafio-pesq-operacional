function calcularSoma() {
    let num1 = parseFloat(document.getElementById('numero1').value);
    let num2 = parseFloat(document.getElementById('numero2').value);
    let resultado = num1 + num2;
    document.getElementById('resultado').textContent = 'A soma é: ' + resultado;
}