# FreshLink - Smart Supplier Discovery Platform

![FreshLink Logo](https://img.shields.io/badge/FreshLink-Smart%20Supplier%20Discovery-green?style=for-the-badge)

**FreshLink** is a hyperlocal B2B marketplace that connects food vendors with verified suppliers within a 5km radius. The platform enables both individual ordering and collaborative batch ordering to help vendors get better wholesale prices while ensuring quality and trust through community verification.

## 🌟 Key Features

### 🎯 **Hyperlocal Discovery**
- Find verified suppliers within 5km radius
- Real-time inventory updates
- Location-based supplier recommendations
- Smart distance calculation and routing

### 👥 **Dual Ordering System**
- **Individual Orders**: Direct supplier ordering with 10% markup
- **Batch Orders**: Collaborative ordering for bulk pricing (15-20% savings)
- Real-time batch order tracking and participant management

### 🔍 **Advanced Search & Filtering**
- Multi-category product search
- Supplier filtering by distance, rating, and specialization
- Real-time search results across suppliers and products
- Order history search and filtering

### 🛡️ **Trust & Verification**
- Community-verified suppliers
- Photo verification system
- Rating and review system
- Order history and performance tracking

### 📱 **User Management**
- Secure password-based authentication
- Comprehensive profile management
- Payment method management
- Delivery address management
- Notification preferences
- Help & support system

## 🏗️ Technical Architecture

### **Frontend Stack**
- **HTML5**: Semantic markup structure
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Vanilla JavaScript**: Component-based SPA architecture
- **Lucide Icons**: Modern icon library for UI elements

### **State Management**
- Global AppState for centralized data management
- Real-time updates for orders and inventory
- Local storage for user preferences and session management

### **Design System**
- Mobile-first responsive design
- Custom animations and transitions
- Consistent color scheme and typography
- Accessibility-focused UI components

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jenieshalin054/FreshLink.git
   cd FreshLink
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using VS Code Live Server extension
   Right-click on index.html > "Open with Live Server"
   ```

3. **Access the application**
   - Open `http://localhost:8000` in your browser
   - Or directly open `index.html` file

## 📖 User Guide

### **For Vendors**

1. **Registration & Login**
   - Register as a vendor with phone number and password
   - Complete profile setup with business information

2. **Finding Suppliers**
   - Browse suppliers within 5km radius
   - Use search and filter options
   - View supplier ratings, contact info, and available products

3. **Placing Orders**
   - **Individual Orders**: Direct ordering with immediate processing
   - **Batch Orders**: Join existing batch orders or start new ones
   - Track order status and delivery updates

4. **Profile Management**
   - Manage payment methods (Cards, UPI, Wallets)
   - Add/edit delivery addresses
   - Configure notification preferences
   - Access help and support

### **For Suppliers**

1. **Registration**
   - Register as a supplier with business verification
   - Upload product catalog with pricing and availability
   - Set delivery areas and schedules

2. **Order Management**
   - Receive and process individual orders
   - Manage batch order fulfillment
   - Update inventory and pricing in real-time

## 🎨 UI/UX Features

### **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interface elements

### **Visual Elements**
- Clean, modern interface
- Intuitive navigation with bottom tab bar
- Loading animations and smooth transitions
- Color-coded status indicators

### **Accessibility**
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme

## 📁 Project Structure

```
FreshLink/
├── index.html          # Main application entry point
├── script.js           # Complete application logic
├── styles.css          # Custom animations and styles
├── README.md          # Project documentation
└── assets/            # Static assets (if any)
```

### **Key Components**

- **LandingPage**: Marketing page with feature highlights
- **LoginPage**: Secure authentication system
- **RegistrationPage**: User onboarding for vendors/suppliers
- **VendorDashboard**: Main vendor interface
- **SuppliersPage**: Supplier discovery and browsing
- **BatchOrdersPage**: Collaborative ordering interface
- **ProfilePage**: User account management
- **OrderHistoryPage**: Order tracking and history
- **PaymentMethodsPage**: Payment management
- **DeliveryAddressesPage**: Address management
- **NotificationsPage**: Notification preferences
- **HelpSupportPage**: Support and FAQ system

## 🔧 Development

### **Code Organization**
- **Global State Management**: Centralized AppState object
- **Component Architecture**: Functional components with clear separation
- **Event Handling**: Organized event handlers for user interactions
- **Utility Functions**: Reusable helper functions

### **Sample Data**
The project includes realistic sample data for:
- Suppliers with locations, ratings, and products
- Batch orders with real-time updates
- User orders and transaction history

### **Adding Features**
1. Create new component functions in `script.js`
2. Add routing in the `render()` function
3. Implement event handlers for user interactions
4. Update global state as needed

## 🌐 Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Email**: support@freshlink.com
- **Phone**: +91 98765 00000
- **Live Chat**: Available 24/7 in the app
- **GitHub Issues**: [Report bugs or request features](https://github.com/jenieshalin054/FreshLink/issues)

## 🎯 Roadmap

### **Upcoming Features**
- [ ] Real-time chat between vendors and suppliers
- [ ] Advanced analytics and reporting
- [ ] Mobile app development (React Native)
- [ ] API integration for payment gateways
- [ ] Multi-language support
- [ ] AI-powered supplier recommendations

### **Long-term Vision**
- Expand to multiple cities across India
- Integration with logistics partners
- Blockchain-based supply chain tracking
- IoT integration for real-time inventory

---

**Built with ❤️ for the food vendor community**

*Connecting fresh ingredients with passionate food creators across India*