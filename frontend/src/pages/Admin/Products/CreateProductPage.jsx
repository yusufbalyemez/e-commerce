import { useEffect, useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Input, Button, message, Spin, InputNumber, Select } from "antd"




const CreateProductPage = () => {

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();//bu özellik güzelmiş. Formu kontrol ediyor.
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    //onFinish özelliği and design daki bu forma ait bir özellik. 
    //useState kullanmaya gerek kalmadan bilgileri bu sayede veriyor.
    //burada values adlı değişkene aktardım.


    //İnputtaki veriler buradan güncellenecek.
    const onFinish = async (values) => {

        /* textarea'lara alt alta bilgiler girileceği için biçimlendirme işlemleri yapıldı. */
        // \n e göre bölündü, eğer boşluklar varsa siler.
        const imgLinks = values.img
            .split("\n")
            .map((link) => link.trim());

        const colors = values.colors
            .split("\n")
            .map((link) => link.trim());

        const sizes = values.sizes
            .split("\n")
            .map((link) => link.trim());


        setLoading(true); //Spinin çalışması için
        try {
            const response = await fetch(`${apiUrl}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                /* price'ın veritabanındaki model yapısı farklı olduğu için bu şekilde göndermek gerekiyormuş */
                body: JSON.stringify({
                    ...values,
                    price: {
                        current: values.current,
                        discount: values.discount
                    },
                    colors,
                    sizes,
                    img: imgLinks,
                })

            })

            if (response.ok) {
                message.success("Ürün oluşturuldu.")
                form.resetFields();
            } else {
                message.error("Ürün oluşturulurken bir hata oluştu.")
            }
        } catch (error) {
            console.log("Ürün oluşturma hatası", error);
        } finally {
            setLoading(false); //Spin'in iptal olması için
        }
    }

    //Kategorileri listeleyen fonksiyon
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/categories`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data)
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    /* Sayfa yüklendiğinde bir kez veritabanındaki kategorileri çeken fonksiyonu tetikler. */
    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                name="basic"
                layout='vertical'
                onFinish={onFinish} //Bu özellik ant design formunun özelliği. Veriler içindeki bilgileri gönderiyor.
            >
                {/* Ürün Adı */}
                <Form.Item
                    label="Ürün Adı"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Ürün adını giriniz.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Ürün Kategorisi */}
                <Form.Item
                    label="Ürün Kategorisi"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen en az 1 kategori seçin!',
                        },
                    ]}
                >
                    <Select>
                        {categories.map((category) => (
                            <Select.Option value={category._id} key={category._id}>
                                {category.name} {/* Burada category'nin adını gösteriyoruz */}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* İndirim Oranı */}
                <Form.Item
                    label="İndirim Oranı"
                    name="discount"
                >
                    <InputNumber />
                </Form.Item>

                {/* Açıklama */}
                <Form.Item
                    label="Ürün Açıklaması"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen bir ürün açıklaması girin.',
                        },
                    ]}
                >
                    <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
                </Form.Item>

                {/* Fiyat */}
                <Form.Item
                    label="Fiyat"
                    name="current"
                    rules={[
                        {
                            required: true,
                            message: 'Ürün fiyatını girin.',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                 {/* Ürün Görselleri */}   
                <Form.Item
                    label="Ürün Görselleri(Linkler)"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen en az 4 ürün görsel linki girin.',
                        },
                    ]}
                >
                    <Input.TextArea
                        autoSize={{ minRows: 4 }}
                        placeholder="Her bir görsel linkini yeni bir satıra yazın."
                    />
                </Form.Item>

                {/* Ürün Renkleri */}
                <Form.Item
                    label="Ürün Renkleri (RGB Kodları)"
                    name="colors"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen en az 1 ürün rengi girin!',
                        },
                    ]}
                >
                    <Input.TextArea
                        autoSize={{ minRows: 4 }}
                        placeholder="Her bir rgb kodunu ayrı bir satıra yazın."
                    />
                </Form.Item>

                {/* Ürün Bedenleri */}    
                <Form.Item
                    label="Ürün Bedenleri"
                    name="sizes"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen en az 1 ürün bedeni girin!',
                        },
                    ]}
                >
                    <Input.TextArea
                        autoSize={{ minRows: 4 }}
                        placeholder="Her bir beden ölçüsünü ayrı bir satıra yazın."
                    />
                </Form.Item>

                {/* Oluştur Butonu */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Oluştur
                    </Button>
                </Form.Item>
            </Form>
        </Spin>

    )
}

export default CreateProductPage