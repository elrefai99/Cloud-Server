// UserRepository.ts
import { Model } from 'mongoose';
import { EntityRepository } from '../../../../../Database/entity.repository';
import { toJSON_User } from '../../../../../Common/Interface/User.interface';

export class UserRepository extends EntityRepository<toJSON_User> {
  constructor(model: Model<toJSON_User>) {
    super(model);
  }
}
