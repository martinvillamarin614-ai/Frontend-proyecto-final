import { useState, useEffect } from "react";
import axios from "axios";

function FormularioResena() {
  const [juegoId, setJuegoId] = useState("");
  const [juegos, setJuegos] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [textoReseña, setTextoReseña] = useState("");
  const [horasJugadas, setHorasJugadas] = useState("");
  const [dificultad, setDificultad] = useState("Normal");
  const [recomendaria, setRecomendaria] = useState(false);

  // cargar los juegos
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/juegos")
      .then((res) => setJuegos(res.data))
      .catch((err) => console.error("Error al cargar juegos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/resenas", {
        juegoId,
        puntuacion,
        textoReseña,
        horasJugadas,
        dificultad,
        recomendaria,
      });
      alert("Reseña guardada correctamente");
      // limpiar formulario
      setJuegoId("");
      setPuntuacion(0);
      setTextoReseña("");
      setHorasJugadas("");
      setDificultad("Normal");
      setRecomendaria(false);
    } catch (err) {
      console.error("Error al guardar reseña:", err);
      alert("Error al guardar reseña, revisa la consola.");
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>📝 Escribir Reseña</h2>

      <select
        value={juegoId}
        onChange={(e) => setJuegoId(e.target.value)}
        required
      >
        <option value="">Selecciona un juego</option>
        {juegos.map((juego) => (
          <option key={juego._id} value={juego._id}>
            {juego.titulo}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Puntuación (1-5)"
        min="1"
        max="5"
        value={puntuacion}
        onChange={(e) => setPuntuacion(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Horas jugadas"
        value={horasJugadas}
        onChange={(e) => setHorasJugadas(e.target.value)}
      />

      <select
        value={dificultad}
        onChange={(e) => setDificultad(e.target.value)}
      >
        <option value="Fácil">Fácil</option>
        <option value="Normal">Normal</option>
        <option value="Difícil">Difícil</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={recomendaria}
          onChange={(e) => setRecomendaria(e.target.checked)}
        />{" "}
        ¿Lo recomendarías?
      </label>

      <textarea
        placeholder="Tu reseña..."
        value={textoReseña}
        onChange={(e) => setTextoReseña(e.target.value)}
        required
      />

      <button type="submit">Guardar reseña</button>
    </form>
  );
}

export default FormularioResena;
