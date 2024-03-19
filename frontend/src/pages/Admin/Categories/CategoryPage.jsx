import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [dataSource, setDataSourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Kategori Görseli',
            dataIndex: 'img',
            key: 'img',
            render: (imgSrc) => (
                <img src={imgSrc} alt="image" style={{
                    width: "100px"
                    /* borderRadius: "50%" */
                }} />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <b>{text}</b>

        },
        {
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                /* Space i kullanmaktaki amaç otomatikmen butonlar arası boşluk bırakıyor. */
                <Space size={"middle"}> 

                    <Button type="primary" onClick={()=>navigate(`/admin/categories/update/${record._id}`)}>Düzenle</Button>

                    <Popconfirm
                        title="Kullanıcıyı Sil"
                        description="Kullanıcıyı silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteCategory(record._id)}
                    >
                        <Button type="primary" danger>Sil</Button>
                    </Popconfirm>
                </Space>

            )
        }

    ];

    useEffect(() => {
        fetchCategories();
    }, []);


    //Kullanıcı Mailine göre kullanıcı silme işlemini yapan fonksiyon
    const deleteCategory = async (categoryId) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                message.success("Kullanıcı Silindi.")
                fetchCategories();
            } else {
                message.error("Silme işlemi başarısız.")
            }
        } catch (error) {
            console.log("Silme İşlemi Hatası:", error)
        } finally {
            setLoading(false);
        }
    }

    //Kullanıcıları listeleyen foksiyon
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/categories`);
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

export default CategoryPage