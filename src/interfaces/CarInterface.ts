import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const CarSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

export type Car = z.infer<typeof CarSchema> & Vehicle;