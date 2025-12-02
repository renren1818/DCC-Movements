export interface ISubMenu {
    name: string;
    icon: string;
    badge: boolean;
    route: string;
}

export interface IMenu {
    name: string;
    color: string;
    items: ISubMenu[]
}