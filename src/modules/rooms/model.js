export type Room = {
    id?: number;
    name: string;
};

export type State = {
    isRefreshing: boolean,
    isLoading: boolean,
    items: [Room],
};