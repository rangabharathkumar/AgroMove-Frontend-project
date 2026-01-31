# Frontend Developer Guide: AgroMove API

This guide provides everything you need to know to integrate the AgroMove Farm Produce Logistics API into a frontend application.

---

## 1. Authentication Flow

The API uses **JWT (JSON Web Tokens)** for security.

### Base URL
- **Local**: `http://localhost:8080`
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **JSON Docs**: `http://localhost:8080/v3/api-docs`

### Authentication Endpoints

#### User Registration (Signup)
- **Endpoint**: `POST /api/auth/signup`
- **Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "fullName": "John Doe",
  "phoneNumber": "1234567890"
}
```
> [!NOTE]
> By default, new users get the `USER` role. To create a `MANAGER`, include `"roles": ["MANAGER"]` (if enabled/permitted).

#### User Login
- **Endpoint**: `POST /api/auth/login`
- **Body**:
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```
- **Success Response**: Retrieves a `token`. Store this token (e.g., in `localStorage`).

---

## 2. Authorization (Roles)

- **MANAGER**: Full system access. Can see **all** shipments and **all** inventory. Accesses `/api/admin/**`.
- **USER**: Limited access. Can only see shipments they **created** and inventory they **own**.

> [!IMPORTANT]
> Include the token in the `Authorization` header for **all** logistics requests:
> `Authorization: Bearer <your_jwt_token>`

---

## 3. Core API Modules

### Shipment Management (`/api/shipments`)
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/shipments` | Create a new shipment request | `USER` or `MANAGER` |
| `GET` | `/api/shipments` | List shipments (filtered for users) | `USER` or `MANAGER` |
| `GET` | `/api/shipments/{id}` | Get specific shipment details | `USER` or `MANAGER` |
| `DELETE` | `/api/shipments/{id}` | Cancel/Delete a shipment | `USER` or `MANAGER` |

### Inventory Management (`/api/inventory`)
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/inventory` | Add produce to inventory | `USER` or `MANAGER` |
| `PUT` | `/api/inventory/{id}` | Update quantity/location | `USER` or `MANAGER` |
| `GET` | `/api/inventory` | List inventory items | `USER` or `MANAGER` |
| `DELETE` | `/api/inventory/{id}` | Remove from inventory | `USER` or `MANAGER` |

### Delivery Scheduling (`/api/deliveries`)
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/deliveries` | Schedule a shipment delivery | `USER` or `MANAGER` |
| `GET` | `/api/deliveries` | List all scheduled deliveries | `MANAGER` |
| `GET` | `/api/deliveries/shipment/{shipmentId}` | Get delivery info for a shipment | `USER` or `MANAGER` |

---

## 4. Common Response Codes

| Code | Meaning | Action |
| :--- | :--- | :--- |
| `200 OK` | Success | Handle standard data response |
| `201 Created` | Resource created | Redirect or show success message |
| `401 Unauthorized` | Invalid/Expired token | Redirect to login page |
| `403 Forbidden` | Access denied (Wrong role) | Show "Access Denied" page |
| `404 Not Found` | ID doesn't exist | Show friendly 404 message |
| `400 Bad Request` | Validation failed | Show specific field errors from response |

---

## 5. Development Tips
- **CORS**: Enabled for all origins (`*`) during development. No proxy config needed.
- **Payload Validation**: The API uses strict validation. Ensure `email` format and `password` length (min 6) are correct on the frontend.
- **Dates**: All dates are returned in ISO 8601 format (e.g., `2026-01-30T22:54:50`).
