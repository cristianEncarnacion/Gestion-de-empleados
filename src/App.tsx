import { useState, useEffect } from "react";
import Button from "./components/Button";
import Table from "./components/Table";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  id?: number;
  nombre: string;
  edad: string;
  ciudad: string;
  cargo: string;
  experiencia: string;
}

function App() {
  const [value, setValue] = useState<Props>({
    nombre: "",
    edad: "",
    ciudad: "",
    cargo: "",
    experiencia: "",
  });

  const [savedValue, setSavedValue] = useState<Props[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    const response = await fetch("http://localhost:3000/form", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setError("Error al obtener los datos");
    } else {
      const data = await response.json();
      setSavedValue(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValue((prev: Props) => ({
      ...prev,
      [name]:
        name === "edad" || name === "experiencia" ? parseInt(value) : value,
    }));
  }

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!value.nombre || !value.edad || !value.ciudad || !value.cargo) {
      setError("Todos los campos son obligatorios");
      return;
    }
    const response = await fetch(
      isEditing
        ? `http://localhost:3000/form/${editId}`
        : "http://localhost:3000/form",
      {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }
    );

    if (response.status === 400) {
      setError("Error al enviar el formulario");
      return;
    }
    if (response.ok) {
      e.preventDefault();
      setIsEditing(false);
      setError(null);
      fetchData();
      setValue({
        nombre: "",
        edad: "",
        ciudad: "",
        cargo: "",
        experiencia: "",
      });
    } else {
      setError("Error al enviar el formulario");
    }
  }

  async function handleDelete(id: number | undefined) {
    const response = await fetch(`http://localhost:3000/form/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const newSavedValue = savedValue.filter((item) => item.id !== id);
      setSavedValue(newSavedValue);
      setError(null);
    } else {
      setError("Error al eliminar el registro");
    }
  }

  function handleEdit(id: number | undefined) {
    const itemToEdit = savedValue.find((item) => item.id === id);
    if (itemToEdit) {
      setValue(itemToEdit);
      setIsEditing(true);
      setEditId(id);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Gestion de empleados
        </h1>
        <input
          name="nombre"
          type="text"
          value={value.nombre}
          onChange={onChange}
          placeholder="Ingrese su nombre"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="edad"
          type="number"
          value={value.edad}
          onChange={onChange}
          placeholder="Ingrese su edad"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="ciudad"
          type="text"
          value={value.ciudad}
          onChange={onChange}
          placeholder="Ingrese su ciudad"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="cargo"
          type="text"
          value={value.cargo}
          onChange={onChange}
          placeholder="Ingrese su cargo"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="experiencia"
          type="number"
          value={value.experiencia}
          onChange={onChange}
          placeholder="Ingrese sus años de experiencia"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          title={isEditing ? "Actualizar" : "Enviar"}
          handleClick={handleClick}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        />
      </div>

      <div className="w-full max-w-2xl mt-8">
        <Table datos={savedValue} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
