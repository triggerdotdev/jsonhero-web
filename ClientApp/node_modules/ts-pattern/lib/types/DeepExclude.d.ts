import { DistributeMatchingUnions } from './DistributeUnions';
export declare type DeepExclude<a, b> = Exclude<DistributeMatchingUnions<a, b>, b>;
