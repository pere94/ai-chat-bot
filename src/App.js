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
import BasicModal from "./components/PayModal";


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
  const [finPedido, setFinPedido] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  let AgregoYaRenderizado = [];
  const dfMessenger = document.querySelector("df-messenger");
  dfMessenger.addEventListener("df-response-received", function (event) {
    // Handle event
    // console.log(event.detail.response.queryResult.parameters);
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

    if(response.cant_queso) {
      setPedido({
        ...pedido,
        cant_queso: response.cant_queso
      })
    }

    if(response.agregos_extra) {
        setPedido({
          ...pedido,
          ingredientes: [...pedido.ingredientes, response.agregos_extra]
        })
    }

    if(response.event_agregos) {
      if (response.event_agregos === "reset agregos") {
        setPedido({
          ...pedido,
          ingredientes: pedido_pizza.ingredientes
        })
        AgregoYaRenderizado = new Array([]);
      } 
      if (response.event_agregos === "listo") {
        setFinPedido(true);
        console.log("🚀 ~ file: App.js ~ line 107 ~ response.event_agregos", response.event_agregos);
      } 

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
            {pedido.ingredientes.map((ingredient, index) => {
              if (!AgregoYaRenderizado.includes(ingredient)) {
                AgregoYaRenderizado.push(ingredient);
                return (
                <ListItemButton key={`Agregos-${ingredient}-${index}`} sx={{ pl: 4 }}>
                  <ListItemText primary={`${pedido.ingredientes.filter(item => item === ingredient).length} ${ingredient}`} />
                </ListItemButton>)
              } else return (<React.Fragment key={`Agregos-${ingredient}-${index}`}></React.Fragment>)
              
            })}
          </List>
        </Collapse>
      </List>
      {finPedido && <BasicModal pedido={pedido} finPedido={finPedido} setFinPedido={setFinPedido}/>}
    </div>
  );
}

export default App;


