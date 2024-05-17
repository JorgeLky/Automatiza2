import styled from "styled-components";

export const ErrorMessage = styled("div")`
    color: ${props => props.theme.red};
    
    span {
        font-size: 12.5px;
    }
`