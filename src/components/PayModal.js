import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "350px",
  height: "600px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflowY: "scroll",
};

export default function BasicModal({ pedido, finPedido, setFinPedido }) {
  const handleOpen = () => setFinPedido(!finPedido);
  let AgregoYaRenderizado = [];

  return (
    <div>
      <Modal
        open={finPedido}
        // onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Checkout
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Solo necesitamos algunos datos más para finalziar:
          </Typography>
          <TextField
            sx={{ width: "100%", marginBottom: "20px" }}
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
          />
          <TextField
            sx={{ width: "100%", marginBottom: "20px" }}
            id="outlined-basic"
            label="Teléfono"
            variant="outlined"
          />
          <TextField
            sx={{ width: "100%", marginBottom: "20px" }}
            id="outlined-basic"
            label="Dirección"
            variant="outlined"
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Tu Pedido:
          </Typography>
          <ul
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <li>{`Tamaño: ${pedido.tamano}`}</li>
            <li>{`Tipo de Masa: ${pedido.tipo_masa}`}</li>
            <li>{`Gluten: ${pedido.gluten}`}</li>
            <li>{`Salsa: ${pedido.salsa}`}</li>
            <li>{`Tipo de Queso: ${pedido.tipo_queso}`}</li>
            <li>{`Cantidad Queso: ${pedido.cant_queso}`}</li>
            <li>
              Ingredientes o Agregos:
              <ul>
                {pedido.ingredientes.map((ingredient, index) => {
                  if (!AgregoYaRenderizado.includes(ingredient)) {
                    AgregoYaRenderizado.push(ingredient);
                    return (
                      <li key={`Checkout-${ingredient}-${index}`}>
                        {`${
                          pedido.ingredientes.filter(
                            (item) => item === ingredient
                          ).length
                        } ${ingredient}`}
                      </li>
                    );
                  } else
                    return (
                      <React.Fragment
                        key={`Checkout-${ingredient}-${index}`}
                      ></React.Fragment>
                    );
                })}
              </ul>
            </li>
          </ul>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button sx={{ marginTop: "20px" }} onClick={handleOpen}>
              Cerrar
            </Button>
            <Button sx={{ marginTop: "20px" }}>Pagar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
