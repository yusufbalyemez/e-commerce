import { useState } from "react"

const Register = () => {

    //toplu useState yöntemi
    //inputtaki name kısmıda burada verdiklerimle aynı olmalı ya da buradakiler oradakilerle aynı olmalı
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:""
    });

    //inputtaki verileri toplu almak için
    const handleInputChanged = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData, [name]:value}) //tümünü yerleştir, name bilgisine göre value yi al demekmiş
    }

    console.log(formData);

    return (
        <div className="account-column">
                    <h2>Register</h2>
                    <form>
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