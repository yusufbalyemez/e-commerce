import { useState } from "react"
import { message } from 'antd'; //message butonu ant kütüphanesinden çekildi
import { useNavigate } from "react-router-dom";

const Register = () => {

 
    //toplu useState yöntemi
    //inputtaki name kısmıda burada verdiklerimle aynı olmalı ya da buradakiler oradakilerle aynı olmalı
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    //inputtaki verileri toplu almak için
    const handleInputChanged = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }) //tümünü yerleştir, name bilgisine göre value yi al demekmiş
    }


    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log(formData)
        // console.log("veri kayıt edildi.")

        try {
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData) //JSON.stringify() fonksiyonu önemli. Json formatına döndürüp göndermek için
            });
            if(response.ok){
                const data = await response.json();
                const {password, ...rest} = data; //data içerisinden passwordu çıkartıp yeni diziye(rest) dizisine yayıp localStorage'ye kayıt et
                localStorage.setItem("user",JSON.stringify(rest)); //localStorageye password eksik şekilde kayıt ediyor.
                message.success("Kayıt başarılı.")
                navigate("/") // yönlendirme kodu
            }else{
                message.error("Kayıt başarısız.")
            }
        } catch (error) {
            console.log("Giriş hatası",error);
        }
    }

    return (
        <div className="account-column">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>
                        <span>Username <span className="required">*</span></span>
                        <input type="text" name="username" onChange={handleInputChanged} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Email address <span className="required">*</span></span>
                        <input type="email" name="email" onChange={handleInputChanged} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Password <span className="required">*</span></span>
                        <input type="password" name="password" onChange={handleInputChanged} />
                    </label>
                </div>
                <div className="privacy-policy-text remember">
                    <p>
                        Your personal data will be used to support your experience throughout this website, to
                        manage access to your account, and for other purposes described in our <a
                            href="#">privacy policy.</a>
                    </p>
                    <button className="btn btn-sm">Register</button>
                </div>

            </form>
        </div>
    )
}

export default Register