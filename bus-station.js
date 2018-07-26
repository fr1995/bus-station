function solve(groups) {

    // Tamanho mínimo para o ônibus é o tamanho do maior grupo.
    const minSize = groups.reduce((prev, curr) => prev > curr ? prev : curr, 0);

    // Tamanho máximo para o ônibus é a soma dos passageiros.
    const maxSize = groups.reduce((prev, curr) => prev + curr, 0);

    // Tamanhos válidos, incluindo o máximo.
    let validSizes = [];
    validSizes.push(maxSize);

    // Testa todos os tamanhos possíveis.
    for (let size = minSize; size < maxSize; ++size) {
        if (testSize(groups, size)) validSizes.push(size);
    }

    // Ordena resultado.
    validSizes = validSizes.sort((a, b) => a - b);

    // Retorna resultado.
    return validSizes;

}

// Verifica se tamanho de ônibus pode suportar grupos.
function testSize(groups, size) {

    // Passageiros no ônibus.
    let current = 0;

    for (const groupSize of groups) {

        // Não é válido se transbordou tamanho do ônibus.
        const overflow = (current + groupSize) > size;
        if (overflow) return false;

        // Passageiros entram no ônibus.
        current += groupSize;

        // Se não sobrou nenhum assento, ônibus é esvaziado.
        if (current == size) current = 0;

    }

    // Se sobrou passageiros no ônibus, tamanho é inválido.
    if (current > 0) return false;

    // Se não retornou até aqui, então é um tamanho válido.
    return true;

}
