import React, { useState } from 'react';
import axios from 'axios';
import { Paciente } from '../types';

interface PacienteFormProps {
  onAddPaciente: (paciente: Paciente) => void;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ onAddPaciente }) => {
  const [paciente, setPaciente] = useState<Paciente>({
    id: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    telefono: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaciente({
      ...paciente,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/clinicadental/pacientes', paciente);
      onAddPaciente(response.data);
      setPaciente({
        id: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        telefono: ''
      });
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={paciente.nombre} onChange={handleChange} />
      </div>
      <div>
        <label>Apellido:</label>
        <input type="text" name="apellido" value={paciente.apellido} onChange={handleChange} />
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input type="date" name="fechaNacimiento" value={paciente.fechaNacimiento} onChange={handleChange} />
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="tel" name="telefono" value={paciente.telefono} onChange={handleChange} />
      </div>
      <button className="submit-button" type="submit">Enviar</button>
    </form>
  );
};

export default PacienteForm;