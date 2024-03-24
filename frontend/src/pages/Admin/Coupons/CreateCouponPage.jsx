import { useState } from "react"
import { Form, Input, Button, message, Spin, InputNumber } from "antd"




const CreateCouponPage = () => {
    
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
            const response = await fetch(`${apiUrl}/api/coupons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)

            })

            if (response.ok) {
                message.success("Kupon oluşturuldu.")
                form.resetFields();
            } else {
                message.error("Kupon oluşturulurken bir hata oluştu.")
            }
        } catch (error) {
            console.log("Kupon oluşturma hatası", error);
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
                    label="Kupon Adı"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Kupon adını giriniz.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Kupon İndirim Oranı"
                    name="discountPercent"
                    rules={[
                        {
                            required: true,
                            message: 'Kupon indirim oranını girin.',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Oluştur
                    </Button>
                </Form.Item>
            </Form>
        </Spin>

    )
}

export default CreateCouponPage