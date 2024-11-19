import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PacienteList from './components/PacienteList';
import PacienteForm from './components/PacienteForm';
import { Paciente } from './types';
import './App.css'; // Importa el archivo CSS

const App: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('/clinicadental/pacientes');
        setPacientes(response.data);
      } catch (error) {
        console.error('Error al cargar la lista de pacientes', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleAddPaciente = (nuevoPaciente: Paciente) => {
    setPacientes([...pacientes, nuevoPaciente]);
  };

  const handleUpdatePaciente = (updatedPaciente: Paciente) => {
    setPacientes(pacientes.map(paciente => (paciente.id === updatedPaciente.id ? updatedPaciente : paciente)));
  };

  const handleDeletePaciente = (id: string) => {
    setPacientes(pacientes.filter(paciente => paciente.id !== id));
  };

  return (
    <div className="container">
      <h1>Gestión de Pacientes</h1>
      <PacienteForm onAddPaciente={handleAddPaciente} />
      <PacienteList
        pacientes={pacientes}
        onUpdatePaciente={handleUpdatePaciente}
        onDeletePaciente={handleDeletePaciente}
      />
    </div>
  );
};

export default App;