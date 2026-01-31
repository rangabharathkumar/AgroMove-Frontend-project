# AgroMove Frontend

Modern Angular 16 frontend for the AgroMove Farm Produce Logistics System.

## 🌾 Features

- **JWT Authentication** with role-based access control
- **Dashboard** with real-time statistics and charts
- **Shipment Management** - Create, track, and update shipments
- **Inventory Management** - Monitor stock levels with alerts
- **Delivery Scheduling** - Schedule and track deliveries
- **Produce Catalog** - Manage farm produce types
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Clean UI** - Farmer-friendly interface with visual indicators

## 🛠️ Tech Stack

- **Angular 16** - Frontend framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **RxJS** - Reactive state management
- **Angular Material** - UI components (optional enhancement)

## 📋 Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

### Development

```bash
# Run development server
npm run start

# Build for production
npm run build

# Build and watch for changes
npm run watch
```

## 🎨 Color Theme

The application uses a farm/agriculture-inspired color palette:

- **Primary:** `#2E7D32` (Forest Green)
- **Secondary:** `#558B2F` (Light Green)
- **Background:** `#F9FBE7` (Light Cream)
- **Accent:** `#FF8F00` (Amber)
- **Success:** `#388E3C` (Green)
- **Error:** `#D32F2F` (Red)

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                 # Core services and guards
│   │   ├── guards/           # Auth guard
│   │   ├── interceptors/     # JWT interceptor
│   │   └── services/         # API services
│   ├── shared/               # Shared components and models
│   │   ├── components/       # Reusable UI components
│   │   └── models/           # TypeScript interfaces
│   ├── features/             # Feature modules
│   │   ├── auth/             # Login/authentication
│   │   ├── dashboard/        # Dashboard
│   │   ├── shipments/        # Shipment management
│   │   ├── inventory/        # Inventory management
│   │   ├── deliveries/       # Delivery scheduling
│   │   └── produce/          # Produce catalog
│   └── environments/         # Environment configurations
```

## 🔑 Demo Credentials

- **Manager:** 
  - Username: `manager`
  - Password: `password123`

- **User:**
  - Username: `user`
  - Password: `password123`

## 🌐 API Configuration

The API URL is configured in environment files:
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

Current API: `https://agromove-farm-produce-logistics-api.onrender.com/api/api`

## 📦 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically detect Angular and deploy
4. No additional configuration needed (vercel.json is included)

### Manual Build

```bash
# Build for production
npm run build

# Output will be in dist/agro-move
```

## 🧩 Key Features Breakdown

### Authentication
- JWT token-based authentication
- Automatic token refresh via HTTP interceptor
- Protected routes with AuthGuard
- Role-based access control (MANAGER/USER)

### Dashboard
- Summary statistics cards
- Recent shipments table
- Low stock alerts
- Real-time data updates

### Shipment Management
- View all shipments with filters
- Create new shipments
- Update shipment status
- Search by origin, destination, produce

### Inventory Management
- Color-coded stock levels (Good/Low/Critical)
- Update stock quantities
- Low stock alerts
- Location-based filtering

### Delivery Scheduling
- Schedule deliveries for shipments
- Track delivery status
- Assign drivers and vehicles
- Mark deliveries as completed

### Produce Catalog
- Browse farm produce by category
- Add new produce types
- Category icons (Fruit, Vegetable, Grain, Other)

## 🎯 Best Practices

- **Reactive Programming** - Uses RxJS Observables for all API calls
- **Type Safety** - Full TypeScript type coverage
- **Error Handling** - Graceful error handling with user feedback
- **Loading States** - Loading spinners for better UX
- **Responsive Design** - Mobile-first approach
- **Clean Code** - Organized folder structure and naming conventions

## 📝 Notes

- This is a college project demonstrating full-stack development
- No separate test/production environments (same API endpoint)
- No testing code included as per project requirements
- Focus on clean, functional implementation

## 🤝 Contributing

This is an educational project. Feel free to fork and experiment!

## 📄 License

MIT License - See LICENSE file for details
