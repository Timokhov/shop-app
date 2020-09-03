import { NavigationActions, NavigationContainerComponent, NavigationNavigateActionPayload } from 'react-navigation';
import { Nullable } from '../../models/nullable';

let navigator: Nullable<NavigationContainerComponent> = null;

export const init = (nav: Nullable<NavigationContainerComponent>) => {
    if (nav) {
        navigator = nav;
    }
};

export const navigate = (options: NavigationNavigateActionPayload) => {
    if (navigator) {
        navigator.dispatch(NavigationActions.navigate(options));
    }
};
