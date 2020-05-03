import { Category } from '../category.enum';

export interface Event1 {
    uid?: string;
    name?: string;
    image?: string; 
    description?: string;
    locationLat?: Number;
    locationLng?: Number;
    location?: string;
    locationName?: string;
    category?: Category;
    startDate?: Date;
    endDate?: Date;
    hostId?: string;
    hostName?: string;
    numMember?: number;
   }
