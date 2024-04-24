import { Entity } from './Entity.mjs';

export abstract class Repository<E extends Entity<any>> {
    abstract get(id: E['id']): Promise<E>;
}