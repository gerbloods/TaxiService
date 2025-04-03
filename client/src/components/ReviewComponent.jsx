import React from "react";
import { Card, Container } from "react-bootstrap";

const ReviewComponent = ({ reviews }) => {
    return (
        <Container className="py-3">
            <h4 className="text-center">Все отзывы</h4>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Card key={index} className="mb-3 p-3 shadow-sm">
                        <Card.Text><strong>ID заказа:</strong> {review.id_order}</Card.Text>
                        <Card.Text><strong>ID:</strong> {review.id_driver || review.id_client}</Card.Text>
                        <Card.Text><strong>Оценка:</strong> {review.rating}</Card.Text>
                    </Card>
                ))
            ) : (
                <p className="text-center">Нет отзывов</p>
            )}
        </Container>
    );
};

export default ReviewComponent;