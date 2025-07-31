
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateSymptomInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface IQuery {
    symptoms(): Nullable<Nullable<Symptom>[]> | Promise<Nullable<Nullable<Symptom>[]>>;
    symptom(id: string): Nullable<Symptom> | Promise<Nullable<Symptom>>;
}

export interface IMutation {
    createSymtomp(createSymptomInput?: Nullable<CreateSymptomInput>): Nullable<Symptom> | Promise<Nullable<Symptom>>;
}

export interface ISubscription {
    symptomCreated(): Nullable<Symptom> | Promise<Nullable<Symptom>>;
}

export interface Symptom {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

type Nullable<T> = T | null;
