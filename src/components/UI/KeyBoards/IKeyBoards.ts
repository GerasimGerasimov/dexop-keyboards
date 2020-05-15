export interface IEventFunction {
    (event: any): void;
}

export interface IKeyBoardProps {
    onClick: IEventFunction;
}