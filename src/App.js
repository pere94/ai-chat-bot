// import logo from './logo.svg';
import logo from "./img/delicious-italian-food-removebg-preview.png";
import "./App.css";

function App() {
  const pedido_pizza = {
    tamano: "",
    tipo_masa: "",
    gluten: "",
    salsa: "",
    tipo_queso: "",
    cant_queso: "",
    ingredientes: [],
    nombre: "",
    telefono: "",
    direccion: "",
  };
  const dfMessenger = document.querySelector("df-messenger");
  dfMessenger.addEventListener("df-response-received", function (event) {
    // Handle event
    console.log(event.detail.response.queryResult.queryText);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Domino’s Pizza</h1>
      </header>
    </div>
  );
}

export default App;
