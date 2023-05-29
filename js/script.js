//Início do Problema
const tipoFuncObjt = "max";
const qtdRest = 3;
const qtdVarDec = 4;

if (tipoFuncObjt === "max") {
    let resultado = metodoSimplex(qtdRest, qtdVarDec);
    document.getElementById('resultado').textContent = 'O resultado é: ' + resultado;
}

function metodoSimplex(qtdRest, qtdVarDec) {
    const linhas = qtdRest + 1;
    const colunas = qtdVarDec + qtdRest + 1;
    const vetor = [];
    let z = qtdVarDec;
    
    for (let i=0; i<linhas; i++) {
        vetor[i] = [];
        for (let j=0; j<colunas; j++) { // Faz o loop do vetor
            if (j>=qtdVarDec) { // Verifica se já passou do limite das variáveis de decição
                if (i===0) { // Verifica se está na primeira linha
                    vetor[i][j] = 0;
                } else if (j===(colunas-1)) { // Verifica se está na última coluna
                    let valor = parseFloat(prompt("Digite o valor após a equação ou inequação da Restrição " + i + ": "));
                    vetor[i][j] = valor;
                } else if (j===z) {
                    vetor[i][j] = 1;
                } else {
                    vetor[i][j] = 0;
                }
            } else if (i===0) {
                let valor = parseFloat(prompt("Digite o valor à esquerda de X" + (j+1) + " da Função Objetivo: "));
                valor = valor * (-1);
                vetor[i][j] = valor;
            } else {
                let valor = parseFloat(prompt("Digite o valor à esquerda de X" + (j+1) + " da Restrição " + i + ": "));
                vetor[i][j] = valor;
            }
        }
        if (i>0) {
            z = z + 1;
            console.log(z);
        }
    }

    return vetor;


    // let funcRest = [[9,1,18], [3,1,12]];
    // let funcObjt = [4,1];
    // const p1 = (funcRest[0][2] - 0) / funcRest[0][1] // Restrição 1 se x1 for zero
    // const p2 = (funcRest[0][2] - 0) / funcRest[0][0] // Restrição 1 se x2 for zero
    // const p3 = (funcRest[1][2] - 0) / funcRest[1][1] // Restrição 2 se x1 for zero
    // const p4 = (funcRest[1][2] - 0) / funcRest[1][0] // Restrição 2 se x2 for zero
}

metodoSimplex();