import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getInfoCategories, getInfoClients, getInfoDrivers, getInfoOrders } from "./mainQuery";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBarComponent";

const OrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const [category, setCategory] = useState([])
    const [drivers, setDrivers] = useState([])
    const [clients, setClients] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getInfoOrders().then((data) => setOrders(data[0]));
        getInfoCategories().then((data) => setCategory(data[0]))
        getInfoDrivers().then((data) => setDrivers(data[0]))
        getInfoClients().then((data) => setClients(data[0]))
    }, []);

    return (
        <>
        <NavBar />
        <Container fluid className="bg-light py-4">
        <Button variant="secondary" className="mt-5" onClick={() => navigate("/orders")}>Вернуться</Button>
            <h2 className="text-center mb-4">Список заказов</h2>
            <Row className="justify-content-center">
                {orders.map((order) => (
                    <Col md={4} key={order.id_order} className="mb-4">
                        <Card className="shadow-sm rounded" onClick={() => navigate(`/orderinfo/${order.id_order}`)} style={{ cursor: "pointer" }}>
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
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    );
};

export default OrderComponent;
