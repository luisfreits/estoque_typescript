import * as fs from 'fs';

const prompt = require('prompt-sync')({sigint: true});

function delay(ms: number): Promise<void> {return new Promise(resolve => setTimeout(resolve, ms))}

const produtos: {nome:string, qtde:string}[] = [];

(function carregamento() {
    const caminho = 'produtos.json';
    if (produtos.length === 0 && fs.existsSync(caminho)) {
        try {
            const dados = fs.readFileSync(caminho, 'utf-8');
            const arquivo = JSON.parse(dados);
            if (Array.isArray(arquivo)) {produtos.splice(0, produtos.length, ...arquivo)}
        } catch (error) {console.error(`[X]: Erro ao carregar produtos: ${error}`);}
    }
})();
function salvamento() {
    const caminho = 'produtos.json';
    try {fs.writeFileSync(caminho, JSON.stringify(produtos, null, 4))}
    catch (error) {console.error(`[X]: Erro ao salvar produtos: ${error}`)}
}


async function mostrarMenu() {
    console.log("\nSistema de Estoque");
    await delay(400);
    console.log("1 - Adicionar um produto");
    await delay(100);
    console.log("2 - Listar os produtos");
    await delay(100);
    console.log("3 - Listar informações de um produto");
    await delay(100);
    console.log("4 - Alterar/Adicionar informações de um produto");
    await delay(100);
    console.log("5 - Alterar quantidade de um produto");
    await delay(100);
    console.log("6 - Remover informações de um produto");
    await delay(100);
    console.log("7 - Remover um produto");
    await delay(100);
    console.log("8 - Sair");
}

