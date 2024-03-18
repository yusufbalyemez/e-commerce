import {useState} from "react";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const [formData,setFormData] = useState({
        email:"",
        password:"",
    });

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleInputChanged = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value}); //Şu yapıyı iyice kavra
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/api/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formData)
            })

            if(response.ok){
                const data = await response.json();//json formatında al data değişkenine aktar.
                localStorage.setItem("user", JSON.stringify(data));
                message.success("Giriş Başarılı");

                //Eğer kullanıcının rolü adminse
                if(data.role === "admin"){
                    //navigate("/admin") //navigate ile yükleyince react-router-dom özelliğiyle path name'i alamadığı için aşağıdaki yönlendirme yapıldı.
                    window.location.href = "/admin";
                }
                else{
                    navigate("/")
                }
                
            }else{
                message.error("Giriş Başarısız");
            }
        }catch(error) {
            console.log("Giriş hatası:", error);
        }
  
    }

    return (
        <div className="account-column">
        <h2>Login</h2>
        <form onSubmit={handleLogin}> 
            <div>
                <label>
                    <span>Username or email address <span className="required">*</span></span>
                    <input type="text" name="email" onChange={handleInputChanged}/>
                </label>
            </div>
            <div>
                <label>
                    <span>Password <span className="required">*</span></span>
                    <input type="password" name="password" onChange={handleInputChanged}/>
                </label>
            </div>
            <p className="remember">
                <label>
                    <input type="checkbox" />
                    <span>Remember me</span>
                </label>
                <button className="btn btn-sm">Login</button>
            </p>
            <a href="#" className="form-link">Lost your password?</a>
        </form>
    </div>
    )
}

export default Login