import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;
    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));
    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.items_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct('points.*');

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const point = await knex('points').where('id', id).first();
    if (!point) {
      return response.status(400).json({ msg: 'Point not found' });
    }

    const item = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.items_id')
      .where('point_items.point_id', id)
      .select('items.title');
    return response.status(200).json({ point, item });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIDs = await trx('points').insert(point);

    const pointID = insertedIDs[0];

    const pivotPointItems = items.map((itemsID: number) => {
      return { items_id: itemsID, point_id: pointID };
    });

    await trx('point_items').insert(pivotPointItems);

    await trx.commit();

    return response.json({ id: pointID, ...point });
  }
}

export default PointsController;
