export enum FormActionType {
    FORM_UPDATE = 'FORM_UPDATE'
}

export interface FormAction {
    type: FormActionType
}

export interface FormUpdateAction extends FormAction {
    controlId: string,
    value: string,
    isValid: boolean
}

export const formUpdate = (controlId: string, value: string, isValid: boolean): FormUpdateAction => {
    return {
        type: FormActionType.FORM_UPDATE,
        controlId: controlId,
        value: value,
        isValid: isValid
    };
};

export interface FormControl {
    value: string,
    isValid: boolean
}

export interface FormState {
    controls: {[index: string]: FormControl}
    isValid: boolean
}

const onFormUpdate = (state: FormState, action: FormUpdateAction): FormState => {
    const updatedControls: {[index: string]: FormControl} = { ...state.controls };
    updatedControls[action.controlId] = { value: action.value, isValid: action.isValid };
    const formIsValid: boolean = Object.keys(updatedControls)
        .every(controlId => updatedControls[controlId].isValid);
    return {
        controls: updatedControls,
        isValid: formIsValid
    };
};

export const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case FormActionType.FORM_UPDATE:
            return onFormUpdate(state, action as FormUpdateAction);
        default:
            return state;
    }
};
