
/**
 * An entity is an object that is not defined by its attributes,
 * but rather by a thread of continuity represented by its identity (id).
 */
export class Entity<K extends string | number> {
    #id: K;

    constructor({ id }: { id: K }) {
        this.#id = id;
    }

    /**
     * The unique identifier of the entity.
     */
    get id(): K { return this.#id; }

    /**
     * Compares two entities for equality.
     * @param other - The other entity to compare.
     * @returns True if the entities are equal, false otherwise.
     */
    equals(other: Entity<K>): boolean {
        return this.id === other.id;
    }
}