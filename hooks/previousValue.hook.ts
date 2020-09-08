import { useEffect, useRef } from "react";
import { Nullable } from '../models/nullable';

export const usePreviousValue = <T>(value: T): Nullable<T> => {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
};
