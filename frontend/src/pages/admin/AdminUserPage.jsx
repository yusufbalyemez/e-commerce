import { useEffect, useState } from "react";
import { Button, Popconfirm, Table, message } from "antd";

const AdminUserPage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [dataSource, setDataSourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (imgSrc) => (
                <img src={imgSrc} alt="Avatar" style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%"
                }} />
            )
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            key: 'actions',
            render: (_,record) => (
                <Popconfirm
                    title="Kullanıcıyı Sil"
                    description="Kullanıcıyı silmek istediğinizden emin misiniz?"
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={()=> deleteUser(record.email)}
                >
                    <Button type="primary" danger>Sil</Button>
                </Popconfirm>
                

            )
        }

    ];

    useEffect(() => {
        fetchUsers();
    }, []);


    //Kullanıcı Mailine göre kullanıcı silme işlemini yapan fonksiyon
    const deleteUser = async (userEmail)=>{
        setLoading(true);
        try{
            const response = await fetch(`${apiUrl}/api/users/${userEmail}`,{
                method: "DELETE",
            });
            if(response.ok){
                message.success("Kullanıcı Silindi.")
                fetchUsers();
            }else{
                message.error("Silme işlemi başarısız.")
            }
        }catch(error){
            console.log("Silme İşlemi Hatası:",error)
        }finally{
            setLoading(false);
        }
    }

    //Kullanıcıları listeleyen foksiyon
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/users`);
            if (response.ok) {
                const data = await response.json();
                setDataSourse(data)
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record._id}
            loading={loading}
        />
    )
}

export default AdminUserPage