/**
 * A presenter is responsible for presenting data to the user.
 */
export abstract class Presenter<T> {
    constructor(readonly elContainer: HTMLElement) { }

    /**
     * Presents the data.
     * @param data - The data to present.
     */
    abstract present(data: T): void;
}