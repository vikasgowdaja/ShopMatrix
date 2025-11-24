# 🌐 ProductSphere — E-Commerce Product Marketplace Dashboard
A modern, feature-rich **E-Commerce Product Marketplace Dashboard** built with **React, TypeScript, Vite, Tailwind CSS, and shadcn/ui**.  
This application allows users to browse, filter, and explore products by **brand, category, price range, availability**, and more — all through a clean and responsive interface.

---

## 🚀 Features

### 🏬 **Product Marketplace**
- Beautiful card-based product display
- Discount badges and dynamic price formatting
- Availability tags (In Stock / Out of Stock)

### 🧭 **Smart Filtering System**
- Min/Max price sliders
- Availability filter
- Category filter
- Company/Brand filter
- Top N products filter

### 📊 **Dynamic Sidebar Navigation**
- Fully collapsible sidebar using shadcn/ui
- Icons visible in collapsed mode
- Navigation sections:
  - Navigation (Dashboard, All Products)
  - Companies (AMZ, FLP, SNP, MYN, AZO)
  - Categories (Phone, Laptop, TV, etc.)

### 🎨 **Modern UI/UX**
- Built using shadcn/ui + Radix primitives
- Responsive layout with Tailwind CSS
- Clean typography & spacing
- Accessible, keyboard-friendly components

---

## 🛠️ Tech Stack

**Frontend**
- **React**  
- **TypeScript**  
- **Vite**  
- **Tailwind CSS**  
- **shadcn/ui**  
- **Lucide Icons**

**API**
- Custom REST API consumed via `api.ts`
- Asynchronous data fetching with `Promise.all()`

---

## 📂 Folder Structure

```
src/
 ├── components/
 ├── pages/
 ├── lib/
 │    └── api.ts
 ├── types/
 ├── AppSidebar.tsx
 ├── App.tsx
 └── main.tsx
```

---

## 🏃‍♂️ Getting Started

### 1. Clone the repository
```sh
git clone <YOUR_REPO_URL>
```

### 2. Open the project folder
```sh
cd <YOUR_PROJECT_NAME>
```

### 3. Install dependencies
```sh
npm install
```

### 4. Start development server
```sh
npm run dev
```

Your app will be running at:

👉 http://localhost:5173

---

## 🌍 Deploying the Project

You can deploy this project easily on any modern hosting platform:

- **Vercel**
- **Netlify**
- **Render**
- **Firebase Hosting**
- **GitHub Pages**

### Example (Vercel):
```
npm run build
vercel deploy
```

---

## 🔗 API Integration

The project uses a centralized API service:

`src/lib/api.ts`

This handles:
- Fetching companies  
- Fetching categories  
- Fetching all products  

You can point it to any backend of your choice (Node.js, Express, MongoDB, etc.).

---

## 🤝 Contributing

Contributions are welcome!

You can:
- Add new components  
- Improve filtering options  
- Extend product features  
- Add pagination or search  
- Enhance mobile responsiveness  

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

Special thanks to:
- **shadcn/ui**
- **Radix UI**
- **Lucide Icons**
- **React & Vite teams**
