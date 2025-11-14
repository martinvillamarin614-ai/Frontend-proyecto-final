import { useEffect, useState } from "react";
import axios from "axios";
import TarjetaJuego from "./TarjetaJuego";
import EstadisticasPersonales from "./EstadisticasPersonales";

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [recargarStats, setRecargarStats] = useState(0);

  const [nuevoJuego, setNuevoJuego] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    añoLanzamiento: "",
    descripcion: "",
    imagenPortada: "",
    completado: false,
  });

  // cargar juegos
  const cargarJuegos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/juegos");
      setJuegos(res.data);
    } catch (error) {
      console.error("Error al cargar juegos:", error);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  // agregar juego
  const agregarJuego = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/juegos", nuevoJuego);
      alert("Juego añadido correctamente");
      setNuevoJuego({
        titulo: "",
        plataforma: "",
        genero: "",
        añoLanzamiento: "",
        descripcion: "",
        imagenPortada: "",
        completado: false,
      });
      await cargarJuegos();
      setRecargarStats((prev) => prev + 1);
    } catch (error) {
      console.error("Error al agregar juego:", error);
      alert("Error al agregar juego");
    }
  };

  // borrar juego
  const eliminarJuego = async (id) => {
    if (!window.confirm("¿Eliminar este juego?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/juegos/${id}`);
      setJuegos(juegos.filter((j) => j._id !== id));
      setRecargarStats((prev) => prev + 1);
    } catch (error) {
      console.error("Error al eliminar juego:", error);
    }
  };

  // filtro
  const juegosFiltrados = juegos.filter(
    (j) =>
      j.genero?.toLowerCase().includes(filtro.toLowerCase()) ||
      j.plataforma?.toLowerCase().includes(filtro.toLowerCase()) ||
      j.titulo?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (

    

    <div className="biblioteca-container">
     <h2 className="titulo">Mi Biblioteca de Videojuegos</h2>
      <input
        type="text"
        placeholder="Filtrar por título, género o plataforma"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="input-busqueda"
      />

      <form onSubmit={agregarJuego} className="formulario">
        <h3>➕ Añadir Nuevo Juego</h3>

        <input
          type="text"
          placeholder="Título"
          value={nuevoJuego.titulo}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, titulo: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Plataforma"
          value={nuevoJuego.plataforma}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, plataforma: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Género"
          value={nuevoJuego.genero}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, genero: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Año de lanzamiento"
          value={nuevoJuego.añoLanzamiento}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, añoLanzamiento: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="URL de imagen (opcional)"
          value={nuevoJuego.imagenPortada}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, imagenPortada: e.target.value })
          }
        />

        <textarea
          placeholder="Descripción"
          value={nuevoJuego.descripcion}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, descripcion: e.target.value })
          }
        />

        <button type="submit" className="btn-guardar">
          Guardar Juego
        </button>
      </form>

      <div className="lista-juegos">
        {juegosFiltrados.map((juego) => (
          <TarjetaJuego
            key={juego._id}
            juego={juego}
            onActualizar={() => {
              cargarJuegos();
              setRecargarStats((prev) => prev + 1);
            }}
            onEliminar={eliminarJuego}
          />
        ))}
      </div>

      <EstadisticasPersonales recargar={recargarStats} />
    </div>
  );
}

export default BibliotecaJuegos;
