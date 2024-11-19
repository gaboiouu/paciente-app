import React, { useState } from 'react';
import axios from 'axios';
import { Paciente } from '../types';

interface PacienteListProps {
  pacientes: Paciente[];
  onUpdatePaciente: (paciente: Paciente) => void;
  onDeletePaciente: (id: string) => void;
}

const PacienteList: React.FC<PacienteListProps> = ({ pacientes, onUpdatePaciente, onDeletePaciente }) => {
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/clinicadental/pacientes/${id}`);
      onDeletePaciente(id);
    } catch (error) {
      console.error('Error al eliminar el paciente', error);
    }
  };

  const handleEdit = (paciente: Paciente) => {
    setEditingPaciente(paciente);
  };

  const handleUpdate = async (updatedPaciente: Paciente) => {
    try {
      const response = await axios.put(`/clinicadental/pacientes/${updatedPaciente.id}`, updatedPaciente);
      onUpdatePaciente(response.data);
      setEditingPaciente(null);
    } catch (error) {
      console.error('Error al actualizar el paciente', error);
    }
  };

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td data-label="Nombre">{paciente.nombre}</td>
              <td data-label="Apellido">{paciente.apellido}</td>
              <td data-label="Fecha de Nacimiento">{paciente.fechaNacimiento}</td>
              <td data-label="Teléfono">{paciente.telefono}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(paciente)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(paciente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingPaciente && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(editingPaciente);
        }}>
          <h3>Editar Paciente</h3>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={editingPaciente.nombre}
              onChange={(e) => setEditingPaciente({ ...editingPaciente, nombre: e.target.value })}
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={editingPaciente.apellido}
              onChange={(e) => setEditingPaciente({ ...editingPaciente, apellido: e.target.value })}
            />
          </div>
          <div>
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={editingPaciente.fechaNacimiento}
              onChange={(e) => setEditingPaciente({ ...editingPaciente, fechaNacimiento: e.target.value })}
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={editingPaciente.telefono}
              onChange={(e) => setEditingPaciente({ ...editingPaciente, telefono: e.target.value })}
            />
          </div>
          <button className="update-button" type="submit">Actualizar</button>
          <button className="cancel-button" type="button" onClick={() => setEditingPaciente(null)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default PacienteList;