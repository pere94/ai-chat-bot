// import logo from './logo.svg';
import logo from "./img/delicious-italian-food-removebg-preview.png";
import "./App.css";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";


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
  const [pedido, setPedido] = React.useState(pedido_pizza);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const dfMessenger = document.querySelector("df-messenger");
  dfMessenger.addEventListener("df-response-received", function (event) {
    // Handle event
    console.log(event.detail.response.queryResult.parameters);
    // console.log(event.detail.response.queryResult.queryText);
    const response = event.detail.response.queryResult.parameters;

    if(response.tamano_pizza) {
      setPedido({
        ...pedido,
        tamano: response.tamano_pizza
      })
    }

    if(response.tipo_masa) {
      setPedido({
        ...pedido,
        tipo_masa: response.tipo_masa
      })
    }
    
    if(response.gluten) {
      setPedido({
        ...pedido,
        gluten: response.gluten
      })
    }

    if(response.salsa) {
      setPedido({
        ...pedido,
        salsa: response.salsa
      })
    }

    if(response.queso) {
      setPedido({
        ...pedido,
        tipo_queso: response.queso
      })
    }

    if(response.cant_queso) {
      setPedido({
        ...pedido,
        cant_queso: response.cant_queso
      })
    }

  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Domino’s Pizza</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "rgba(255,255,255,0.2)",
          borderRadius: "5px",
          marginTop: "30px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Tu Pedido
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemText primary={`Tamaño: ${pedido.tamano}`} />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary={`Tipo de Masa: ${pedido.tipo_masa}`} />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary={`Gluten: ${pedido.gluten}`} />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary={`Salsa: ${pedido.salsa}`} />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary={`Tipo de Queso: ${pedido.tipo_queso}`} />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary={`Cantidad Queso: ${pedido.cant_queso}`} />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Ingredientes o Agregos:" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default App;
