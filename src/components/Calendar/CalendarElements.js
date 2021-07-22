import styled from 'styled-components'
import { Link} from 'react-router-dom'

export const Container = styled.div`
    min-height: 692px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(
        108deg,
        rgba(1, 147, 86, 1) 0%,
        rgba(10, 201, 122, 1) 100%
    );

`;

export const FormWrap = styled.div`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media screen and (max-width: 400px){
            height: 80%;
        }
`

export const Icon = styled(Link)`
        margin-left: 32px;
        margin-top: 32px;
        color: #fff;
        justify-self: flex-start;
        cursor: pointer;
        font-size: 2rem;
        display: flex;
        align-items: center;
        font-weight: bold;
        text-decoration: none;

        @media screen and (max-width: 480px){
            margin-left: 16px;
            margin-top: 8px;
        }
`
export const FormContent = styled.div`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media screen and (max-width: 480px){
            padding: 10px;
        }
`

export const Form = styled.form`
        background: #010101;
        height: 1050px;
        width: 1500px;
        z-index: 1;
        display: grid;
        margin: 0 auto;
        padding: 80px 32px;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0, 0.9);

        @media screen and (max-width: 400px){
            padding: 32px 32px;
        }
`
export const FormH1 = styled.h1`
        margin-bottom: 40px;
        color: #fff;
        font-size: 20px;
        font-weight: 400;
        text-align: center;
`

export const FormLabel = styled.div`
        margin-bottom: 8px;
        font-size: 14px;
        color: #fff;
`

export const FormButton = styled.button`
        background: #01bf71;
        padding: 16px 0;
        border: none;
        boder-radius: 4px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
`

export const Text = styled.span`
        text-align: centerl
        margin-top: 24px;
        color: #fff;
        font-size: 14px;
`