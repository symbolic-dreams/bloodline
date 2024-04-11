export abstract class Presenter<T> {
    constructor(readonly elContainer: HTMLElement) { }

    abstract present(data: T): void;
}