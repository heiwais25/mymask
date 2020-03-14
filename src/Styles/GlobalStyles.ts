import { createGlobalStyle } from "./index";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    @import url("https://fonts.googleapis.com/css?family=Roboto:400,600,700,900&display=swap");
    * {
        box-sizing: border-box;
    }
    body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
        padding-top: 0px
        height: 100%;
    }
    html {
        height: 100%;
    }
    #root {
        height: 100%;
    }
    a {
        color:${props => props.theme.blueColor};
        text-decoration:none;
        outline: none !important;
    }
    svg {
        user-select: none;
    }

    input:focus{
        outline:none;
    }
    textarea {
        font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    }
    
`;
