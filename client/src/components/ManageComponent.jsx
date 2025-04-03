import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavBar from "./NavBarComponent";
import { addBrandFunction, addCarFunction, addClientFunction, addDistrictFunction, addDriverFunction, delBrandFunction, delCarFunction, delDistrictFunction, delDriverFunction } from "./mainQuery";

const ManageComponent = () => {
    // Состояния для каждой формы
    const [driverIdCar, setDriverIdCar] = useState(0);
    const [driverIdDistrict, setDriverIdDistrict] = useState(0);
    const [driverName, setDriverName] = useState('');
    const [driverSurname, setDriverSurname] = useState('');

    const [carIdBrand, setCarIdBrand] = useState(0);
    const [carModel, setCarModel] = useState('');
    const [carNum, setCarNum] = useState('');

    const [clientNumber, setClientNumber] = useState('');

    const [brandName, setBrandName] = useState('');

    const [districtName, setDistrictName] = useState('');

    const [deleteDriverId, setDeleteDriverId] = useState(0);
    const [deleteCarId, setDeleteCarId] = useState(0);
    const [deleteBrandId, setDeleteBrandId] = useState(0);
    const [deleteDistrictId, setDeleteDistrictId] = useState(0);

    const handleAddDriver = (driverIdCar, driverIdDistrict, driverName, driverSurname) => {
        if(!driverIdCar || !driverIdDistrict || !driverName || !driverSurname) {
            return alert('Поле не заполнено')
        }
        addDriverFunction(driverIdCar, driverIdDistrict, driverName, driverSurname)
        alert("Водитель добавлен")
    };

    const handleDeleteDriver = (deleteDriverId) => {
        if (!deleteDriverId) return alert('Поле не заполнено')
        delDriverFunction(deleteDriverId)
        alert('Водитель удален')
    };

    const handleAddCar = (id_brand, model, car_num) => {
        if(!id_brand || !model || !car_num) return alert('Поле не заполнено')
        addCarFunction(id_brand, model, car_num)
        alert('Автомобиль добавлен')
    };

    const handleDeleteCar = (id_car) => {
        if(!id_car) return alert("Поля не заполнены")
        delCarFunction(id_car)
        alert('Автомобиль удален')
    };

    const handleAddClient = (number) => {
        if(!number) return alert('Поле не заполнено')
        addClientFunction(number)
        alert("Клиент добавлен")
    };

    const handleAddBrand = (name) => {
        if(!name) return alert('Поле не заполнено')
        addBrandFunction(name)
        alert("Марка добавлена")
    };

    const handleDeleteBrand = (id_brand) => {
        if(!id_brand) return alert('Поле не заполнено')
        delBrandFunction(id_brand)
        alert('Марка удалена')
    };

    const handleAddDistrict = (name) => {
        if(!name) return alert('Поле не заполнено')
        addDistrictFunction(name)
        alert('Район добавлен')
    };

    const handleDeleteDistrict = (id_district) => {
        if(!id_district) return alert("Поле не заполнено")
        delDistrictFunction(id_district)
        alert("Район удален")
    };

    return (
        <>
            <NavBar />
            <Container fluid className="d-flex flex-column align-items-center bg-light py-4 min-vh-100 mt-5">
                <h4 className="text-center mb-4">Управление элементами</h4>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Добавить водителя</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="number" placeholder="ID автомобиля" onChange={(e) => setDriverIdCar(e.target.value)} required /></Col>
                                <Col><Form.Control type="number" placeholder="ID района" onChange={(e) => setDriverIdDistrict(e.target.value)} required /></Col>
                                <Col><Form.Control type="text" placeholder="Имя водителя" onChange={(e) => setDriverName(e.target.value)} required /></Col>
                                <Col><Form.Control type="text" placeholder="Фамилия водителя" onChange={(e) => setDriverSurname(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="secondary" onClick={() => handleAddDriver(driverIdCar, driverIdDistrict, driverName, driverSurname)} className="w-100">Добавить водителя</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Удалить водителя</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="number" placeholder="ID водителя" onChange={(e) => setDeleteDriverId(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="danger" onClick={() => handleDeleteDriver(deleteDriverId)} className="w-100">Удалить водителя</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Добавить автомобиль</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="number" placeholder="ID марки" onChange={(e) => setCarIdBrand(e.target.value)} required /></Col>
                                <Col><Form.Control type="text" placeholder="Модель автомобиля" onChange={(e) => setCarModel(e.target.value)} required /></Col>
                                <Col><Form.Control type="text" placeholder="Номер автомобиля" onChange={(e) => setCarNum(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="secondary" onClick={() => handleAddCar(carIdBrand, carModel, carNum)} className="w-100">Добавить автомобиль</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Удалить автомобиль</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="number" placeholder="ID автомобиля" onChange={(e) => setDeleteCarId(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="danger" onClick={() => handleDeleteCar(deleteCarId)} className="w-100">Удалить автомобиль</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Добавить клиента</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="text" placeholder="Номер клиента" onChange={(e) => setClientNumber(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="secondary" onClick={() => handleAddClient(clientNumber)} className="w-100">Добавить клиента</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Добавить марку</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="text" placeholder="Название марки" onChange={(e) => setBrandName(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="secondary" onClick={() => handleAddBrand(brandName)} className="w-100">Добавить марку</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Удалить марку</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="number" placeholder="ID марки" onChange={(e) => setDeleteBrandId(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="danger" onClick={() => handleDeleteBrand(deleteBrandId)} className="w-100">Удалить марку</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Добавить район</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="text" placeholder="Название района" onChange={(e) => setDistrictName(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="secondary" onClick={() => handleAddDistrict(districtName)} className="w-100">Добавить район</Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="mb-4 w-75">
                    <Col className="p-4 bg-white rounded shadow">
                        <h5 className="text-center mb-3">Удалить район</h5>
                        <Form>
                            <Row className="mb-2">
                                <Col><Form.Control type="number" placeholder="ID района" onChange={(e) => setDeleteDistrictId(e.target.value)} required /></Col>
                            </Row>
                            <Button variant="danger" onClick={() => handleDeleteDistrict(deleteDistrictId)} className="w-100">Удалить район</Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default ManageComponent;
