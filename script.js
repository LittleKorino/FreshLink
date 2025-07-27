// Global State Management
const AppState = {
    currentUser: null,
    currentView: 'landing',
    userRole: null,
    suppliers: [],
    products: [],
    batchOrders: [],
    userLocation: { lat: 19.0760, lng: 72.8777 }, // Default to Mumbai
    notifications: [],
    userOrders: [] // Track user's individual orders
};

// Sample Data
const sampleSuppliers = [
    {
        id: 'sup1',
        name: 'Krishna Wholesale',
        distance: 2.3,
        rating: 4.8,
        totalOrders: 156,
        address: 'Dadar Market, Mumbai',
        phone: '+91 98765 43210',
        categories: ['Vegetables', 'Fruits'],
        isActive: true,
        lat: 19.0176,
        lng: 72.8462,
        products: [
            { id: 'p1', name: 'Fresh Onions', price: 25, unit: 'kg', available: 500, image: '🧅' },
            { id: 'p2', name: 'Tomatoes', price: 30, unit: 'kg', available: 300, image: '🍅' },
            { id: 'p3', name: 'Potatoes', price: 20, unit: 'kg', available: 400, image: '🥔' }
        ]
    },
    {
        id: 'sup2',
        name: 'Spice King Traders',
        distance: 1.8,
        rating: 4.6,
        totalOrders: 89,
        address: 'Crawford Market, Mumbai',
        phone: '+91 87654 32109',
        categories: ['Spices', 'Dry Goods'],
        isActive: true,
        lat: 18.9647,
        lng: 72.8258,
        products: [
            { id: 'p4', name: 'Turmeric Powder', price: 180, unit: 'kg', available: 50, image: '🟡' },
            { id: 'p5', name: 'Red Chili Powder', price: 220, unit: 'kg', available: 30, image: '🌶️' },
            { id: 'p6', name: 'Cumin Seeds', price: 450, unit: 'kg', available: 25, image: '🟤' }
        ]
    },
    {
        id: 'sup3',
        name: 'Dairy Fresh Co.',
        distance: 3.1,
        rating: 4.9,
        totalOrders: 203,
        address: 'Bandra West, Mumbai',
        phone: '+91 76543 21098',
        categories: ['Dairy', 'Beverages'],
        isActive: true,
        lat: 19.0596,
        lng: 72.8295,
        products: [
            { id: 'p7', name: 'Fresh Milk', price: 45, unit: 'liter', available: 200, image: '🥛' },
            { id: 'p8', name: 'Paneer', price: 280, unit: 'kg', available: 15, image: '🧀' },
            { id: 'p9', name: 'Yogurt', price: 50, unit: 'kg', available: 50, image: '🥣' }
        ]
    }
];

const sampleBatchOrders = [
    {
        id: 'batch1',
        productName: 'Fresh Onions',
        productImage: '🧅',
        supplierName: 'Krishna Wholesale',
        totalQuantity: 50,
        currentQuantity: 32,
        pricePerKg: 25,
        participants: 4,
        expiresIn: '2h 30m',
        deliveryTime: 'Tomorrow 7:00 AM',
        status: 'open'
    },
    {
        id: 'batch2',
        productName: 'Tomatoes',
        productImage: '🍅',
        supplierName: 'Krishna Wholesale',
        totalQuantity: 30,
        currentQuantity: 28,
        pricePerKg: 30,
        participants: 3,
        expiresIn: '1h 45m',
        deliveryTime: 'Tomorrow 8:00 AM',
        status: 'open'
    }
];

// Utility Functions
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white fade-in`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Components
function LandingPage() {
    return `
        <div class="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
            <!-- Header -->
            <header class="bg-white shadow-sm">
                <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-lg">F</span>
                        </div>
                        <span class="text-xl font-bold text-gray-800">FreshLink</span>
                    </div>
                    <button onclick="switchView('login')" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        Sign In
                    </button>
                </div>
            </header>

            <!-- Hero Section -->
            <div class="max-w-7xl mx-auto px-4 py-16">
                <div class="text-center mb-16">
                    <h1 class="text-5xl font-bold text-gray-800 mb-6 fade-in">
                        Fresh Ingredients, <span class="text-green-500">Fair Prices</span>
                    </h1>
                    <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto fade-in">
                        Connect with verified suppliers within 5km. Join batch orders for better prices. 
                        Build trust through community verification.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center fade-in">
                        <button onclick="startRegistration('vendor')" class="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors pulse-green">
                            I'm a Vendor
                        </button>
                        <button onclick="startRegistration('supplier')" class="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors">
                            I'm a Supplier
                        </button>
                    </div>
                </div>

                <!-- Features Grid -->
                <div class="grid md:grid-cols-3 gap-8 mb-16">
                    <div class="bg-white p-6 rounded-xl shadow-lg fade-in">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">📍</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Hyperlocal Discovery</h3>
                        <p class="text-gray-600">Find verified suppliers within 5km radius with real-time inventory updates.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg fade-in">
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">👥</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Batch Ordering</h3>
                        <p class="text-gray-600">Join with other vendors for bulk orders and get better wholesale prices.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg fade-in">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">⭐</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Quality Assured</h3>
                        <p class="text-gray-600">Community-verified suppliers with photo verification and ratings.</p>
                    </div>
                </div>

                <!-- Problem Section -->
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <h2 class="text-3xl font-bold text-center mb-8">Solving Real Problems</h2>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-xl font-semibold text-red-600 mb-4">Current Challenges</h3>
                            <ul class="space-y-3 text-gray-600">
                                <li class="flex items-center"><span class="text-red-500 mr-2">❌</span> 3+ hours daily searching for suppliers</li>
                                <li class="flex items-center"><span class="text-red-500 mr-2">❌</span> Poor quality ingredients at high prices</li>
                                <li class="flex items-center"><span class="text-red-500 mr-2">❌</span> No trust or verification system</li>
                                <li class="flex items-center"><span class="text-red-500 mr-2">❌</span> Individual vendors pay retail prices</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-600 mb-4">FreshLink Solutions</h3>
                            <ul class="space-y-3 text-gray-600">
                                <li class="flex items-center"><span class="text-green-500 mr-2">✅</span> Find suppliers in under 5 minutes</li>
                                <li class="flex items-center"><span class="text-green-500 mr-2">✅</span> Quality-verified fresh ingredients</li>
                                <li class="flex items-center"><span class="text-green-500 mr-2">✅</span> Community ratings and photo verification</li>
                                <li class="flex items-center"><span class="text-green-500 mr-2">✅</span> 15-20% savings through batch orders</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function LoginPage() {
    return `
        <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span class="text-white font-bold text-2xl">F</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p class="text-gray-600">Sign in to your FreshLink account</p>
                </div>

                <form onsubmit="handleLogin(event)" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" id="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="+91 98765 43210" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                        <input type="text" id="otp" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter 6-digit OTP" maxlength="6">
                    </div>
                    <button type="submit" class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                        Sign In
                    </button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-gray-600">Don't have an account?</p>
                    <div class="flex gap-4 mt-4">
                        <button onclick="startRegistration('vendor')" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            Register as Vendor
                        </button>
                        <button onclick="startRegistration('supplier')" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            Register as Supplier
                        </button>
                    </div>
                </div>

                <button onclick="switchView('landing')" class="mt-4 text-green-500 hover:text-green-600 text-sm">
                    ← Back to Home
                </button>
            </div>
        </div>
    `;
}

