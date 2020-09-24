import {Router} from 'express'
import { ProductStore, ProductIndex, ProductSell } from './controllers/ProductController'

const routes = Router()

routes.post('/products', ProductStore)
routes.get('/products', ProductIndex)
routes.put('/products/:id', ProductSell)


export default routes