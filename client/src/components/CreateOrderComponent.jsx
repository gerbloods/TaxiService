import React, { useState } from "react";
import NavBar from "./NavBarComponent";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { dropOrderFunction, newOrderFunction } from "./mainQuery";

const sendOrder = (client, category, driver, price, from, to) => {
    if (!client ||  !category || !driver || !price || !from || !to) return alert('Что-то не добавлено')
    newOrderFunction(client, category, driver, price, from, to)
    alert("Заказ создан")
}

const dropOrder = (order) => {
    if (!order) alert('айди заказа не заполнено')
    dropOrderFunction(order)
    alert("Заказ удален")
}

const CreateOrderComponent = () => {
    const navigate = useNavigate();

    const [client, setClient] = useState(0);
    const [category, setCategory] = useState([])
    const [driver, setDriver] = useState(0);
    const [price, setPrice] = useState(0);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');


    const [order, setOrder] = useState(0)

    return (
        <>
            <NavBar />
            <Container fluid className="d-flex flex-column align-items-center bg-light py-4 min-vh-100 mt-5">
                <Row className="mb-3 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h4 className="text-center mb-3">Создать заказ</h4>
                        <Form>
                            <Row className="mb-2 align-items-center">
                                <Col><Form.Control type="number" placeholder="Введите айди клиента" onChange={(e) => setClient(e.target.value)} required /></Col>
                                <Col><Form.Control type="number" placeholder="Введите айди категории" onChange={(e) => setCategory(e.target.value)} required /></Col>
                                <Col><Form.Control type="number" placeholder="Введите айди водителя" onChange={(e) => setDriver(e.target.value)} required /></Col>
                                <Col><Form.Control type="number" placeholder="Введите цену поездки" onChange={(e) => setPrice(e.target.value)} required /></Col>
                                <Col><Form.Control type="text" placeholder="Куда отправляемся?" onChange={(e) => setFrom(e.target.value)} required /></Col>
                                <Col><Form.Control type="text" placeholder="Откуда едем?" onChange={(e) => setTo(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="secondary" onClick={() => sendOrder(client, category, driver, price, from, to)} className="w-100">Создать</Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="mb-3 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h4 className="text-center mb-3">Удалить заказ</h4>
                        <Form>
                            <Row className="mb-2 align-items-center">
                                <Col><Form.Control type="number" placeholder="Введите айди заказа" onChange={(e) => setOrder(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="secondary" onClick={() => dropOrder(order)} className="w-100">Удалить</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-3 w-50 d-flex justify-content-between">
                    <Col xs={3} className="d-flex align-items-center">
                        <Button variant="secondary" onClick={() => navigate("/orderinfo")}>
                            Посмотреть заказы
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateOrderComponent;
