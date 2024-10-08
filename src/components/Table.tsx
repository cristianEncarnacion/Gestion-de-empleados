import Button from "./Button";

type Props = {
  datos: {
    id?: number;
    nombre: string;
    edad: string;
    ciudad: string;
    cargo: string;
    experiencia: string;
  }[];
  onEdit: (id: number | undefined) => void;
  onDelete: (id: number | undefined) => void;
};

const Table = ({ datos, onEdit, onDelete }: Props) => {
  return (
    <table className="table text-center width">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">Ciudad</th>
          <th scope="col">Cargo</th>
          <th scope="col">Experiencia</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((dato, index) => (
          <tr key={index}>
            <td>{dato.nombre}</td>
            <td>{dato.edad}</td>
            <td>{dato.ciudad}</td>
            <td>{dato.cargo}</td>
            <td>{dato.experiencia}</td>
            <td className="d-flex column-gap-1 justify-content-center align-items-center">
              <Button
                title="Editar"
                className="btn btn-warning"
                handleClick={() => onEdit(dato.id)}
              />
              <Button
                title="Eliminar"
                className="btn btn-danger"
                handleClick={() => onDelete(dato.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
