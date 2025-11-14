import BibliotecaJuegos from "./components/BibliotecaJuegos";
import ListaResenas from "./components/ListaResenas";
import FormularioResena from "./components/FormularioResena";


function App() {
  return (
    <div className="app">
      <BibliotecaJuegos />
      <FormularioResena />
      <ListaResenas />
    </div>
  );
}

export default App;
