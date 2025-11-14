import { useEffect, useState } from "react";
import axios from "axios";

function ListaResenas() {
  const [resenas, setResenas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    puntuacion: "",
    horasJugadas: "",
    dificultad: "",
    recomendaria: false,
    textoReseña: "",
  });

  // cargar reseñas 
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/resenas")
      .then((res) => setResenas(res.data))
      .catch((err) => console.error("Error al cargar reseñas:", err));
  }, []);

  // eliminar reseña
  const eliminarResena = async (id) => {
    if (!window.confirm("¿Eliminar esta reseña?")) return;
    await axios.delete(`http://localhost:4000/api/resenas/${id}`);
    setResenas(resenas.filter((r) => r._id !== id));
  };

  // activar modo edición
  const editarResena = (resena) => {
    setEditando(resena._id);
    setFormData({
      puntuacion: resena.puntuacion || "",
      horasJugadas: resena.horasJugadas || "",
      dificultad: resena.dificultad || "",
      recomendaria: resena.recomendaria || false,
      textoReseña: resena.textoReseña || "",
    });
  };

  // guardar cambios
  const guardarCambios = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/resenas/${id}`, formData);
      alert("💾 Reseña actualizada");
      const res = await axios.get("http://localhost:4000/api/resenas");
      setResenas(res.data);
      setEditando(null);
    } catch (err) {
      console.error("Error al actualizar reseña:", err);
      alert(" Error al actualizar reseña");
    }
  };

  return (
    <div className="resenas">
      <fieldset className="resenas">
      <h2>⭐ Reseñas de Juegos</h2>

      {resenas.length === 0 ? (
        <p>No hay reseñas todavía.</p>
      ) : (
        resenas.map((r) => (
          <div key={r._id} className="resena-card">
            {editando === r._id ? (
              <>
                <h3> {r.juegoId?.titulo || "Juego desconocido"}</h3>
                <label>
                   Puntuación:
                  <input
                    type="number"
                    value={formData.puntuacion}
                    onChange={(e) =>
                      setFormData({ ...formData, puntuacion: e.target.value })
                    }
                    min="1"
                    max="5"
                  />
                </label>
                <label>
                  Horas jugadas:
                  <input
                    type="number"
                    value={formData.horasJugadas}
                    onChange={(e) =>
                      setFormData({ ...formData, horasJugadas: e.target.value })
                    }
                  />
                </label>
                <label>
                  Dificultad:
                  <input
                    type="text"
                    value={formData.dificultad}
                    onChange={(e) =>
                      setFormData({ ...formData, dificultad: e.target.value })
                    }
                  />
                </label>
                <label>
                  Recomendaría:
                  <input
                    type="checkbox"
                    checked={formData.recomendaria}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recomendaria: e.target.checked,
                      })
                    }
                  />
                </label>
                <label>
                  📝 Reseña:
                  <textarea
                    value={formData.textoReseña}
                    onChange={(e) =>
                      setFormData({ ...formData, textoReseña: e.target.value })
                    }
                  />
                </label>

                <button onClick={() => guardarCambios(r._id)}> Guardar</button>
                <button onClick={() => setEditando(null)}> Cancelar</button>
              </>
            ) : (
              <>
               
                <h3> {r.juegoId?.titulo || "Juego desconocido"}</h3>
                <p>
                  <strong> Puntuación:</strong> {r.puntuacion}/5
                </p>
                <p>
                  <strong> Horas jugadas:</strong>{" "}
                  {r.horasJugadas ? `${r.horasJugadas} h` : "No registradas"}
                </p>
                <p>
                  <strong> Dificultad:</strong>{" "}
                  {r.dificultad || "Sin especificar"}
                </p>
                <p>
                  <strong> ¿Recomendaría?:</strong>{" "}
                  {r.recomendaria ? "Sí" : "No"}
                </p>
                <p>
                  <strong> Reseña:</strong> {r.textoReseña || "Sin comentario"}
                </p>
                <p>
                  <small>
                     Fecha:{" "}
                    {r.fechaCreacion
                      ? new Date(r.fechaCreacion).toLocaleDateString()
                      : "Sin fecha"}
                  </small>
                </p>
                <div >
                  <button onClick={() => editarResena(r)}> Editar</button>
                  <button onClick={() => eliminarResena(r._id)}> Eliminar</button>
                </div>
                
              </>
            )}
          </div>
        ))
      )}
      </fieldset>
    </div>
  );
}

export default ListaResenas;
