import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Product Görseli',
            dataIndex: 'img',
            key: 'img',
            render: (imgSrc) => (
                <img src={imgSrc[0]} alt="image" style={{
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
            title: 'Kategori',
            dataIndex: 'categoryName',
            key: 'categoryName',
            render: (text) => <span>{text}</span>

        },
        {
            title: 'Fiyat',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text.current.toFixed(2)}</span>//price bir liste ve içinde farklı değer olduğu için böyle yapıldı.
            //toFixed fonksiyonu ise 2 tane 00 göstermesi için
        },
        {
            title: 'İndirim',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>%{text.discount}</span>//price bir liste ve içinde farklı değer olduğu için böyle yapıldı.
            //toFixed fonksiyonu ise 2 tane 00 göstermesi için
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

                    <Button type="primary" onClick={()=>navigate(`/admin/products/update/${record._id}`)}>Düzenle</Button>

                    <Popconfirm
                        title="Kategoriyi Sil"
                        description="Kategoriyi silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteProduct(record._id)}
                    >
                        <Button type="primary" danger>Sil</Button>
                    </Popconfirm>

                </Space>

            )
        }

    ];

    useEffect(() => {
        fetchData();
    }, []);


    //Kullanıcı Mailine göre kullanıcı silme işlemini yapan fonksiyon
    const deleteProduct = async (productId) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/products/${productId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                message.success("Kullanıcı Silindi.")
                //fetchCategories();

                //Yeniden istek atma yerine bu şekilde UI'yi güncelleme işlemi yapıldı.
                setDataSource((prevProducts)=>{
                    return prevProducts.filter((product)=> product._id !== productId)
                })
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
    const fetchData = async () => {
        setLoading(true);
        try {
            //Birden fazla fetch işlemi yapılacaksa bu yöntem kullanılıyor. Promise.all()
            const[categoriesResponse,productsResponse] = await Promise.all([
                fetch(`${apiUrl}/api/categories`),
                fetch(`${apiUrl}/api/products`)
            ]);

            if(!categoriesResponse.ok || !productsResponse.ok){
                message.error("Veri getirme başarısız.");
            }

            //Veriler getirildiyse
            const [categoriesData,productsData] = await Promise.all([
                categoriesResponse.json(),
                productsResponse.json(),
            ]);

            const productsWithCategories = productsData.map((product)=>{
                const categoryId = product.category;
                const category = categoriesData.find(
                    (item)=> item._id === categoryId
                );

                return {
                    ...product,
                    categoryName: category ? category.name : "",
                };
            });

            setDataSource(productsWithCategories);

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

export default ProductPage