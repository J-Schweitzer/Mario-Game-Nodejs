const player1 = { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 };
const player2 = { NOME: "Luigi", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0 };

const logElement = document.getElementById("log");

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function printLog(message, className = "") {
    const p = document.createElement("p");
    p.innerHTML = message;
    if (className) p.classList.add(className);
    logElement.appendChild(p);
    logElement.scrollTop = logElement.scrollHeight;
    await delay(800); 
}

async function updateScore() {
    document.getElementById("p1-points").innerText = player1.PONTOS;
    document.getElementById("p2-points").innerText = player2.PONTOS;
}

async function rollDice() { return Math.floor(Math.random() * 6) + 1; }

async function main() {
    logElement.innerHTML = ""; // Limpa o log
    player1.PONTOS = 0;
    player2.PONTOS = 0;
    updateScore();

    await printLog("🚨🏁 Corrida começando...");

    for (let round = 1; round <= 5; round++) {
        await printLog(`--- 🏁 Rodada ${round} ---`);
        
        let random = Math.random();
        let block = random < 0.33 ? "RETA" : random < 0.66 ? "CURVA" : "CONFRONTO";
        await printLog(`Bloco sorteado: <strong>${block}</strong>`);

        let d1 = await rollDice();
        let d2 = await rollDice();

        if (block === "CONFRONTO") {
            let p1 = d1 + player1.PODER;
            let p2 = d2 + player2.PODER;
            await printLog(`🥊 ${player1.NOME} (${p1}) vs ${player2.NOME} (${p2})`);
            
            if (p1 > p2 && player2.PONTOS > 0) {
                player2.PONTOS--;
                await printLog(`💥 Mario venceu! Luigi perdeu 1 ponto.`);
            } else if (p2 > p1 && player1.PONTOS > 0) {
                player1.PONTOS--;
                await printLog(`💥 Luigi venceu! Mario perdeu 1 ponto.`);
            } else {
                await printLog("Empate ou ninguém tinha pontos para perder!");
            }
        } else {
            let attr = block === "RETA" ? "VELOCIDADE" : "MANOBRABILIDADE";
            let res1 = d1 + player1[attr];
            let res2 = d2 + player2[attr];

            await printLog(`${player1.NOME}: ${d1} + ${player1[attr]} = ${res1}`);
            await printLog(`${player2.NOME}: ${d2} + ${player2[attr]} = ${res2}`);

            if (res1 > res2) {
                player1.PONTOS++;
                await printLog(`⭐ ${player1.NOME} marcou ponto!`);
            } else if (res2 > res1) {
                player2.PONTOS++;
                await printLog(`⭐ ${player2.NOME} marcou ponto!`);
            }
        }
        updateScore();
    }

    const vencedor = player1.PONTOS > player2.PONTOS ? player1.NOME : 
                    player2.PONTOS > player1.PONTOS ? player2.NOME : "Empate";
    
    await printLog(`🏆 RESULTADO: ${vencedor} venceu!`, "text-win");
}