function RegistrationPage(role) {
    return `
        <div class="min-h-screen bg-gray-50 py-8 px-4">
            <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-${role === 'vendor' ? 'green' : 'orange'}-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span class="text-white font-bold text-2xl">${role === 'vendor' ? 'V' : 'S'}</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800">Register as ${role === 'vendor' ? 'Vendor' : 'Supplier'}</h2>
                    <p class="text-gray-600">Join the FreshLink community</p>
                </div>

                <form onsubmit="handleRegistration(event, '${role}')" class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input type="tel" id="reg-phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="+91 98765 43210" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                            <input type="text" id="business-name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="${role === 'vendor' ? 'Raj\'s Chaat Corner' : 'Krishna Wholesale'}" required>
                        </div>
                    </div>

                    ${role === 'vendor' ? `
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                            <select id="food-type" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required>
                                <option value="">Select food type</option>
                                <option value="chaat">Chaat</option>
                                <option value="dosa">Dosa/South Indian</option>
                                <option value="tea">Tea/Beverages</option>
                                <option value="snacks">Snacks</option>
                                <option value="sweets">Sweets</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    ` : `
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Supply Categories</label>
                            <div class="grid grid-cols-2 gap-4">
                                <label class="flex items-center"><input type="checkbox" class="mr-2" value="vegetables"> Vegetables</label>
                                <label class="flex items-center"><input type="checkbox" class="mr-2" value="fruits"> Fruits</label>
                                <label class="flex items-center"><input type="checkbox" class="mr-2" value="spices"> Spices</label>
                                <label class="flex items-center"><input type="checkbox" class="mr-2" value="dairy"> Dairy</label>
                                <label class="flex items-center"><input type="checkbox" class="mr-2" value="grains"> Grains</label>
                                <label class="flex items-center"><input type="checkbox" class="mr-2" value="other"> Other</label>
                            </div>
                        </div>
                    `}

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea id="address" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="3" placeholder="Complete address with landmark" required></textarea>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Daily Volume ${role === 'vendor' ? '(Customers)' : '(Orders)'}</label>
                            <input type="number" id="daily-volume" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="${role === 'vendor' ? '50' : '20'}" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">${role === 'vendor' ? 'Experience (Years)' : 'GST Number'}</label>
                            <input type="${role === 'vendor' ? 'number' : 'text'}" id="experience-gst" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="${role === 'vendor' ? '3' : '27XXXXX1234X1ZX'}">
                        </div>
                    </div>

                    <button type="submit" class="w-full bg-${role === 'vendor' ? 'green' : 'orange'}-500 text-white py-3 rounded-lg font-semibold hover:bg-${role === 'vendor' ? 'green' : 'orange'}-600 transition-colors">
                        Complete Registration
                    </button>
                </form>

                <button onclick="switchView('landing')" class="mt-4 text-green-500 hover:text-green-600 text-sm">
                    ← Back to Home
                </button>
            </div>
        </div>
    `;
}

