import axios from 'axios';
import { serverPort } from '../const';

const $host = axios.create({
	baseURL: serverPort
})

export const getMoneyFunction = async () => {
    const {data} = await $host.get('/orders/getmoney')
    return data
}

export const getInfoOrders = async () => {
    const {data} = await $host.get('/orders/inforders')
    return data
}
export const getInfoCategories = async () => {
    const {data} = await $host.get('/category/getcategory')
    return data
}

export const getInfoDrivers = async () => {
    const {data} = await $host.get('/drivers/infodrivers')
    return data
}

export const getInfoClients = async () => {
    const {data} = await $host.get('/clients/infoclients')
    return data
}

export const getInfoOrder = async (id_order) => {
    const {data} = await $host.post('/orders/inforder', {id_order})
    return data
}

export const getInfoDistrict = async (id_district) => {
    const {data} = await $host.post('/districts/getdistrict', {id_district})
    return data
}

export const getBestDriver = async () => {
    const {data} = await $host.get('/ratingDrivers/bestdriver')
    return data
}

export const getBestClient = async () => {
    const {data} = await $host.get('/ratingClients/bestclient')
    return data
}

export const newOrderFunction = async (id_client, id_category, id_driver, price, from_to, to_from) => {
    const {data} = await $host.post('/orders/neworder', {id_client, id_category, id_driver, price, from_to, to_from})
    return data
}

export const addDriverFunction = async (id_car, id_district, name, surname) => {
    const {data} = await $host.post('/drivers/newdriver', {id_car, id_district, name, surname})
    return data
}

export const addCarFunction = async (id_brand, model, car_num) => {
    const {data} = await $host.post('/cars/addcar', {id_brand, model, car_num})
    return data
}

export const addClientFunction = async (number) => {
    const {data} = await $host.post('/clients/addclient', {number})
    return data
}

export const addBrandFunction = async (name) => {
    const {data} = await $host.post('/brands/addBrand', {name})
    return data
}

export const addDistrictFunction  = async (name) => {
    const {data} = await $host.post('/districts/addistrict', {name})
    return data
}

export const addClientReviewFunction = async (id_order, id_client, rating) => {
    const {data} = await $host.post('/ratingClients/addReview', {id_order, id_client, rating})
    return data
}

export const addDriverReviewFunction = async (id_order, id_driver, rating) => {
    const {data} = await $host.post('/ratingDrivers/addReview', {id_order, id_driver, rating})
    return data
}

export const delDriverFunction = async (id_driver) => {
    const {data} = await $host.post('/drivers/deldriver', {id_driver})
    return data
}

export const dropOrderFunction = async (id_order) => {
    const {data} = await $host.post('/orders/delorder', {id_order})
    return data
}

export const delCarFunction = async (id_car) => {
    const {data} = await $host.post('/cars/delcar', {id_car})
    return data
}

export const delBrandFunction = async (id_brand) => {
    const {data} = await $host.post('/brands/delbrand', {id_brand})
    return data
}

export const delDistrictFunction = async (id_district) => {
    const {data} = await $host.post('/districts/deldistrict', {id_district})
    return data
}