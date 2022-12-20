import logo from "../../assets/images/logo.png"
import Form from "../../assets/styles/Form"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { SECONDARY_COLOR } from "../../constants/colors"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { URL } from "../../constants/urls"
import Context from "../../contexts/Context"
import { ThreeDots } from "react-loader-spinner";


export default function HomePage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { userInfo, setUserInfo } = useContext(Context);
    const { setConfig } = useContext(Context);

    const loginForm = {
        email: email,   
        password: password
    }

    function loginSubmit(e) {

        e.preventDefault()

        setLoading(true)

        const promise = axios.post(`${URL}/auth/login`, loginForm)

        promise.then((res) => {
            setUserInfo(res.data)
            setConfig({
                headers: {
                    Authorization: `Bearer ${res.data.token}`,
                },
            })     
            
            const localInfo = JSON.stringify(res.data)
            localStorage.setItem("userInfo", localInfo)

            setLoading(false)
            navigate("/hoje") 
        })
        
        console.log(userInfo)

        promise.catch((err) => {
            setLoading(false)
            alert(err.response.data.message)
        })
       
    }

    useEffect(()=> {
        const savedInfo = JSON.parse(localStorage.getItem("userInfo"))
        
        if(savedInfo !== null) {
            setUserInfo(savedInfo)
            setConfig({
                headers: {
                    Authorization: `Bearer ${savedInfo.token}`,
                },
            })     
            navigate("/hoje")

        }
    })

    return (
        <Container>
            <img src={logo} alt="logo" />
            <Form onSubmit={loginSubmit} >
                <input type="email" placeholder="email" data-test="email-input" onChange={(e) => setEmail(e.target.value)} disabled={loading} required/>
                <input type="password" placeholder="senha" data-test="password-input" onChange={(e) => setPassword(e.target.value)} disabled={loading} required/>
                {loading ? (
                <Button disabled={loading}><ThreeDots type="ThreeDots" color="#FFFFFF" height={45} width={60} /></Button>) : (
                <Button disabled={loading} data-test="login-btn" type="submit">Entrar</Button>)}                
            </Form>
            <Link to={`/cadastro`} data-test="signup-link">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    height: 100vh;
    width: 100%;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    img {
        margin: 68px 0 32px 0;
    }
    a {
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: ${SECONDARY_COLOR};
        margin: 25px 0 0 0;
    }
`

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    
`