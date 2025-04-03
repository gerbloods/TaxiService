import { useEffect, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import NavBar from "./NavBarComponent";
import { addClientReviewFunction, addDriverReviewFunction, getBestClient, getBestDriver, getInfoClients, getInfoDrivers } from "./mainQuery";
import ReviewComponent from "./ReviewComponent";

const RatingComponent = () => {

    const [drOrder, setDrOrder] = useState(0);
    const [drId, setDrId] = useState(0);
    const [drMark, setDrMark] = useState(0);
    const [clOrder, setClOrder] = useState(0);
    const [clId, setClId] = useState(0);
    const [clMark, setClMark] = useState(0);
    const [bestDriver, setBestDriver] = useState(null);
    const [bestClient, setBestClient] = useState(null);
    const [drivers, setDrivers] = useState([])
    const [clients, setClients] = useState([])

    const submitDriverRating = (id_order, id_driver, rating) => {
        if(!id_order || !id_driver || !rating) return alert('Поля не заполнены')
        addDriverReviewFunction(id_order, id_driver, rating)
        alert('Отзыв отправлен')
    };

    const submitClientRating = (id_order, id_client, rating) => {
        if(!id_order || !id_client || !rating) return alert('Поля не заполнены')
        addClientReviewFunction(id_order, id_client, rating)
        alert('Отзыв отправлен')
    };

    useEffect(() => {
        getBestDriver().then((data) => setBestDriver(data));
        getBestClient().then((data) => setBestClient(data));
        getInfoDrivers().then((data) => setDrivers(data[0]));
        getInfoClients().then((data) => setClients(data[0]));
    }, [])
    const [showReviews, setShowReviews] = useState(null)

    const handleShowDriverReviews = () => {
        setShowReviews(drivers);
    };

    const handleShowClientReviews = () => {
        setShowReviews(clients);
    };

    return (
        <>
            <NavBar />
            <Container fluid className="bg-body-tertiary min-vh-100">
                <div className="container mt-4">
                    {!showReviews ? (
                        <>
                            <h2>Оставить отзыв</h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <Card className="p-3">
                                        <h4>Отзыв водителю</h4>
                                        <Form.Group>
                                            <Form.Label>ID заказа</Form.Label>
                                            <Form.Control onChange={(e) => setDrOrder(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>ID водителя</Form.Label>
                                            <Form.Control onChange={(e) => setDrId(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Оценка</Form.Label>
                                            <Form.Control min="1" max="5" type="number" onChange={(e) => setDrMark(e.target.value)} required />
                                        </Form.Group>
                                        <Button className="mt-2" onClick={submitDriverRating}>
                                            Отправить
                                        </Button>
                                    </Card>
                                </div>

                                <div className="col-md-6">
                                    <Card className="p-3">
                                        <h4>Отзыв клиенту</h4>
                                        <Form.Group>
                                            <Form.Label>ID заказа</Form.Label>
                                            <Form.Control onChange={(e) => setClOrder(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>ID клиента</Form.Label>
                                            <Form.Control onChange={(e) => setClId(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Оценка</Form.Label>
                                            <Form.Control min="1" max="5" type="number" onChange={(e) => setClMark(e.target.value)} required />
                                        </Form.Group>
                                        <Button className="mt-2" onClick={submitClientRating}>
                                            Отправить
                                        </Button>
                                    </Card>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h2>Лучшие водитель и клиент</h2>
                                <div className="d-flex justify-content-around">
                                    <Card className="p-3">
                                        <h4>Лучший водитель</h4>
                                        <p>
                                            {bestDriver && bestDriver[0] && bestDriver[0][0]
                                                ? `Имя: ${drivers.filter((e) => e.id_driver === bestDriver[0][0].id_driver).map((e) => `${e.name} ${e.surname}`)}, Рейтинг: ${parseFloat(bestDriver[0][0].avg).toFixed(1)}`
                                                : "Загрузка..."}
                                        </p>
                                    </Card>
                                    <Card className="p-3">
                                        <h4>Лучший клиент</h4>
                                        <p>
                                            {bestClient && bestClient[0] && bestClient[0][0]
                                                ? `Номер: ${clients.filter((e) => e.id_client === bestClient[0][0].id_client).map((e) => e.number)}, Рейтинг: ${parseFloat(bestClient[0][0].avg).toFixed(1)}`
                                                : "Загрузка..."}
                                        </p>
                                    </Card>
                                </div>
                            </div>

                            <div className="mt-3">
                                <Button className="me-2" onClick={handleShowDriverReviews}>
                                    Посмотреть все отзывы водителей
                                </Button>
                                <Button onClick={handleShowClientReviews}>Посмотреть все отзывы клиентов</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button variant="secondary" className="mt-5" onClick={() => setShowReviews(null)}>
                                Назад
                            </Button>
                            <ReviewComponent reviews={showReviews} />
                        </>
                    )}
                </div>
            </Container>
        </>
    );
};

export default RatingComponent;