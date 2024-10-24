const VAGAS_KEY = "vagas";

export function salvarVaga(vaga) {
  const vagas = buscarVagas();
  vagas.push(vaga);
  salvarVagas(vagas);
};

export function buscarVagas()  {
  const vagas = localStorage.getItem(VAGAS_KEY);
  return vagas ? JSON.parse(vagas) : [];
};

export function buscarVagaPorId(id) {
  const vagas = buscarVagas();
  return vagas.find(vaga => vaga.id === id);
};

export function atualizarVaga(vagaAtualizada) {
  const vagas = buscarVagas();
  const index = vagas.findIndex((vaga) => vaga.id === vagaAtualizada.id);
  if (index === -1) return;
  vagas[index] = vagaAtualizada;
  salvarVagas(vagas);
};

export function removerVaga(id) {
  const vagas = buscarVagas();
  const novasVagas = vagas.filter(vaga => vaga.id !== id);
  salvarVagas(novasVagas);
};

function salvarVagas(vagas) { 
  localStorage.setItem(VAGAS_KEY, JSON.stringify(vagas));
}
