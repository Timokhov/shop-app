export interface DrawerNavigationProps {
    navigation: {
        toggleDrawer: () => any;
        navigate: (path: string) => void;
    }
}