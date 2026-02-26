const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    if (random < 0.33) return "RETA";
    if (random < 0.66) return "CURVA";
    return "CONFRONTO";
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou um dado de ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function declareWinner(char1, char2) {
    console.log("\n--- Resultado Final ---");
    console.log(`${char1.NOME}: ${char1.PONTOS} ponto(s)`);
    console.log(`${char2.NOME}: ${char2.PONTOS} ponto(s)`);

    if (char1.PONTOS > char2.PONTOS) {
        console.log(`\n🏆 ${char1.NOME} venceu a corrida!`);
    } else if (char2.PONTOS > char1.PONTOS) {
        console.log(`\n🏆 ${char2.NOME} venceu a corrida!`);
    } else {
        console.log("\n🤝 A corrida terminou em empate!");
    }
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);
        
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou ${character2.NOME}! 🥊`);
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if (powerResult1 > powerResult2) {
                if (character2.PONTOS > 0) {
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto.`);
                    character2.PONTOS--;
                }
            } else if (powerResult2 > powerResult1) {
                if (character1.PONTOS > 0) {
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto.`);
                    character1.PONTOS--;
                }
            } else {
                console.log("Confronto empatado! Nenhum ponto perdido.");
            }
        }

        // Verificação de ponto para RETA e CURVA
        if (block !== "CONFRONTO") {
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} marcou um ponto!`);
                character1.PONTOS++;
            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`${character2.NOME} marcou um ponto!`);
                character2.PONTOS++;
            }
        }

        console.log("-----------------------");
    }
}

(async function main() {
    console.log(`🚨🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();