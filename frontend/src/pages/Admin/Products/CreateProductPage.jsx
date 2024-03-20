import { useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Input, Button, message, Spin, InputNumber, Select } from "antd"




const CreateProductPage = () => {
    
    const [loading,setLoading] = useState(false);
    const [form] = Form.useForm();//bu özellik güzelmiş. Formu kontrol ediyor.
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    //onFinish özelliği and design daki bu forma ait bir özellik. 
    //useState kullanmaya gerek kalmadan bilgileri bu sayede veriyor.
    //burada values adlı değişkene aktardım.


    //İnputtaki veriler buradan güncellenecek.
    const onFinish = async (values) => {
        setLoading(true); //Spinin çalışması için
        try {
            const response = await fetch(`${apiUrl}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)

            })

            if (response.ok) {
                message.success("Kategori oluşturuldu.")
                form.resetFields();
            } else {
                message.error("Kategori oluşturulurken bir hata oluştu.")
            }
        } catch (error) {
            console.log("Kategori oluşturma hatası", error);
        }  finally {
            setLoading(false); //Spin'in iptal olması için
        }
    }


    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                name="basic"
                layout='vertical'
                onFinish={onFinish} //Bu özellik ant design formunun özelliği. Veriler içindeki bilgileri gönderiyor.
            >
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
                {/* İndirim Oranı */}   
                <Form.Item
                    label="İndirim Oranı"
                    name="discount"
                >
                    <InputNumber/>
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
                    <ReactQuill theme="snow" style={{backgroundColor:"white"}}/>
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
                    autoSize={{minRows:4}}
                    placeholder="Her bir görsel linkini yeni bir satıra yazın."
                    />
                </Form.Item>

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
                    autoSize={{minRows:4}}
                    placeholder="Her bir rgb kodunu ayrı bir satıra yazın."
                    />
                </Form.Item>

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
                    autoSize={{minRows:4}}
                    placeholder="Her bir beden ölçüsünü ayrı bir satıra yazın."
                    />
                </Form.Item>


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
                        <Select.Option value="Smartphone" key={"Smartphone"} >Smart Phone</Select.Option>
                        <Select.Option>Computer</Select.Option>
                    </Select>
                </Form.Item>

                 

                
                {/* <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Oluştur
                    </Button>
                </Form.Item> */}
            </Form>
        </Spin>

    )
}

export default CreateProductPage