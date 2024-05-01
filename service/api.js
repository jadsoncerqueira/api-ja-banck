import sheet from "../configSheet.js";

export async function getValues() {
const rows = await sheet.getRows()
  return rows.map((el, id) => ({id, nome: el.get("nome"), saldoDracma: Number(el.get("saldo_dracma")), dataCriacao: el.get("data_criacao")}))
}

export async function setNewValues(obj) {
    await sheet.addRow({...obj, data_criacao: new Date().toLocaleString("pt-BR")});
}

export async function findByNameReturnIndex(nome) {
    const {id} = (await getValues()).find(el => el.nome === nome);
    return id
}

export async function findByIndex(id) {
    return (await getValues()).find((el) => el.id === id)
}

export async function updateValue(id, chave, valor, op) {
    const rows = await sheet.getRows();

    const valorAtualizado = chave === "saldo_dracma" ? op === "credito" ? Number(rows[id].get("saldo_dracma")) + Number(valor)
        : Number(rows[id].get("saldo_dracma")) - valor
        : valor


    rows[id].set(chave, valorAtualizado)
    await rows[id].save()
}


