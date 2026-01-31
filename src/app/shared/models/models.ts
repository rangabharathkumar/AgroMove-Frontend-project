export interface User {
    id: number;
    username: string;
    email: string;
    role: 'MANAGER' | 'USER';
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
}

export interface Shipment {
    id: number;
    origin: string;
    destination: string;
    status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED';
    weight: number;
    produceType: string;
    estimatedDelivery: string;
    description?: string;
    actualDelivery?: string;
    createdAt?: string;
}

export interface Inventory {
    id: number;
    warehouseLocation: string;
    produceType: string;
    quantity: number;
    unit: string;
    lastUpdated?: string;
}

export interface Delivery {
    id: number;
    shipmentId: number;
    scheduledDate: string;
    deliveryStatus: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    carrierName?: string;
    trackingNumber?: string;
    deliveryNotes?: string;
}

export interface Produce {
    id: number;
    produceType: string;
    category: 'FRUIT' | 'VEGETABLE' | 'GRAIN' | 'OTHER';
    unit: string;
    description?: string;
}
