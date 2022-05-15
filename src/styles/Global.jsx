import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`


    *,*::before,*::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        
    }

    body{
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background:  linear-gradient(to right top, #65dfc9, #6cdbeb);;
    }

    @keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`;

export default GlobalStyles;