function VendorDashboard() {
    return `
        <div class="min-h-screen bg-gray-50">
            <!-- Header -->
            <header class="bg-white shadow-sm sticky top-0 z-10">
                <div class="max-w-7xl mx-auto px-4 py-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <span class="text-white font-bold">R</span>
                            </div>
                            <div>
                                <h1 class="text-lg font-semibold">Raj's Chaat Corner</h1>
                                <p class="text-sm text-gray-600">📍 Dadar, Mumbai</p>
                            </div>
                        </div>
                        <button onclick="logout()" class="text-gray-600 hover:text-gray-800">
                            <span class="text-xl">🚪</span>
                        </button>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- Quick Stats -->
                <div class="grid md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                        <div class="flex items-center">
                            <span class="text-2xl mr-3">📦</span>
                            <div>
                                <p class="text-2xl font-bold text-green-600">12</p>
                                <p class="text-sm text-gray-600">Active Orders</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                        <div class="flex items-center">
                            <span class="text-2xl mr-3">💰</span>
                            <div>
                                <p class="text-2xl font-bold text-blue-600">₹2,340</p>
                                <p class="text-sm text-gray-600">Saved This Month</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                        <div class="flex items-center">
                            <span class="text-2xl mr-3">👥</span>
                            <div>
                                <p class="text-2xl font-bold text-orange-600">8</p>
                                <p class="text-sm text-gray-600">Batch Orders Joined</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                        <div class="flex items-center">
                            <span class="text-2xl mr-3">⭐</span>
                            <div>
                                <p class="text-2xl font-bold text-yellow-600">4.8</p>
                                <p class="text-sm text-gray-600">Your Rating</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Order Section -->
                <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold">⚡ Quick Order</h2>
                        <button onclick="switchView('suppliers')" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Browse All →
                        </button>
                    </div>
                    <div class="grid md:grid-cols-4 gap-4">
                        ${sampleSuppliers.slice(0, 2).map(supplier => 
                            supplier.products.slice(0, 2).map(product => `
                                <div class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                                    <div class="text-center mb-2">
                                        <div class="text-2xl mb-1">${product.image}</div>
                                        <h4 class="font-medium text-sm">${product.name}</h4>
                                        <p class="text-xs text-gray-600">${supplier.name}</p>
                                    </div>
                                    <div class="text-center mb-3">
                                        <p class="text-lg font-bold text-blue-600">₹${Math.round(product.price * 1.1)}</p>
                                        <p class="text-xs text-gray-500">per ${product.unit}</p>
                                    </div>
                                    <button onclick="placeIndividualOrder('${product.id}', '${supplier.id}')" class="w-full bg-blue-500 text-white py-1.5 rounded text-xs hover:bg-blue-600 transition-colors">
                                        Order Now
                                    </button>
                                </div>
                            `).join('')
                        ).flat().join('')}
                    </div>
                    <div class="mt-4 text-center">
                        <p class="text-xs text-gray-500">Individual orders • 10% markup • Same/next day delivery</p>
                    </div>
                </div>

                <!-- Active Batch Orders -->
                <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold">🔥 Active Batch Orders</h2>
                        <button onclick="switchView('batch-orders')" class="text-green-600 hover:text-green-700 text-sm font-medium">
                            View All →
                        </button>
                    </div>
                    <div class="grid md:grid-cols-2 gap-6">
                        ${sampleBatchOrders.map(order => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center">
                                        <span class="text-2xl mr-3">${order.productImage}</span>
                                        <div>
                                            <h3 class="font-semibold">${order.productName}</h3>
                                            <p class="text-sm text-gray-600">${order.supplierName}</p>
                                        </div>
                                    </div>
                                    ${order.status === 'completed' 
                                        ? '<span class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">✅ Completed</span>'
                                        : `<span class="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">${order.expiresIn} left</span>`
                                    }
                                </div>
                                <div class="mb-3">
                                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span>${order.currentQuantity}/${order.totalQuantity} kg</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="${order.status === 'completed' ? 'bg-green-500' : 'bg-green-500'} h-2 rounded-full" style="width: ${(order.currentQuantity/order.totalQuantity)*100}%"></div>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center">
                                    <div>
                                        <p class="text-lg font-semibold text-green-600">₹${order.pricePerKg}/kg</p>
                                        <p class="text-xs text-gray-500">${order.participants} vendors joined</p>
                                    </div>
                                    ${order.status === 'completed' || order.currentQuantity >= order.totalQuantity
                                        ? '<span class="text-sm text-gray-500 px-4 py-2 bg-gray-100 rounded-lg">Order Full</span>'
                                        : `<button onclick="joinBatchOrder('${order.id}')" class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">Join Order</button>`
                                    }
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Nearby Suppliers -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold">📍 Nearby Suppliers</h2>
                        <button onclick="switchView('suppliers')" class="text-green-600 hover:text-green-700 text-sm font-medium">
                            View All →
                        </button>
                    </div>
                    <div class="grid md:grid-cols-3 gap-6">
                        ${sampleSuppliers.slice(0, 3).map(supplier => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="viewSupplier('${supplier.id}')">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center">
                                        <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                            <span class="text-white font-bold">${supplier.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold">${supplier.name}</h3>
                                            <p class="text-sm text-gray-600">${supplier.distance}km away</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="flex items-center text-yellow-500 text-sm">
                                            <span class="mr-1">⭐</span>
                                            <span>${supplier.rating}</span>
                                        </div>
                                        <p class="text-xs text-gray-500">${supplier.totalOrders} orders</p>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="flex flex-wrap gap-1">
                                        ${supplier.categories.map(cat => `
                                            <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">${cat}</span>
                                        `).join('')}
                                    </div>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-600">${supplier.address}</span>
                                    <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            ${getBottomNavigation()}
        </div>
    `;
}

function SuppliersPage() {
    return `
        <div class="min-h-screen bg-gray-50 pb-20">
            <!-- Header -->
            <header class="bg-white shadow-sm sticky top-0 z-10">
                <div class="max-w-7xl mx-auto px-4 py-4">
                    <div class="flex items-center justify-between">
                        <h1 class="text-xl font-semibold">Find Suppliers</h1>
                        <div class="flex items-center space-x-4">
                            <button class="p-2 bg-gray-100 rounded-lg">
                                <span class="text-xl">🔍</span>
                            </button>
                            <button class="p-2 bg-gray-100 rounded-lg">
                                <span class="text-xl">📍</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Search and Filters -->
                    <div class="mt-4 space-y-4">
                        <input type="text" placeholder="Search suppliers or products..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <div class="flex space-x-2 overflow-x-auto">
                            <button class="px-4 py-2 bg-green-500 text-white rounded-full text-sm whitespace-nowrap">All</button>
                            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Vegetables</button>
                            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Fruits</button>
                            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Spices</button>
                            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Dairy</button>
                        </div>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- Suppliers List -->
                <div class="space-y-4">
                    ${sampleSuppliers.map(supplier => `
                        <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" onclick="viewSupplier('${supplier.id}')">
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex items-center">
                                    <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                                        <span class="text-white font-bold text-xl">${supplier.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold">${supplier.name}</h3>
                                        <p class="text-gray-600">${supplier.address}</p>
                                        <div class="flex items-center mt-1">
                                            <span class="text-yellow-500 mr-1">⭐</span>
                                            <span class="text-sm font-medium">${supplier.rating}</span>
                                            <span class="text-gray-400 mx-2">•</span>
                                            <span class="text-sm text-gray-600">${supplier.totalOrders} orders</span>
                                            <span class="text-gray-400 mx-2">•</span>
                                            <span class="text-sm text-green-600">${supplier.distance}km away</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                    <span class="text-sm text-green-600">Online</span>
                                </div>
                            </div>
                            
                            <div class="mb-4">
                                <div class="flex flex-wrap gap-2">
                                    ${supplier.categories.map(cat => `
                                        <span class="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">${cat}</span>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Sample Products -->
                            <div class="border-t pt-4">
                                <h4 class="text-sm font-medium text-gray-700 mb-3">Available Products:</h4>
                                <div class="grid grid-cols-3 gap-3">
                                    ${supplier.products.slice(0, 3).map(product => `
                                        <div class="text-center">
                                            <div class="text-2xl mb-1">${product.image}</div>
                                            <p class="text-xs font-medium">${product.name}</p>
                                            <p class="text-xs text-green-600">₹${product.price}/${product.unit}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="flex justify-between items-center mt-4 pt-4 border-t">
                                <button onclick="event.stopPropagation(); callSupplier('${supplier.phone}')" class="flex items-center text-blue-600 hover:text-blue-700">
                                    <span class="mr-2">📞</span>Call Now
                                </button>
                                <button onclick="event.stopPropagation(); viewSupplier('${supplier.id}')" class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                                    View Products
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${getBottomNavigation()}
        </div>
    `;
}

function BatchOrdersPage() {
    return `
        <div class="min-h-screen bg-gray-50 pb-20">
            <!-- Header -->
            <header class="bg-white shadow-sm sticky top-0 z-10">
                <div class="max-w-7xl mx-auto px-4 py-4">
                    <h1 class="text-xl font-semibold">Batch Orders</h1>
                    <p class="text-sm text-gray-600">Join group orders for better prices</p>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- Active Batch Orders -->
                <div class="mb-8">
                    <h2 class="text-lg font-semibold mb-4">🔥 Active Orders</h2>
                    <div class="space-y-4">
                        ${sampleBatchOrders.map(order => `
                            <div class="bg-white rounded-xl shadow-sm p-6">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center">
                                        <span class="text-3xl mr-4">${order.productImage}</span>
                                        <div>
                                            <h3 class="text-lg font-semibold">${order.productName}</h3>
                                            <p class="text-gray-600">${order.supplierName}</p>
                                            ${order.status === 'completed' 
                                                ? '<p class="text-sm text-green-600">✅ Order Completed</p>'
                                                : `<p class="text-sm text-orange-600">⏰ ${order.expiresIn} remaining</p>`
                                            }
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-2xl font-bold text-green-600">₹${order.pricePerKg}</p>
                                        <p class="text-sm text-gray-600">per kg</p>
                                        ${order.status === 'completed' 
                                            ? '<p class="text-xs text-green-600 font-medium">FULL</p>'
                                            : ''
                                        }
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <div class="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Order Progress</span>
                                        <span>${order.currentQuantity}/${order.totalQuantity} kg (${Math.round((order.currentQuantity/order.totalQuantity)*100)}%)</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-3">
                                        <div class="${order.status === 'completed' ? 'bg-green-500' : 'bg-green-500'} h-3 rounded-full transition-all duration-300" style="width: ${(order.currentQuantity/order.totalQuantity)*100}%"></div>
                                    </div>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex items-center text-sm text-gray-600">
                                        <span class="mr-4">👥 ${order.participants} vendors joined</span>
                                        <span>🚚 ${order.deliveryTime}</span>
                                    </div>
                                    ${order.status === 'completed' || order.currentQuantity >= order.totalQuantity
                                        ? '<span class="text-sm text-gray-500 px-6 py-2 bg-gray-100 rounded-lg">Order Full</span>'
                                        : `<button onclick="joinBatchOrder('${order.id}')" class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">Join Order</button>`
                                    }
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Your Orders -->
                <div>
                    <h2 class="text-lg font-semibold mb-4">📋 Your Orders</h2>
                    <div class="space-y-4">
                        ${AppState.userOrders.length > 0 ? AppState.userOrders.map(userOrder => `
                            <div class="bg-white rounded-xl shadow-sm p-6">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center">
                                        <span class="text-3xl mr-4">${userOrder.productImage}</span>
                                        <div>
                                            <div class="flex items-center gap-2 mb-1">
                                                <h3 class="text-lg font-semibold">${userOrder.productName}</h3>
                                                <span class="text-xs px-2 py-1 rounded-full ${userOrder.type === 'individual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                                                    ${userOrder.type === 'individual' ? 'Individual' : 'Batch'}
                                                </span>
                                            </div>
                                            <p class="text-gray-600">${userOrder.supplierName}</p>
                                            <p class="text-sm text-green-600">✅ ${userOrder.status === 'confirmed' ? 'Confirmed' : userOrder.status} - ${userOrder.quantity}${userOrder.type === 'individual' ? userOrder.quantity === 1 ? ' unit' : ' units' : 'kg'} ordered</p>
                                            ${userOrder.type === 'individual' && userOrder.deliveryFee > 0 ? `<p class="text-xs text-orange-600">+ ₹${userOrder.deliveryFee} delivery fee</p>` : ''}
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-lg font-bold text-gray-800">₹${userOrder.totalAmount}</p>
                                        <p class="text-sm text-gray-600">Total paid</p>
                                        ${userOrder.type === 'individual' ? `<p class="text-xs text-gray-500">₹${userOrder.pricePerUnit}/${userOrder.quantity === 1 ? 'unit' : 'kg'}</p>` : ''}
                                    </div>
                                </div>
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-600">Delivery: ${userOrder.deliveryTime}</span>
                                    <div class="flex gap-2">
                                        ${userOrder.type === 'individual' && userOrder.supplierPhone ? `<button onclick="callSupplier('${userOrder.supplierPhone}')" class="text-blue-600 hover:text-blue-700">📞 Call</button>` : ''}
                                        <button class="text-blue-600 hover:text-blue-700">Track Order</button>
                                    </div>
                                </div>
                                ${userOrder.specialInstructions ? `
                                <div class="mt-3 pt-3 border-t border-gray-100">
                                    <p class="text-xs text-gray-600"><span class="font-medium">Special Instructions:</span> ${userOrder.specialInstructions}</p>
                                </div>
                                ` : ''}
                            </div>
                        `).join('') : `
                            <div class="bg-white rounded-xl shadow-sm p-6 text-center">
                                <div class="text-4xl mb-4">📦</div>
                                <h3 class="text-lg font-semibold mb-2">No Orders Yet</h3>
                                <p class="text-gray-600">Join a batch order to see your orders here.</p>
                            </div>
                        `}
                        
                        <!-- Sample static orders for demo -->
                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                    <span class="text-3xl mr-4">🥔</span>
                                    <div>
                                        <h3 class="text-lg font-semibold">Potatoes</h3>
                                        <p class="text-gray-600">Krishna Wholesale</p>
                                        <p class="text-sm text-green-600">✅ Confirmed - 5kg ordered</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-lg font-bold text-gray-800">₹100</p>
                                    <p class="text-sm text-gray-600">Total paid</p>
                                </div>
                            </div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-gray-600">Delivery: Today 6:00 PM</span>
                                <button class="text-blue-600 hover:text-blue-700">Track Order</button>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                    <span class="text-3xl mr-4">🌶️</span>
                                    <div>
                                        <h3 class="text-lg font-semibold">Red Chili Powder</h3>
                                        <p class="text-gray-600">Spice King Traders</p>
                                        <p class="text-sm text-blue-600">📦 Delivered - 2kg received</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-lg font-bold text-gray-800">₹440</p>
                                    <p class="text-sm text-gray-600">Total paid</p>
                                </div>
                            </div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-gray-600">Delivered: Yesterday 7:30 AM</span>
                                <button onclick="rateOrder('order2')" class="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition-colors">
                                    Rate Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ${getBottomNavigation()}
        </div>
    `;
}

function ProfilePage() {
    return `
        <div class="min-h-screen bg-gray-50 pb-20">
            <!-- Header -->
            <header class="bg-white shadow-sm sticky top-0 z-10">
                <div class="max-w-7xl mx-auto px-4 py-4">
                    <h1 class="text-xl font-semibold">Profile</h1>
                    <p class="text-sm text-gray-600">Manage your account and settings</p>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- User Info -->
                <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                            <span class="text-white font-bold text-2xl">${AppState.currentUser?.businessName?.charAt(0) || 'V'}</span>
                        </div>
                        <div>
                            <h2 class="text-xl font-semibold">${AppState.currentUser?.businessName || 'My Business'}</h2>
                            <p class="text-gray-600">${AppState.currentUser?.phone || '+91 98765 43210'}</p>
                            <p class="text-sm text-green-600">✅ Verified Vendor</p>
                        </div>
                    </div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-white rounded-xl shadow-sm p-4 text-center">
                        <div class="text-2xl font-bold text-green-600">${AppState.userOrders.length}</div>
                        <div class="text-sm text-gray-600">Total Orders</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-4 text-center">
                        <div class="text-2xl font-bold text-blue-600">₹${AppState.userOrders.reduce((total, order) => total + (order.totalAmount || 0), 0)}</div>
                        <div class="text-sm text-gray-600">Total Spent</div>
                    </div>
                </div>

                <!-- Menu Options -->
                <div class="space-y-4">
                    <div class="bg-white rounded-xl shadow-sm">
                        <button onclick="switchView('order-history')" class="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50">
                            <div class="flex items-center">
                                <span class="text-xl mr-3">📋</span>
                                <span class="font-medium">Order History</span>
                            </div>
                            <span class="text-gray-400">→</span>
                        </button>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm">
                        <button class="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50">
                            <div class="flex items-center">
                                <span class="text-xl mr-3">💳</span>
                                <span class="font-medium">Payment Methods</span>
                            </div>
                            <span class="text-gray-400">→</span>
                        </button>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm">
                        <button class="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50">
                            <div class="flex items-center">
                                <span class="text-xl mr-3">📍</span>
                                <span class="font-medium">Delivery Addresses</span>
                            </div>
                            <span class="text-gray-400">→</span>
                        </button>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm">
                        <button class="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50">
                            <div class="flex items-center">
                                <span class="text-xl mr-3">🔔</span>
                                <span class="font-medium">Notifications</span>
                            </div>
                            <span class="text-gray-400">→</span>
                        </button>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm">
                        <button class="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50">
                            <div class="flex items-center">
                                <span class="text-xl mr-3">❓</span>
                                <span class="font-medium">Help & Support</span>
                            </div>
                            <span class="text-gray-400">→</span>
                        </button>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm">
                        <button onclick="logout()" class="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 text-red-600">
                            <div class="flex items-center">
                                <span class="text-xl mr-3">🚪</span>
                                <span class="font-medium">Logout</span>
                            </div>
                            <span class="text-gray-400">→</span>
                        </button>
                    </div>
                </div>
            </div>

            ${getBottomNavigation()}
        </div>
    `;
}

function OrderHistoryPage() {
    // Separate individual and batch orders
    const individualOrders = AppState.userOrders.filter(order => order.type === 'individual');
    const batchOrders = AppState.userOrders.filter(order => order.type === 'batch');
    
    return `
        <div class="min-h-screen bg-gray-50 pb-20">
            <!-- Header -->
            <header class="bg-white shadow-sm sticky top-0 z-10">
                <div class="max-w-7xl mx-auto px-4 py-4">
                    <div class="flex items-center">
                        <button onclick="switchView('profile')" class="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                            <span class="text-xl">←</span>
                        </button>
                        <div>
                            <h1 class="text-xl font-semibold">Order History</h1>
                            <p class="text-sm text-gray-600">Your complete order timeline</p>
                        </div>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- Order Summary Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-xl shadow-sm p-4 text-center">
                        <div class="text-2xl font-bold text-blue-600">${individualOrders.length}</div>
                        <div class="text-sm text-gray-600">Individual Orders</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-4 text-center">
                        <div class="text-2xl font-bold text-green-600">${batchOrders.length}</div>
                        <div class="text-sm text-gray-600">Batch Orders</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-4 text-center">
                        <div class="text-2xl font-bold text-purple-600">${AppState.userOrders.length}</div>
                        <div class="text-sm text-gray-600">Total Orders</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-4 text-center">
                        <div class="text-2xl font-bold text-orange-600">₹${AppState.userOrders.reduce((total, order) => total + (order.totalAmount || 0), 0)}</div>
                        <div class="text-sm text-gray-600">Total Spent</div>
                    </div>
                </div>

                <!-- Order Filters -->
                <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div class="flex gap-4">
                        <button onclick="filterOrders('all')" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm" id="filter-all">All Orders</button>
                        <button onclick="filterOrders('individual')" class="px-4 py-2 text-gray-700 rounded-lg text-sm hover:bg-gray-100" id="filter-individual">Individual</button>
                        <button onclick="filterOrders('batch')" class="px-4 py-2 text-gray-700 rounded-lg text-sm hover:bg-gray-100" id="filter-batch">Batch Orders</button>
                    </div>
                </div>

                <!-- Orders List -->
                <div class="space-y-4" id="orders-container">
                    ${AppState.userOrders.length > 0 ? AppState.userOrders
                        .sort((a, b) => new Date(b.orderDate || b.joinedAt) - new Date(a.orderDate || a.joinedAt))
                        .map(userOrder => `
                        <div class="bg-white rounded-xl shadow-sm p-6 order-item" data-type="${userOrder.type}">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                    <span class="text-3xl mr-4">${userOrder.productImage}</span>
                                    <div>
                                        <div class="flex items-center gap-2 mb-1">
                                            <h3 class="text-lg font-semibold">${userOrder.productName}</h3>
                                            <span class="text-xs px-2 py-1 rounded-full ${userOrder.type === 'individual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                                                ${userOrder.type === 'individual' ? 'Individual' : 'Batch'}
                                            </span>
                                        </div>
                                        <p class="text-gray-600">${userOrder.supplierName}</p>
                                        <p class="text-sm text-gray-500">Order ID: ${userOrder.id}</p>
                                        <p class="text-sm text-green-600">✅ ${userOrder.status === 'confirmed' ? 'Confirmed' : userOrder.status} - ${userOrder.quantity}${userOrder.type === 'individual' ? userOrder.quantity === 1 ? ' unit' : ' units' : 'kg'} ordered</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-lg font-bold text-gray-800">₹${userOrder.totalAmount}</p>
                                    <p class="text-sm text-gray-600">Total paid</p>
                                    ${userOrder.type === 'individual' ? `
                                        <div class="text-xs text-gray-500 mt-1">
                                            <p>Subtotal: ₹${userOrder.subtotal}</p>
                                            ${userOrder.deliveryFee > 0 ? `<p>Delivery: ₹${userOrder.deliveryFee}</p>` : '<p>Free delivery</p>'}
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-gray-600">
                                    Ordered: ${new Date(userOrder.orderDate || userOrder.joinedAt).toLocaleDateString('en-IN', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                                <span class="text-gray-600">Delivery: ${userOrder.deliveryTime}</span>
                            </div>
                            ${userOrder.specialInstructions ? `
                            <div class="mt-3 pt-3 border-t border-gray-100">
                                <p class="text-xs text-gray-600"><span class="font-medium">Special Instructions:</span> ${userOrder.specialInstructions}</p>
                            </div>
                            ` : ''}
                        </div>
                    `).join('') : `
                        <div class="bg-white rounded-xl shadow-sm p-8 text-center">
                            <div class="text-4xl mb-4">📦</div>
                            <h3 class="text-lg font-semibold mb-2">No Orders Yet</h3>
                            <p class="text-gray-600 mb-4">Start ordering to see your history here.</p>
                            <button onclick="switchView('suppliers')" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                Browse Suppliers
                            </button>
                        </div>
                    `}
                </div>
            </div>

            ${getBottomNavigation()}
        </div>
    `;
}

// Helper function for bottom navigation
function getBottomNavigation() {
    return `
        <!-- Bottom Navigation -->
        <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-around py-3">
                    <button onclick="switchView('vendor-dashboard')" class="flex flex-col items-center ${AppState.currentView === 'vendor-dashboard' ? 'text-green-600' : 'text-gray-600'}">
                        <span class="text-xl mb-1">🏠</span>
                        <span class="text-xs">Home</span>
                    </button>
                    <button onclick="switchView('suppliers')" class="flex flex-col items-center ${AppState.currentView === 'suppliers' ? 'text-green-600' : 'text-gray-600'}">
                        <span class="text-xl mb-1">🏪</span>
                        <span class="text-xs">Suppliers</span>
                    </button>
                    <button onclick="switchView('batch-orders')" class="flex flex-col items-center ${AppState.currentView === 'batch-orders' ? 'text-green-600' : 'text-gray-600'}">
                        <span class="text-xl mb-1">📦</span>
                        <span class="text-xs">Batch Orders</span>
                    </button>
                    <button onclick="switchView('profile')" class="flex flex-col items-center ${AppState.currentView === 'profile' ? 'text-green-600' : 'text-gray-600'}">
                        <span class="text-xl mb-1">👤</span>
                        <span class="text-xs">Profile</span>
                    </button>
                </div>
            </div>
        </nav>
    `;
}

// Event Handlers
function switchView(view) {
    AppState.currentView = view;
    render();
}

function startRegistration(role) {
    AppState.userRole = role;
    AppState.currentView = 'registration';
    render();
}

function handleLogin(event) {
    event.preventDefault();
    const phone = document.getElementById('phone').value;
    const otp = document.getElementById('otp').value;
    
    if (!phone) {
        showNotification('Please enter phone number', 'error');
        return;
    }
    
    // Simulate login
    AppState.currentUser = { phone, role: 'vendor' };
    AppState.currentView = 'vendor-dashboard';
    showNotification('Login successful!');
    render();
}

function handleRegistration(event, role) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Simulate registration
    AppState.currentUser = { 
        phone: document.getElementById('reg-phone').value,
        businessName: document.getElementById('business-name').value,
        role 
    };
    AppState.currentView = role === 'vendor' ? 'vendor-dashboard' : 'supplier-dashboard';
    showNotification(`Registration successful! Welcome to FreshLink.`);
    render();
}

function joinBatchOrder(orderId) {
    // Find the specific batch order
    const batchOrder = sampleBatchOrders.find(order => order.id === orderId);
    
    if (!batchOrder) {
        showNotification('Batch order not found!', 'error');
        return;
    }
    
    const remainingQuantity = batchOrder.totalQuantity - batchOrder.currentQuantity;
    
    if (remainingQuantity <= 0) {
        showNotification('This batch order is already full!', 'error');
        return;
    }
    
    // Create modal for joining batch order
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 m-4 max-w-md w-full">
            <h3 class="text-lg font-semibold mb-4">Join Batch Order</h3>
            <div class="mb-4">
                <h4 class="font-medium text-gray-800">${batchOrder.productName}</h4>
                <p class="text-sm text-gray-600">${batchOrder.supplierName}</p>
                <p class="text-sm text-orange-600">⏰ ${batchOrder.expiresIn} remaining</p>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                <input type="number" id="order-quantity" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="5" min="1" max="${remainingQuantity}" value="5">
                <p class="text-xs text-gray-500 mt-1">Maximum available: ${remainingQuantity}kg</p>
            </div>
            <div class="mb-4">
                <p class="text-sm text-gray-600">Price: ₹${batchOrder.pricePerKg}/kg</p>
                <p class="text-sm text-gray-600">Delivery: ${batchOrder.deliveryTime}</p>
                <p class="text-sm text-gray-600">Current progress: ${batchOrder.currentQuantity}/${batchOrder.totalQuantity}kg (${Math.round((batchOrder.currentQuantity/batchOrder.totalQuantity)*100)}%)</p>
            </div>
            <div class="flex space-x-4">
                <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg">Cancel</button>
                <button onclick="confirmJoinOrder('${orderId}'); this.closest('.fixed').remove()" class="flex-1 bg-green-500 text-white py-2 rounded-lg">Join Order</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function confirmJoinOrder(orderId) {
    const quantity = parseInt(document.getElementById('order-quantity')?.value || 5);
    
    // Find the batch order in sampleBatchOrders
    const batchOrderIndex = sampleBatchOrders.findIndex(order => order.id === orderId);
    
    if (batchOrderIndex !== -1) {
        const batchOrder = sampleBatchOrders[batchOrderIndex];
        
        // Check if there's enough remaining quantity
        const remainingQuantity = batchOrder.totalQuantity - batchOrder.currentQuantity;
        
        if (quantity > remainingQuantity) {
            showNotification(`Only ${remainingQuantity}kg remaining in this batch order!`, 'error');
            return;
        }
        
        // Update the batch order
        sampleBatchOrders[batchOrderIndex].currentQuantity += quantity;
        sampleBatchOrders[batchOrderIndex].participants += 1;
        
        // Add to user's personal orders
        const userOrder = {
            id: `user_order_${Date.now()}`,
            type: 'batch',
            batchOrderId: orderId,
            productName: batchOrder.productName,
            productImage: batchOrder.productImage,
            supplierName: batchOrder.supplierName,
            quantity: quantity,
            pricePerKg: batchOrder.pricePerKg,
            totalAmount: quantity * batchOrder.pricePerKg,
            deliveryTime: batchOrder.deliveryTime,
            status: 'confirmed',
            joinedAt: new Date().toISOString()
        };
        
        AppState.userOrders.push(userOrder);
        
        // Check if batch order is now complete
        if (sampleBatchOrders[batchOrderIndex].currentQuantity >= sampleBatchOrders[batchOrderIndex].totalQuantity) {
            sampleBatchOrders[batchOrderIndex].status = 'completed';
            showNotification(`Successfully joined batch order for ${quantity}kg! Order is now complete.`);
        } else {
            showNotification(`Successfully joined batch order for ${quantity}kg!`);
        }
        
        // Re-render the current view to show updated numbers
        render();
    } else {
        showNotification('Batch order not found!', 'error');
    }
}

function viewSupplier(supplierId) {
    const supplier = sampleSuppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    // Create supplier detail modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-white z-50 overflow-y-auto';
    modal.innerHTML = `
        <div class="min-h-screen bg-gray-50">
            <header class="bg-white shadow-sm sticky top-0 z-10">
                <div class="max-w-7xl mx-auto px-4 py-4">
                    <div class="flex items-center">
                        <button onclick="this.closest('.fixed').remove()" class="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                            <span class="text-xl">←</span>
                        </button>
                        <h1 class="text-xl font-semibold">${supplier.name}</h1>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- Supplier Info -->
                <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                            <span class="text-white font-bold text-xl">${supplier.name.charAt(0)}</span>
                        </div>
                        <div class="flex-1">
                            <h2 class="text-xl font-semibold">${supplier.name}</h2>
                            <p class="text-gray-600">${supplier.address}</p>
                            <div class="flex items-center mt-2">
                                <span class="text-yellow-500 mr-1">⭐</span>
                                <span class="font-medium">${supplier.rating}</span>
                                <span class="text-gray-400 mx-2">•</span>
                                <span class="text-gray-600">${supplier.totalOrders} orders</span>
                                <span class="text-gray-400 mx-2">•</span>
                                <span class="text-green-600">${supplier.distance}km away</span>
                            </div>
                        </div>
                        <button onclick="callSupplier('${supplier.phone}')" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            📞 Call
                        </button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        ${supplier.categories.map(cat => `
                            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${cat}</span>
                        `).join('')}
                    </div>
                </div>

                <!-- Products -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4">Available Products</h3>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${supplier.products.map(product => `
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="text-center mb-3">
                                    <div class="text-4xl mb-2">${product.image}</div>
                                    <h4 class="font-semibold">${product.name}</h4>
                                </div>
                                <div class="text-center">
                                    <p class="text-2xl font-bold text-green-600">₹${product.price}</p>
                                    <p class="text-sm text-gray-600">per ${product.unit}</p>
                                    <p class="text-xs text-gray-500 mt-1">${product.available} ${product.unit} available</p>
                                </div>
                                <div class="mt-3 space-y-2">
                                    <button onclick="placeIndividualOrder('${product.id}', '${supplier.id}')" class="w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                                        Order Now
                                    </button>
                                    <button onclick="startBatchOrder('${product.id}')" class="w-full bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                                        Start Batch Order
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function callSupplier(phone) {
    showNotification(`Calling ${phone}...`);
}

function placeIndividualOrder(productId, supplierId) {
    // Find the product and supplier
    const supplier = sampleSuppliers.find(s => s.id === supplierId);
    const product = supplier?.products.find(p => p.id === productId);
    
    if (!supplier || !product) {
        showNotification('Product or supplier not found!', 'error');
        return;
    }

    // Create individual order modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 m-4 max-w-md w-full">
            <h3 class="text-lg font-semibold mb-4">Place Individual Order</h3>
            <div class="mb-4">
                <div class="flex items-center mb-3">
                    <span class="text-3xl mr-3">${product.image}</span>
                    <div>
                        <h4 class="font-semibold">${product.name}</h4>
                        <p class="text-sm text-gray-600">${supplier.name}</p>
                    </div>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg mb-3">
                    <p class="text-sm text-gray-600">Individual Price (No Bulk Discount)</p>
                    <p class="text-xl font-bold text-blue-600">₹${Math.round(product.price * 1.1)}/kg</p>
                    <p class="text-xs text-gray-500">Regular price: ₹${product.price}/kg</p>
                </div>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Quantity (${product.unit})</label>
                <input type="number" id="individual-quantity" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="1" min="1" max="${product.available}" value="1">
                <p class="text-xs text-gray-500 mt-1">Available: ${product.available}${product.unit}</p>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                <select id="delivery-time" class="w-full px-4 py-3 border border-gray-300 rounded-lg">
                    <option value="today">Today (6:00 PM) - ₹20 delivery fee</option>
                    <option value="tomorrow">Tomorrow (8:00 AM) - Free delivery</option>
                    <option value="custom">Schedule for later - Free delivery</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Special Instructions (Optional)</label>
                <textarea id="special-instructions" class="w-full px-4 py-3 border border-gray-300 rounded-lg" rows="2" placeholder="Any specific requirements..."></textarea>
            </div>
            <div class="flex space-x-4">
                <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg">Cancel</button>
                <button onclick="confirmIndividualOrder('${productId}', '${supplierId}'); this.closest('.fixed').remove()" class="flex-1 bg-blue-500 text-white py-2 rounded-lg">Place Order</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function confirmIndividualOrder(productId, supplierId) {
    const quantity = parseInt(document.getElementById('individual-quantity')?.value || 1);
    const deliveryTime = document.getElementById('delivery-time')?.value || 'tomorrow';
    const specialInstructions = document.getElementById('special-instructions')?.value || '';
    
    // Find the product and supplier
    const supplier = sampleSuppliers.find(s => s.id === supplierId);
    const product = supplier?.products.find(p => p.id === productId);
    
    if (!supplier || !product) {
        showNotification('Product or supplier not found!', 'error');
        return;
    }
    
    // Check quantity availability
    if (quantity > product.available) {
        showNotification(`Only ${product.available}${product.unit} available!`, 'error');
        return;
    }
    
    // Calculate pricing
    const individualPrice = Math.round(product.price * 1.1); // 10% markup for individual orders
    const deliveryFee = deliveryTime === 'today' ? 20 : 0;
    const subtotal = quantity * individualPrice;
    const total = subtotal + deliveryFee;
    
    // Create individual order
    const individualOrder = {
        id: `individual_order_${Date.now()}`,
        type: 'individual',
        productId: productId,
        productName: product.name,
        productImage: product.image,
        supplierId: supplierId,
        supplierName: supplier.name,
        supplierPhone: supplier.phone,
        quantity: quantity,
        pricePerUnit: individualPrice,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        totalAmount: total,
        deliveryTime: deliveryTime === 'today' ? 'Today 6:00 PM' : 
                     deliveryTime === 'tomorrow' ? 'Tomorrow 8:00 AM' : 'Scheduled',
        specialInstructions: specialInstructions,
        status: 'confirmed',
        orderDate: new Date().toISOString()
    };
    
    // Add to user orders
    AppState.userOrders.push(individualOrder);
    
    // Update product availability (in real app, this would be handled by backend)
    const supplierIndex = sampleSuppliers.findIndex(s => s.id === supplierId);
    const productIndex = sampleSuppliers[supplierIndex].products.findIndex(p => p.id === productId);
    sampleSuppliers[supplierIndex].products[productIndex].available -= quantity;
    
    showNotification(`Individual order placed successfully! Total: ₹${total} (including delivery)`);
    
    // Re-render to update the view
    render();
}

function startBatchOrder(productId) {
    showNotification('Batch order started! Other vendors can now join.');
}

function rateOrder(orderId) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 m-4 max-w-md w-full">
            <h3 class="text-lg font-semibold mb-4">Rate Your Order</h3>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                <div class="flex space-x-1">
                    ${[1,2,3,4,5].map(star => `
                        <button onclick="setRating(${star})" class="text-2xl text-gray-300 hover:text-yellow-500" data-star="${star}">⭐</button>
                    `).join('')}
                </div>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Comment (Optional)</label>
                <textarea class="w-full px-4 py-3 border border-gray-300 rounded-lg" rows="3" placeholder="Share your experience..."></textarea>
            </div>
            <div class="flex space-x-4">
                <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg">Cancel</button>
                <button onclick="submitRating(); this.closest('.fixed').remove()" class="flex-1 bg-green-500 text-white py-2 rounded-lg">Submit Rating</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function setRating(rating) {
    const stars = document.querySelectorAll('[data-star]');
    stars.forEach((star, index) => {
        star.style.color = index < rating ? '#facc15' : '#d1d5db';
    });
}

function submitRating() {
    showNotification('Thank you for your feedback!');
}

function filterOrders(type) {
    // Update filter button styles
    document.querySelectorAll('[id^="filter-"]').forEach(btn => {
        btn.className = 'px-4 py-2 text-gray-700 rounded-lg text-sm hover:bg-gray-100';
    });
    document.getElementById(`filter-${type}`).className = 'px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm';
    
    // Show/hide orders based on filter
    document.querySelectorAll('.order-item').forEach(item => {
        const orderType = item.getAttribute('data-type');
        if (type === 'all' || orderType === type) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function logout() {
    AppState.currentUser = null;
    AppState.currentView = 'landing';
    showNotification('Logged out successfully');
    render();
}

// Main Render Function
function render() {
    const app = document.getElementById('app');
    
    switch(AppState.currentView) {
        case 'landing':
            app.innerHTML = LandingPage();
            break;
        case 'login':
            app.innerHTML = LoginPage();
            break;
        case 'registration':
            app.innerHTML = RegistrationPage(AppState.userRole);
            break;
        case 'vendor-dashboard':
            app.innerHTML = VendorDashboard();
            break;
        case 'suppliers':
            app.innerHTML = SuppliersPage();
            break;
        case 'batch-orders':
            app.innerHTML = BatchOrdersPage();
            break;
        case 'profile':
            app.innerHTML = ProfilePage();
            break;
        case 'order-history':
            app.innerHTML = OrderHistoryPage();
            break;
        default:
            app.innerHTML = LandingPage();
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    render();
});
