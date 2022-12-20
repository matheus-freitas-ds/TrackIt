import logo from "../../assets/images/logo.png"
import Form from "../../assets/styles/Form"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { SECONDARY_COLOR } from "../../constants/colors"
import { useState } from "react"
import { URL } from "../../constants/urls"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner";

export default function RegistrationPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

    const registrationForm = {
        email: email,
        name: name,
        image: image,
        password: password
    }

    function registrationSubmit(e) {

        e.preventDefault()

        setLoading(true)

        const promise = axios.post(`${URL}/auth/sign-up`, registrationForm)

        promise.then(() => {
            setLoading(false)
            navigate("/")
        })
        
        promise.catch((err) => {
            setLoading(false)
            alert(err.response.data.message)
        })

        console.log(registrationForm)
        console.log(promise)
    }

    return (
        <Container>
            <img src={logo} alt="logo" />
            <Form onSubmit={registrationSubmit}>
                <input type="email" placeholder="email" data-test="email-input" onChange={(e) => setEmail(e.target.value)} disabled={loading} required/>
                <input type="password" placeholder="senha" data-test="password-input" onChange={(e) => setPassword(e.target.value)} disabled={loading} required/>
                <input type="text" placeholder="nome" data-test="user-name-input" onChange={(e) => setName(e.target.value)} disabled={loading} required/>
                <input type="picture" placeholder="foto" data-test="user-image-input" onChange={(e) => setImage(e.target.value)} disabled={loading} required/>
                {loading ? (
                <Button><ThreeDots type="ThreeDots" color="#FFFFFF" backgroundColor="#52B6FF" height={45} width={60} /></Button>) : (
                <Button disabled={loading} type="submit" data-test="signup-btn">Cadastrar</Button>)}
            </Form>
            <Link to={`/`} data-test="login-link">
                <p>Já tem uma conta? Faça login!</p>
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