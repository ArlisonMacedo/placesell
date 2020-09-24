import {Request, Response} from 'express'
import {getManager} from 'typeorm'
import { Product } from '../entity/Product'



export const ProductStore = async (request: Request, response: Response) => {


    const {name, avatar, description, price, amount, whatsapp} = request.body

    const product = await getManager()
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values({
        name,
        avatar,
        description,
        price,
        amount,
        whatsapp
      })

      .execute()


      return response.json(product)

}

export const ProductIndex = async (request: Request, response: Response) => {


    const {name} = request.query

    if(name) {
      const filterProducts = await getManager()
        .createQueryBuilder()
        .select([
          'product'
        ])
        .from(Product, 'product')
        .where('product.name like :name', {name: `%${name}%`} )
        .getMany()

        return response.json(filterProducts)

        
    }

    const products = await getManager()
      .createQueryBuilder()
      .select([
        'product'
      ])
      .from(Product, 'product')
      .getMany()

      return response.json(products)
}

export const ProductSell = async (request: Request, response: Response) => {

  const {amount} = request.query;
  const {id} = request.params;

  const existAmountProduct = await getManager()
    .createQueryBuilder()
    .select('product')
    .from(Product, 'product')
    .where('amount <= 0')
    .andWhere('id = :id ', {id: id})
    .getOne()

    if(existAmountProduct){
      return response.status(400).json({err: 'There amount this product are empty'})
    }

  

  const countSellProduct = await getManager()
    .createQueryBuilder()
    .update(Product)
    .set({amount : () => `amount - ${amount}`})
    .where("id = :id", {id: id})
    .execute()

    return response.json(countSellProduct);

}