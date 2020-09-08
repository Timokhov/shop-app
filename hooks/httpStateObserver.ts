import { useEffect } from 'react';
import { HttpState } from '../models/http-state';
import { Nullable } from '../models/nullable';
import { usePreviousValue } from './previousValue.hook';

export const useHttpStateObserver = (
    httpState: HttpState,
    onStart?: () => void,
    onSuccess?: () => void,
    onError?: (error: string) => void ) =>
{
    const prevHttpState: Nullable<HttpState> = usePreviousValue(httpState);

    useEffect(() => {
        if (!prevHttpState?.requestInProgress && httpState.requestInProgress) {
            onStart && onStart();
        }

        if (prevHttpState?.requestInProgress && !httpState.requestInProgress) {
            if (httpState.error) {
                onError && onError(httpState.error);
            } else {
                onSuccess && onSuccess();
            }
        }
    }, [httpState]);
};
