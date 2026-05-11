export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';
export type Transmission = 'manual' | 'automatic';
export type CarStatus = 'active' | 'inactive' | 'rented';

export default interface Car {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: Transmission;
  description?: string;
  pricePerDay: number;
  deposit: number;
  status: CarStatus;
  lat: number;
  lng: number;
  address: string;
  createdAt: Date;
}

export type CarCreateInput = Omit<Car, 'id' | 'createdAt' | 'status'>;
