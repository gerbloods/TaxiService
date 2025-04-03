import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBarComponent";
import { getMoneyFunction } from "./mainQuery";

const MainComponent = () => {

    const [money, setMoney] = useState(0);

    useEffect(() => {
        const fetchMoney = async () => {
            try {
                const data = await getMoneyFunction();
                setMoney(Number(data[0][0]?.sum ?? 0));
            } catch (error) {
                console.error("Ошибка при получении денег:", error);
            }
        };
        fetchMoney();
    }, []);

    return (
      <>
      <NavBar />
              <Container fluid className="d-flex vh-100 justify-content-center align-items-center bg-light">
                    <Row>
                    <Col className="text-center">
                        <h1 className="display-4">{Number(money).toLocaleString("ru-RU")} руб. заработано, стремимся вперед!</h1>
                    </Col>
                    </Row>
                </Container>
      </>
    )
}


export default MainComponent;
