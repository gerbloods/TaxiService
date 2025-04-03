import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getInfoOrder } from "./mainQuery";
import NavBar from "./NavBarComponent";

const SelectOrderComponent = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    console.log(id, 'ff')
    useEffect(() => {
        getInfoOrder(Number(id)).then((data) => setOrder(data[0]));
    }, [id]);

    if (!order) return <p className="text-center">Загрузка...</p>;

    return (
        <>
        <NavBar />
        <Container className="py-4 mt-5">
            <Button variant="secondary" onClick={() => navigate("/orderinfo")}>Назад</Button>
            <Card className="shadow-sm rounded mt-3">
                <Card.Body>
                    <Card.Title className="text-center mb-3">
                        Заказ #{order.id_order}
                    </Card.Title>
                    <Card.Text><strong>Клиент:</strong> {order.id_client}</Card.Text>
                    <Card.Text><strong>Категория:</strong> {order.id_category}</Card.Text>
                    <Card.Text><strong>Водитель:</strong> {order.id_driver}</Card.Text>
                    <Card.Text><strong>Цена:</strong> {order.price} ₽</Card.Text>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default SelectOrderComponent;
