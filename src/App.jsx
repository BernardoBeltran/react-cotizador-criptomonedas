import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImagenCriptos from "./assets/imagen-criptos.png";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

// Styled Components
const Contenedor = styled.div`
    width: 90%;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`;

const Imagen = styled.img`
    width: 80%;
    max-width: 400px;
    margin: 100px auto 0 auto;
    display: block;
`;

const Titulo = styled.h1`
    font-family: "Lato", sans-serif;
    color: #fff;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px;

    &::after {
        content: "";
        width: 150px;
        height: 6px;
        background-color: #66a2fe;
        display: block;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
    }
`;

function App() {
    const [monedas, setMonedas] = useState({});
    const [resultado, setResultado] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        // Validar que objeto monedas contenga elementos, antes de la petición
        if (Object.keys(monedas).length > 0) {
            // Petición fetch para Cotizar Criptomoneda
            const cotizarCripto = async () => {
                setCargando(true);
                setResultado({});
                const { moneda, criptomoneda } = monedas;
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                /**
                 * Cambiar estado accediendo dinámicamente a las
                 * propiedades del objeto DISPLAY según la
                 * criptomoneda y moneda seleccionadas
                 */
                setResultado(resultado.DISPLAY[criptomoneda][moneda]);
                setCargando(false);
            };
            cotizarCripto();
        }
    }, [monedas]);

    return (
        <Contenedor>
            <Imagen src={ImagenCriptos} alt="Imagen Criptomonedas" />
            <div>
                <Titulo>Cotización de Criptomonedas en Tiempo Real</Titulo>
                <Formulario setMonedas={setMonedas} />
                {cargando && <Spinner />}
                {resultado.PRICE && <Resultado resultado={resultado} />}
            </div>
        </Contenedor>
    );
}

export default App;
