import React, { useState, useEffect } from "react";
import { buscarVagas, removerVaga } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ConsultarVagas = ({ showToast }) => {
  const [vagas, setVagas] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setVagas(buscarVagas());
  }, []);

  const handleRemove = (vaga) => {
    if (window.confirm('Você confirma a remoção?')) {
      removerVaga(vaga.id);
      setVagas(buscarVagas());
      showToast('Vaga removida com sucesso!');
    }
  };

  const handleEdit = (vaga) => {
    navigate('/', { state: { vagaParaEditar: vaga } });
  };

  return (<>{
    vagas && <div className="container-fluid table-responsive margin-top-10">
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Proprietário</th>
            <th scope="col">Número do apartamento</th>
            <th scope="col">Bloco do apartamento</th>
            <th scope="col">Placa do veículo</th>
            <th scope="col">Modelo do veículo</th>
            <th scope="col">Cor do veículo</th>
            <th scope="col">Número da vaga</th>
          </tr>
        </thead>
        <tbody>
          {vagas.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>Não há vagas</td>
            </tr>
          ) : (
            vagas.map((vaga) => (
              <tr key={vaga.id}>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(vaga)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-danger ms-2" onClick={() => handleRemove(vaga)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
                <td>{vaga.proprietario}</td>
                <td>{vaga.numeroApartamento}</td>
                <td>{vaga.blocoApartamento}</td>
                <td>{vaga.placaVeiculo}</td>
                <td>{vaga.modeloVeiculo}</td>
                <td>{vaga.corVeiculo}</td>
                <td>{vaga.numeroVaga}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  }</>
  );
};

export default ConsultarVagas;
