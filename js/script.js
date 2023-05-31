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
    let z = qtdVarDec; // Apenas para recurso
    let parar = false;
    
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
                let valor = parseFloat(prompt("Digite o coeficiente de X" + (j+1) + " da Função Objetivo: "));
                valor = valor * (-1);
                vetor[i][j] = valor;
            } else {
                let valor = parseFloat(prompt("Digite o coeficiente de X" + (j+1) + " da Restrição " + i + ": "));
                vetor[i][j] = valor;
            }
        }
        if (i>0) {
            z = z + 1;
        }
    }

    
    do {
        // Testa a primeira linha
        var variavel = testarLinha1(vetor, colunas); // pega o número mais negativo
        console.log(variavel);
        console.log(vetor.length);
        
        // Armazenar a coluna pivô
        let colunaPivo = armazenaColuna(variavel, vetor);

        // Armazenas as linhas considerando a coluna pivô
        let linhasPivo = armazenaLinhasP(variavel, colunas, vetor);

        // Armazenar as linhas
        let linhas = armazenaLinhas(variavel, colunas, vetor);
        variavel = 0;

    } while (variavel!==0);


    return vetor;


    // let funcRest = [[9,1,18], [3,1,12]];
    // let funcObjt = [4,1];
    // const p1 = (funcRest[0][2] - 0) / funcRest[0][1] // Restrição 1 se x1 for zero
    // const p2 = (funcRest[0][2] - 0) / funcRest[0][0] // Restrição 1 se x2 for zero
    // const p3 = (funcRest[1][2] - 0) / funcRest[1][1] // Restrição 2 se x1 for zero
    // const p4 = (funcRest[1][2] - 0) / funcRest[1][0] // Restrição 2 se x2 for zero
}

function testarLinha1(vetor, colunas) {
    let array = [];
    for (let j=0; j<colunas; j++) {
        let numeros = vetor[0][j];
        array.push(numeros);
    }
    let newArray = [];
    let numNeg = null;
    for (let i=0; i<array.length; i++) {
        let numero = array[i];
        if (numero<0) {
            newArray.push(numero);
            if (numNeg === null || numero < numNeg) {
                numNeg = numero;
            }
        }
    }
    
    console.log(numNeg);

    if (newArray===[]) {
        return 0;
    } else {
        return numNeg;
    }
}

function armazenaColuna(variavel, vetor) {
    let numProcurado = variavel;
    let colunaProcurada = null;
    let array = [];

    for (let i=0; i<vetor.length; i++) {
        for (let j=0; j<vetor[i].length; j++) {
            if (vetor[i][j]===numProcurado) {
                colunaProcurada = j;
                break;
            }
        }
        if (colunaProcurada!==null) {
        break;
        }  
    }

    if (colunaProcurada!==null) {
        for (let k=0; k<vetor.length; k++) {
            array.push(vetor[k][colunaProcurada]);
        }
    }
    console.log(array);
    return array;
}

function armazenaLinhas(colunaPivo, colunas, vetor) {
    let arrayI = [];
    for (let i=0; i<colunaPivo.length; i++) {
        let arrayJ = [];
        let numProcurado = colunaPivo[i];
        let linhaProcurada = null;
    
        for (let i=0; i<colunas; i++) {
            for (let j=0; j<vetor[i].length; j++) {
                if (vetor[i][j]===numProcurado) {
                    linhaProcurada = i;
                    break;
                }
            }
            if (linhaProcurada!==null) {
            break;
            }  
        }
    
        if (linhaProcurada!==null) {
            for (let k=0; k<colunas; k++) {
                arrayJ.push(vetor[linhaProcurada][k]);
            }
        }
        arrayI.push(arrayJ);
    }
    console.log(arrayI);
    return arrayI;
}

function armazenaLinhasP(variavel, colunas, vetor) {
    let arrayI = [];
    for (let i=0; i<vetor.length; i++) { // i < tamanho 3 linhas
        let numProcurado = variavel; // 120
        let colunaProcurada = null;
        let arrayJ = [];

        for (let j=0; j<colunas; j++) { // j < tamanho do array linha
            if (vetor[i][j]===numProcurado) {
                colunaProcurada = j;
                break;
            }
        }
    
        if (colunaProcurada!==null) {
            for (let k=colunaProcurada; k<colunas; k++) {
                arrayJ.push(vetor[i][k]);
            }
        }
        arrayI.push(arrayJ);
    }
    console.log(arrayI);
    return arrayI;
}