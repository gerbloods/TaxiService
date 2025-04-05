import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getInfoClients, getInfoDrivers } from "./mainQuery";

const Round10 = (num) => {
    const data = Math.round(num * 10) / 10;
    return data
}

const ReviewComponent = ({ reviews }) => {

    const [drivers, setDrivers] = useState([])
    const [clients, setClients] = useState([])

    useEffect(() => {
        getInfoDrivers().then((data) => setDrivers(data[0]));
        getInfoClients().then((data) => setClients(data[0]));
    }, [reviews])
    return (
        <Container className="py-3">
            <h4 className="text-center">Все отзывы</h4>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Card key={index} className="mb-3 p-3 shadow-sm">
                        <Card.Text>
                        <strong>ID:</strong>{" "}
                        {review.id_driver
                            ? drivers
                                .filter((e) => e.id_driver === review.id_driver)
                                .map((e) => `${e.name} ${e.surname}`)
                            : review.id_client
                            ? clients
                                .filter((e) => e.id_client === review.id_client)
                                .map((e) => e.number)
                            : "Неизвестно"}
                        </Card.Text>
                        <Card.Text><strong>Рейтинг:</strong> {Round10(review.rating)}</Card.Text>
                    </Card>
                ))
            ) : (
                <p className="text-center">Нет отзывов</p>
            )}
        </Container>
    );
};

export default ReviewComponent;