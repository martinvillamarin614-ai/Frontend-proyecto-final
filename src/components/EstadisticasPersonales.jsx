import { useEffect, useState } from "react";
import axios from "axios";

function EstadisticasPersonales({ recargar }) {
  const [stats, setStats] = useState({
    total: 0,
    completados: 0,
    pendientes: 0,
  });

  const cargarStats = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/juegos");
      const juegos = res.data;
      const total = juegos.length;
      const completados = juegos.filter((j) => j.completado).length;
      const pendientes = total - completados;
      setStats({ total, completados, pendientes });
    } catch (err) {
      console.error("Error al cargar estadísticas:", err);
    }
  };

  useEffect(() => {
    cargarStats();
  }, [recargar]); // recargar la pagina cada que recargue

  return (
    <div className="estadisticas">
      <h2>📊 Estadísticas personales</h2>
      <p>Total de juegos: {stats.total}</p>
      <p>Completados: {stats.completados}</p>
      <p>Pendientes: {stats.pendientes}</p>
    </div>
  );
}

export default EstadisticasPersonales;