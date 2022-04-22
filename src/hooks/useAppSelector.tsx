/* eslint-disable import/prefer-default-export */
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useAppSelector };
