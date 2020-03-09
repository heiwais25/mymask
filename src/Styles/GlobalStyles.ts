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
    }
    a {
        color:${props => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
    textarea {
        font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    }
    
`;
