import React, { useState, useEffect, useContext } from "react";
import "../styles/MisComprasUsuario.css";
import { API_BASE_URL } from "../config/api";
import { AuthContext } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import ModalCancelarPedido from "../components/ModalCancelarPedido";

function MisComprasUsuario() {
  const { usuario, logout } = useContext(AuthContext); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token || !usuario) {
          setError("No autorizado");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/usuario`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Error al obtener los datos de las compras");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos de las compras");
        setLoading(false);
      }
    };

    if (usuario) {
      fetchUsuario();
    }
  }, [usuario]); 

  const compras = [
    {
      id: "C-10324",
      fecha: "2025-01-18T14:20:00",
      productos: [
        { nombre: "Silla Ergonómica X-200", imagen: "https://picsum.photos/600", cantidad:1, precioUnitario:4000  },
        { nombre: "Escritorio Plegable Pro", imagen: "https://picsum.photos/600", cantidad:1, precioUnitario:4000  },
        { nombre: "Lámpara LED Vintage", imagen: "https://picsum.photos/600", cantidad:1, precioUnitario:4000  },
        { nombre: "Alfombra Moderna XL", imagen: "https://picsum.photos/600", cantidad:1, precioUnitario:4000  },
        { nombre: "Repisa Flotante", imagen: "https://picsum.photos/600", cantidad:1, precioUnitario:4000  }, 
        { nombre: "Silla Nordic Blanca", imagen: "https://picsum.photos/600", cantidad:1, precioUnitario:4000 },
      ],
      total:24000,
      estado: "En preparación",
    },
    {
      id: "C-10317",
      fecha: "2025-01-10T09:12:00",
      productos: [
        { nombre: "Mesa de Roble Premium", imagen: "https://picsum.photos/600", cantidad:1, precioUnitario:4000  },
        { nombre: "Silla Nordic Blanca", imagen: "https://picsum.photos/600", cantidad:2, precioUnitario:4000  },
      ],
      total:12000,
      estado: "En camino",
    },
    {
      id: "C-10301",
      fecha: "2024-12-28T17:40:00",
      productos: [
        { nombre: "Lámpara LED Vintage", imagen: "https://picsum.photos/600", cantidad:1, precioUnitario:4000  },
      ],
      total:4000,
      estado: "Entregado",
    },
  ];


  return (
    <div className="mis-compras-container">
      <div className="compras-tarjeta">
        <h2 className="titulo-compras">Mis Compras</h2>

        {error && <p className="errorCompras active">* {error}</p>}
        {loading && <p>Cargando compras...</p>}

        {!loading && !error && compras.length > 0 && (
          <div className="tabla-compras-container">
            <table className="tabla-compras">
              <thead>
                <tr>
                  <th>Nro Compra</th>
                  <th>Fecha</th>
                  <th>Productos</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((compra) => {
                  const productosMax = compra.productos.slice(0, 4);
                  const restantes = compra.productos.length - 4;

                  return (
                    <tr key={compra.id}>
                      <td>{compra.id}</td>
                      <td>{new Date(compra.fecha).toLocaleDateString()}</td>
                      <td>
                        <div className="grid-productos">
                          {productosMax.map((p, index) => (
                            <div key={index} className="producto-mini">
                              <img src={p.imagen} alt={p.nombre} />
                              {index === 3 && restantes > 0 && (
                                <div className="overlay-mas">
                                  +{restantes}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="td-acciones">
                        <button
                          className="btn-detalle"
                          onClick={() => navigate(`/mis-compras/${compra.id}`)}
                        >
                          Ver detalle
                        </button>
                        {compra.estado !== "Entregado" && (
                          <button
                            className="btn-cancelar-pedido"
                            onClick={() => setModalAbierto(true)}
                          >
                            Cancelar Pedido
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <ModalCancelarPedido
          abierto={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onConfirmar={(motivo) => {
            alert("Pedido cancelado. Motivo: " + motivo);
            setModalAbierto(false);
          }}
        />

      </div>
    </div>
  );
}

export default MisComprasUsuario;