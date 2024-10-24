import React, { useState, useEffect } from "react";
import { salvarVaga, atualizarVaga } from "../../services/localStorageService";
import { useNavigate, useLocation } from "react-router-dom";

const getDefaultForm = () => {
  return {
    id: { value: Date.now(), touched: false, error: 'Obrigatório' },
    proprietario: { value: '', touched: false, error: 'Obrigatório' },
    numeroApartamento: { value: '', touched: false, error: 'Obrigatório' },
    blocoApartamento: { value: '', touched: false, error: 'Obrigatório' },
    placaVeiculo: { value: '', touched: false, error: 'Obrigatório' },
    modeloVeiculo: { value: '', touched: false, error: 'Obrigatório' },
    corVeiculo: { value: '', touched: false, error: 'Obrigatório' },
    numeroVaga: { value: '', touched: false, error: 'Obrigatório' }
  }
}

const showError = (control) => {
  return control.touched && !!control.error;
}

const RegistrarVagas = ({ showToast }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(getDefaultForm());

  const populateForm = (vaga) => {
    for (const prop in vaga) {
      const control = form[prop];
      control.value = vaga[prop];
      control.touched = false;
      control.error = null;
    }
    setForm({ ...form });
  }

  useEffect(() => {
    const vagaParaEditar = location.state?.vagaParaEditar;
    if (vagaParaEditar) {
      populateForm(vagaParaEditar);
    }
  }, [location.state]);

  const formIsValid = () => {
    for (const prop in form) {
      if (prop === 'id') continue;
      if (form[prop].error) {
        return false
      }
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) {
      console.log('formInvalid')
      console.log(form);
      markAllAsTouched();
      return;
    }
    if (isEditing()) {
      atualizarVaga(readForm());
      showToast('Vaga atualizada com sucesso!');
      navigate('/consulta-vagas');
    } else {
      salvarVaga(readForm());
      showToast('Vaga cadastrada com sucesso!');
    }

    setForm(getDefaultForm());
  };

  const markAllAsTouched = () => {
    for (const prop in form) {
      form[prop].touched = true;
    }
    setForm({ ...form });
  }

  const readForm = () => {
    const vaga = {};
    for (const prop in form) {
      vaga[prop] = form[prop].value;
    }
    return vaga;
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    const control = form[id];
    control.value = value;
    control.touched = true;
    let errorMessage = null
    if (value == '') {
      errorMessage = 'Obrigatório';
    }
    control.error = errorMessage;
    form[id] = control;
    setForm({ ...form });
  }

  const isEditing = () => {
    return !!location.state?.vagaParaEditar;
  }
  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit} noValidate className="needs-validation">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${showError(form.proprietario) ? 'is-invalid' : ''}`}
                id="proprietario"
                placeholder="Nome do proprietário"
                value={form.proprietario.value}
                onChange={handleChange}
                required
              />
              <label htmlFor="proprietario">Nome do proprietário</label>
              {showError(form.proprietario) && <div className="invalid-feedback">{form.proprietario.error}</div>}
            </div>
          </div>

          <div className="col-sm-12 col-md-4">
            <div className="form-floating">
              <input
                type="number"
                className={`form-control ${showError(form.numeroApartamento) ? 'is-invalid' : ''}`}
                id="numeroApartamento"
                placeholder="Número do apartamento"
                value={form.numeroApartamento.value}
                onChange={handleChange}
                required
              />
              <label htmlFor="numeroApartamento">Número do apartamento</label>
              {showError(form.numeroApartamento) && <div className="invalid-feedback">{form.numeroApartamento.error}</div>}
            </div>
          </div>

          <div className="col-sm-12 col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${showError(form.blocoApartamento) ? 'is-invalid' : ''}`}
                id="blocoApartamento"
                placeholder="Bloco do apartamento"
                value={form.blocoApartamento.value}
                onChange={handleChange}
                required
              />
              <label htmlFor="blocoApartamento">Bloco do apartamento</label>
              {showError(form.blocoApartamento) && <div className="invalid-feedback">{form.blocoApartamento.error}</div>}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${showError(form.placaVeiculo) ? 'is-invalid' : ''}`}
                id="placaVeiculo"
                placeholder="Placa do veículo"
                value={form.placaVeiculo.value}
                onChange={handleChange}
                required
              />
              <label htmlFor="placaVeiculo">Placa do veículo</label>
              {showError(form.placaVeiculo) && <div className="invalid-feedback">{form.placaVeiculo.error}</div>}
            </div>
          </div>

          <div className="col-sm-12 col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${showError(form.modeloVeiculo) ? 'is-invalid' : ''}`}
                id="modeloVeiculo"
                placeholder="Modelo do veículo"
                value={form.modeloVeiculo.value}
                onChange={handleChange}
                required
              />
              <label htmlFor="modeloVeiculo">Modelo do veículo</label>
              {showError(form.modeloVeiculo) && <div className="invalid-feedback">{form.modeloVeiculo.error}</div>}
            </div>
          </div>

          <div className="col-sm-12 col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${showError(form.corVeiculo) ? 'is-invalid' : ''}`}
                id="corVeiculo"
                placeholder="Cor do veículo"
                value={form.corVeiculo.value}
                onChange={handleChange}
                required
              />
              <label htmlFor="corVeiculo">Cor do veículo</label>
              {showError(form.corVeiculo) && <div className="invalid-feedback">{form.corVeiculo.error}</div>}
            </div>
          </div>

          <div className="col-sm-12 col-md-3">
            <div className="form-floating">
              <input
                type="number"
                className={`form-control ${showError(form.numeroVaga) ? 'is-invalid' : ''}`}
                id="numeroVaga"
                placeholder="Número da vaga"
                value={form.numeroVaga.value}
                onChange={handleChange}
                required
              />
              <label htmlFor="numeroVaga">Número da vaga</label>
              {showError(form.numeroVaga) && <div className="invalid-feedback">{form.numeroVaga.error}</div>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary btn-lg">
                {
                  isEditing() ? 'Atualizar' : 'Cadastrar'
                }
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrarVagas;
