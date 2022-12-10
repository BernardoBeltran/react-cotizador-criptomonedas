import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../Hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import Error from "./Error";

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    margin-top: 30px;

    &:hover {
        cursor: pointer;
        background-color: #7a7dfe;
    }
`;

const Formulario = ({ setMonedas }) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    // Usando Hook personalizado, para crear elementos 'select',
    // además, recibe 2 argumentos
    const [moneda, SelectMonedas] = useSelectMonedas(
        "Elije tu Moneda",
        monedas
    );
    const [criptomoneda, SelectCriptomonedas] = useSelectMonedas(
        "Elije tu Criptomoneda",
        criptos
    );

    // Petición Fetch a la API de criptos
    useEffect(() => {
        const consultarAPI = async () => {
            const url =
                "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            // Crear objeto con la info necesaria de la API
            const arrayCriptos = resultado.Data.map((cripto) => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName,
                };

                return objeto;
            });

            setCriptos(arrayCriptos);
        };
        consultarAPI();
    }, []);

    // Validación del Formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if ([moneda, criptomoneda].includes("")) {
            setError(true);
            return;
        }

        setError(false);
        setMonedas({ moneda, criptomoneda });
    };

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomonedas />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    );
};

export default Formulario;
