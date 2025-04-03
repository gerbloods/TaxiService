import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getInfoCategories, getInfoClients, getInfoDrivers, getInfoOrder } from "./mainQuery";
import NavBar from "./NavBarComponent";

const SelectOrderComponent = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [category, setCategory] = useState([])
    const [drivers, setDrivers] = useState([])
    const [clients, setClients] = useState([])
    const navigate = useNavigate();

    console.log(id, 'ff')
    useEffect(() => {
        getInfoOrder(Number(id)).then((data) => setOrder(data[0]));
        getInfoCategories().then((data) => setCategory(data[0]))
        getInfoDrivers().then((data) => setDrivers(data[0]))
        getInfoClients().then((data) => setClients(data[0]))
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
                    <Card.Text><strong>Клиент:</strong> {clients.filter((e) => e.id_client === order.id_client).map((e) => e.number)}</Card.Text>
                    <Card.Text><strong>Категория:</strong> {category.filter((e) => e.id_category === order.id_category).map((e) => e.name)}</Card.Text>
                    <Card.Text><strong>Водитель:</strong> {drivers.filter((e) => e.id_driver === order.id_driver).map((e) => `${e.name} ${e.surname}`)}</Card.Text>
                    <Card.Text><strong>Цена:</strong> {order.price} ₽</Card.Text>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default SelectOrderComponent;
