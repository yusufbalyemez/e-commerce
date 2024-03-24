import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Kupon Kodu',
            dataIndex: 'code',
            key: 'code',
            render: (code) => <b>{code}</b>
            
        },
        {
            title: 'İndirim Oranı',
            dataIndex: 'discountPercent',
            key: 'discountPercent',
            render: (text) => <span>%{text}</span>

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

                    <Button type="primary" onClick={()=>navigate(`/admin/coupons/update/${record._id}`)}>Düzenle</Button>

                    <Popconfirm
                        title="Kuponu Sil"
                        description="Kuponu silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteCoupon(record._id)}
                    >
                        <Button type="primary" danger>Sil</Button>
                    </Popconfirm>
                </Space>

            )
        }

    ];

    useEffect(() => {
        fetchCoupons();
    }, []);


    //Kupon Id'sine göre kullanıcı silme işlemini yapan fonksiyon
    const deleteCoupon = async (couponId) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                message.success("Kupon Silindi.")
                fetchCoupons();
            } else {
                message.error("Silme işlemi başarısız.")
            }
        } catch (error) {
            console.log("Silme İşlemi Hatası:", error)
        } finally {
            setLoading(false);
        }
    }

    //Kuponları listeleyen fonksiyon
    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/coupons`);
            if (response.ok) {
                const data = await response.json();
                setDataSource(data)
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

export default CouponPage