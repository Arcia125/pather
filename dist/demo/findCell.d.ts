import { CELLS } from './constants';
export declare const findCell: (cellValue: (typeof CELLS)[keyof typeof CELLS]) => {
    x: number;
    y: number;
};
