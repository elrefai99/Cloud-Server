// entity.repository.ts
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) { }

  async checkEmailAndPassword(entityFilterQuery: FilterQuery<T>, _projection?: Record<string, unknown>): Promise<T | null> {
    return this.entityModel.findOne(entityFilterQuery, {
      email: 1,
      password: 1
    }).exec();
  }

  async findById(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T | null> {
    return this.entityModel.findById(entityFilterQuery, {
      __v: 0,
      ...projection
    }).exec();
  }

  async findOne(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T | null> {
    return this.entityModel.findOne(entityFilterQuery, {
      __v: 0,
      ...projection
    }).exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[]> {
    return this.entityModel.find(entityFilterQuery).exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true
      }
    ).exec();
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery).exec();
    return deleteResult.deletedCount >= 1;
  }

  async countDocument(entityFilterQuery: FilterQuery<T>): Promise<number> {
    return this.entityModel.countDocuments(entityFilterQuery).exec();
  }
}
