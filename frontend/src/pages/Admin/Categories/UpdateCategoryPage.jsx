import { useEffect, useState } from "react"
import { Form, Input, Button, message, Spin } from "antd"
import { useParams } from "react-router-dom";


const UpdateCategoryPage = () => {
    
    const [loading,setLoading] = useState(false);
    const [form] = Form.useForm(); //ant design a özgü tanımlamalar yine. Bu özellik ile formun içini doldurabilir boşaltabiliriz.
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const params = useParams(); //Linkteki id bilgisini almak için useParams() fonksiyonu kullanılıyor.
    const categoryId = params.id; //parametreler içerisindeki id yi al.

    //onFinish özelliği and design daki bu forma ait bir özellik. 
    //useState kullanmaya gerek kalmadan bilgileri bu sayede veriyor.
    //burada values adlı değişkene aktardım.


    //İnputtaki veriler buradan güncellenecek.
    const onFinish = async (values) => {
        setLoading(true); //Spinin çalışması için
        try {
            const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)

            })

            if (response.ok) {
                message.success("Veriler güncellendi.")
            } else {
                message.error("Güncelleme işlemi başarısız.")
            }
        } catch (error) {
            console.log("Ürün güncelleme hatası", error);
        }  finally {
            setLoading(false); //Spin'in iptal olması için
        }
    }

    //Kullanıcıları listeleyen fonksiyon
    const fetchSingleCategory = async () => {
    
        try {
            const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error("Verileri getirme hatası")
            }
            const data = await response.json();

            if (data) {
                //inputların değerini doldurma hook'u setFieldValue() and design'a ait.
                form.setFieldsValue({
                    name: data.name,
                    img: data.img,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Sayfa yüklendiğinde bir kez içerideki fonksiyonu çalıştır. 
    //[] bunun sayesinde bir kez çalışıyor.
    useEffect(() => {
        fetchSingleCategory();
    }, [])

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                name="basic"
                layout='vertical'
                autoComplete="off"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Kategori İsmi"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Kategori adını giriniz.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Kategori Görseli"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message: 'Kategori görsel linkini girin.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Güncelle
                    </Button>
                </Form.Item>
            </Form>
        </Spin>

    )
}

export default UpdateCategoryPage