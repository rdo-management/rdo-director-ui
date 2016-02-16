import { Schema } from 'normalizr';

export const planSchema = new Schema('plan', { idAttribute: 'name' });
