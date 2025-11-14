import { useState } from "react";
import axios from "axios";

function TarjetaJuego({ juego, onActualizar, onEliminar }) {
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...juego });

  const guardarCambios = async () => {
    try {
      await axios.put(`http://localhost:4000/api/juegos/${juego._id}`, formData);
      alert(" Juego actualizado");
      setEditando(false);
      onActualizar();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert(" No se pudo actualizar");
    }
  };

  const eliminarJuego = async () => {
    if (!window.confirm("¿Eliminar este juego?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/juegos/${juego._id}`);
      onEliminar(juego._id);
      alert(" Juego eliminado");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert(" No se pudo eliminar");
    }
  };

  return (
    <div className="juego-card">
      {editando ? (
        <>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          />
          <input
            type="text"
            value={formData.plataforma}
            onChange={(e) =>
              setFormData({ ...formData, plataforma: e.target.value })
            }
          />
          <input
            type="text"
            value={formData.genero}
            onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
          />
          <input
            type="number"
            value={formData.añoLanzamiento}
            onChange={(e) =>
              setFormData({ ...formData, añoLanzamiento: e.target.value })
            }
          />
          <textarea
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
          />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setEditando(false)}> Cancelar</button>
        </>
      ) : (
        <>
          <img
            src={juego.imagenPortada || "https://via.placeholder.com/200"}
            alt={juego.titulo}
            className="portada"
          />
          <h3>{juego.titulo}</h3>
          <p> {juego.plataforma}</p>
          <p> {juego.genero}</p>
          <p> {juego.añoLanzamiento}</p>
          <p>{juego.descripcion}</p>
          <p>{juego.completado ? "✅ Completado" : "🕐 Pendiente"}</p>
          <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
            <button onClick={() => setEditando(true)}> Editar</button>
            <button onClick={eliminarJuego}> Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TarjetaJuego;