let continuar = true;
async function main() {
    while (continuar){
        await delay(1000);
        await mostrarMenu();
        await delay(600);
        let opcao = prompt("\n[?]: Selecione uma opção: ");
        let produto:string;
        await delay(700);
        console.log();
        switch(opcao){
            case "1":
                while (true){
                    produto = prompt("[?]: Digite o nome do produto a ser adicionado: ");
                    if ((produto)===""){break}
                    if (produtos.find(p => p.nome === produto)){console.log(`[X]: Já existe um produto com o nome "${produto}"!`)}
                    else {
                        produtos.push({nome: produto, qtde: "0"});
                        await delay(700);
                        console.log(`[-]: Produto "${produto}" adicionado!`);
                        salvamento();
                        if (prompt(`[?]: Você quer adicionar mais produtos? (s/n): `) != "s"){break}
                        else {
                            console.log()
                            await delay(200);
                        }
                    }
                }
                break;

            case "2":
                if (produtos.length === 0){console.log("[!]: Nenhum produto cadastrado.")}
                else {
                    console.log("[-]: Lista de produtos cadastrados:");
                    await delay(400);
                    for (let i = 0; i < produtos.length; i++) {
                        console.log(`   ${i + 1} - ${produtos[i].nome}`);
                        await delay(100);
                    }
                }
                break;

            case "3":
                if (produtos.length === 0){console.log("[!]: Nenhum produto cadastrado.")}
                else {
                    produto = prompt("[?]: Digite o nome do produto a ser listado: ");
                        if ((produto)!==""){
                        let listProduto = produtos.find(p => p.nome === produto);
                        await delay(700);
                        if (listProduto){
                            for (const [chave, valor] of Object.entries(listProduto)) {
                                if (chave == "nome") {
                                    console.log(`[-]: Informações do produto "${produtos.indexOf(listProduto) + 1}- ${valor}":`);
                                    await delay(500);
                                } else {
                                    console.log(`   ${chave}: ${valor}`);
                                    await delay(100);
                                }
                            }
                        } else {console.log("[X]: Produto não encontrado!")}
                    }
                }
                break;

            case "4":
                if (produtos.length === 0){console.log("[!]: Nenhum produto cadastrado.")}
                else {
                    produto = prompt("[?]: Digite o nome do produto a ser alterado: ");
                    if ((produto)!==""){
                        let listProduto = produtos.find(p => p.nome === produto);
                        await delay(700);
                        if (listProduto){
                            while (true){
                                const informacao = prompt("[?]: Digite a informação que você quer alterar/adicionar: ");
                                await delay(600);
                                if ((informacao)===""){break}
                                let valor = prompt(`[?]: Digite o valor você quer atribuir em "${informacao}": `);
                                if ((valor)===""){break}
                                await delay(600);
                                (produtos[produtos.indexOf(listProduto)] as any)[informacao] = valor;
                                salvamento();
                                console.log(`[-]: Valor "${valor}" salvo em "${informacao}" com sucesso!`)
                                if (prompt(`[?]: Você quer alterar/adicionar mais informações em "${produto}"? (s/n): `) != "s"){break}
                                else {
                                    console.log()
                                    await delay(200);
                                }
                            }
                        } else {console.log("[X]: Produto não encontrado!")}
                    }
                }
                break;

            case "5":
                if (produtos.length === 0){console.log("[!]: Nenhum produto cadastrado.")}
                else {
                    while (true){
                        produto = prompt("[?]: Digite o nome do produto a ser alterado: ");
                        if ((produto)===""){break}
                        let listProduto = produtos.find(p => p.nome === produto);
                        await delay(700);
                        if (listProduto){
                            await delay(600);
                            let qtde = prompt(`[?]: Digite o valor você quer atribuir em "qtde": `);
                            if ((qtde)===""){break}
                            await delay(600);
                            (produtos[produtos.indexOf(listProduto)] as any).qtde = qtde;
                            salvamento();
                            console.log(`[-]: Valor "${qtde}" salvo em "qtde" com sucesso!`)
                            if (prompt(`[?]: Você quer alterar mais quantidades? (s/n): `) != "s"){break}
                            else {
                                console.log()
                                await delay(200);
                            }
                        } else {console.log("[X]: Produto não encontrado!")}
                    }
                }
                break;

            case "6":
                if (produtos.length === 0){console.log("[!]: Nenhum produto cadastrado.")}
                else {
                    produto = prompt("[?]: Digite o nome do produto a ser alterado: ");
                    if ((produto)!==""){
                        let listProduto = produtos.find(p => p.nome === produto);
                        await delay(700);
                        if (listProduto){
                            while (true){
                                const informacao = prompt("[?]: Digite a informação que você quer remover: ");
                                if ((informacao)===""){break}
                                delete (produtos[produtos.indexOf(listProduto)] as any)[informacao];
                                await delay(700);
                                salvamento();
                                console.log(`[-]: "${informacao}" deletado(a) com sucesso!`);
                                if (prompt(`[?]: Você quer remover mais informações em "${produto}"? (s/n): `) != "s"){break}
                                else {
                                    console.log()
                                    await delay(200);
                                }
                            }
                        } else {console.log("[X]: Produto não encontrado!")}
                    }
                }
                break;

            case "7":
                if (produtos.length === 0){console.log("[!]: Nenhum produto cadastrado. ")}
                else {
                    while (true){
                        produto = prompt("[?]: Digite o nome do produto a ser removido: ");
                        if ((produto)===""){break}
                        let listProduto = produtos.find(p => p.nome === produto);
                        await delay(700);
                        if (listProduto){
                            produtos.splice(produtos.indexOf(listProduto), 1);
                            console.log(`[-]: Produto "${listProduto.nome}" foi removido!`);
                            salvamento();
                        } else {console.log("[X]: Produto não encontrado!")}
                        if (prompt(`[?]: Você quer remover mais produtos? (s/n): `) != "s"){break}
                        else {
                            console.log()
                            await delay(200);
                        }
                    }
                }
                break;

            case "8":
                console.log("[!]: Saindo do sistema...");
                continuar = false;
                break;

            case "":
                break;

            default:
                console.log("[X]: Opção inválida, tente novamente!");
                break;
        }
    }
} main();