import DataState from '../enum/data-status.enum';

export default interface AppState<T> {
    dataStatus: DataState;
    appData?: T;
    error?: string;
}
