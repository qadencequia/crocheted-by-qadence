document.addEventListener('DOMContentLoaded', function() {
    // Products data
    const products = [
        {
            id: 1,
            name: "Pua Kenikeni",
            description: "Available in 3 different colors",
            price: 30.00,
            image: "product-1.jpeg",
            colors: [
                { hex: "#FFD700", name: "Golden Yellow" },
                { hex: "#FF6B6B", name: "Coral" },
                { hex: "#FFA07A", name: "Light Salmon" }
            ],
            type: "standard"
        },
        {
            id: 2,
            name: "Basic",
            description: "Up to 3 colors per lei",
            price: 10.00,
            image: "product-2.jpeg",
            colors: [
                { hex: "#4682B4", name: "Steel Blue" },
                { hex: "#9370DB", name: "Medium Purple" },
                { hex: "#20B2AA", name: "Light Sea Green" }
            ],
            type: "standard"
        },
        {
            id: 3,
            name: "Pikake",
            description: "Available in 3 different colors",
            price: 15.00,
            image: "product-3.jpeg",
            colors: [
                { hex: "#FFFFFF", name: "White" },
                { hex: "#FFE4E1", name: "Misty Rose" },
                { hex: "#E6E6FA", name: "Lavender" }
            ],
            sizes: [
                { name: "3 strands", price: 15.00 },
                { name: "6 strands", price: 25.00 }
            ],
            type: "sized"
        },
        {
            id: 4,
            name: "Plumeria",
            description: "Choose middle and petal colors (2 colors)",
            price: 15.00,
            image: "product-4.jpeg",
            colorPairs: [
                {
                    label: "Middle",
                    colors: [
                        { hex: "#FFFF00", name: "Yellow" },
                        { hex: "#FF4500", name: "Orange Red" }
                    ]
                },
                {
                    label: "Petals",
                    colors: [
                        { hex: "#FFFFFF", name: "White" },
                        { hex: "#FFCBA4", name: "Peach" }
                    ]
                }
            ],
            type: "paired"
        }
    ];

    // Load products
    loadProducts();

    // Variables
    let cart = [];
    const cartCount = document.querySelector('.cart-count');
    
    // Update cart count display
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }
    
    // Function to load products dynamically
    function loadProducts() {
        const productGrid = document.getElementById('product-grid');
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-product-id', product.id);
            
            // Create product image
            const productImage = document.createElement('div');
            productImage.className = 'product-image';
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            productImage.appendChild(img);
            
            // Create product info
            const productInfo = document.createElement('div');
            productInfo.className = 'product-info';
            
            // Product title
            const title = document.createElement('h3');
            title.textContent = product.name;
            
            // Product description
            const description = document.createElement('p');
            description.textContent = product.description;
            
            // Add title and description to product info
            productInfo.appendChild(title);
            productInfo.appendChild(description);
            
            // Add color options based on product type
            let colorOptions;
            
            switch (product.type) {
                case 'standard':
                    colorOptions = createStandardColorOptions(product.colors);
                    break;
                case 'sized':
                    colorOptions = createStandardColorOptions(product.colors);
                    const sizeOptions = createSizeOptions(product.sizes);
                    productInfo.appendChild(colorOptions);
                    productInfo.appendChild(sizeOptions);
                    break;
                case 'paired':
                    colorOptions = createPairedColorOptions(product.colorPairs);
                    break;
                default:
                    colorOptions = document.createElement('div');
            }
            
            // Only add color options if not already added (for sized products)
            if (product.type !== 'sized') {
                productInfo.appendChild(colorOptions);
            }
            
            // Add price
            const price = document.createElement('p');
            price.className = 'price';
            price.textContent = `$${product.price.toFixed(2)}`;
            productInfo.appendChild(price);
            
            // Add to cart button
            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart';
            addToCartBtn.textContent = 'Add to Cart';
            productInfo.appendChild(addToCartBtn);
            
            // Append elements to product card
            productCard.appendChild(productImage);
            productCard.appendChild(productInfo);
            
            // Append product card to grid
            productGrid.appendChild(productCard);
        });
        
        // Add event listeners after creating products
        setupEventListeners();
    }
    
    // Function to create standard color options
    function createStandardColorOptions(colors) {
        const colorOptions = document.createElement('div');
        colorOptions.className = 'color-options';
        
        colors.forEach(color => {
            const colorCircle = document.createElement('span');
            colorCircle.className = 'color-circle';
            colorCircle.style.backgroundColor = color.hex;
            colorCircle.setAttribute('title', color.name);
            colorCircle.setAttribute('data-color', color.hex);
            colorOptions.appendChild(colorCircle);
        });
        
        return colorOptions;
    }
    
    // Function to create paired color options (for Plumeria)
    function createPairedColorOptions(colorPairs) {
        const colorOptions = document.createElement('div');
        colorOptions.className = 'color-options';
        
        colorPairs.forEach(pair => {
            const colorPair = document.createElement('div');
            colorPair.className = 'color-pair';
            
            const colorLabel = document.createElement('span');
            colorLabel.className = 'color-label';
            colorLabel.textContent = pair.label + ':';
            colorPair.appendChild(colorLabel);
            
            pair.colors.forEach(color => {
                const colorCircle = document.createElement('span');
                colorCircle.className = 'color-circle';
                colorCircle.style.backgroundColor = color.hex;
                colorCircle.setAttribute('title', color.name);
                colorCircle.setAttribute('data-color', color.hex);
                colorCircle.setAttribute('data-group', pair.label);
                colorPair.appendChild(colorCircle);
            });
            
            colorOptions.appendChild(colorPair);
        });
        
        return colorOptions;
    }
    
    // Function to create size options (for Pikake)
    function createSizeOptions(sizes) {
        const sizeOptions = document.createElement('div');
        sizeOptions.className = 'size-options';
        
        sizes.forEach((size, index) => {
            const sizeBtn = document.createElement('button');
            sizeBtn.className = 'size-btn';
            sizeBtn.textContent = `${size.name} - $${size.price.toFixed(0)}`;
            sizeBtn.setAttribute('data-price', size.price.toFixed(2));
            
            // Select first size by default
            if (index === 0) {
                sizeBtn.classList.add('selected');
            }
            
            sizeOptions.appendChild(sizeBtn);
        });
        
        return sizeOptions;
    }
    
    // Setup event listeners for dynamic elements
    function setupEventListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const sizeBtns = document.querySelectorAll('.size-btn');
        const colorCircles = document.querySelectorAll('.color-circle');
        
        // Add to cart functionality
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = parseInt(productCard.getAttribute('data-product-id'));
                const product = products.find(p => p.id === productId);
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                
                // Get selected colors if any
                let selectedColors = [];
                const colorOptions = productCard.querySelectorAll('.color-circle.selected');
                colorOptions.forEach(circle => {
                    const group = circle.getAttribute('data-group');
                    const color = circle.style.backgroundColor;
                    if (group) {
                        selectedColors.push({ group, color });
                    } else {
                        selectedColors.push(color);
                    }
                });
                
                // Get selected size if any
                let selectedSize = null;
                const sizeBtn = productCard.querySelector('.size-btn.selected');
                if (sizeBtn) {
                    selectedSize = sizeBtn.textContent;
                }
                
                // Create cart item object
                const item = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    colors: selectedColors.length > 0 ? selectedColors : null,
                    size: selectedSize,
                    image: product.image
                };
                
                // Add to cart array
                cart.push(item);
                
                // Update cart count
                updateCartCount();
                
                // Show notification
                showNotification(`${productName} added to cart!`);
            });
        });
        
        // Size selection functionality
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const sizeBtnsGroup = this.parentElement.querySelectorAll('.size-btn');
                
                // Remove selected class from all buttons in this group
                sizeBtnsGroup.forEach(btn => {
                    btn.classList.remove('selected');
                });
                
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Update price based on selected option
                const price = parseFloat(this.getAttribute('data-price'));
                const priceElement = this.closest('.product-info').querySelector('.price');
                priceElement.textContent = `$${price.toFixed(2)}`;
            });
        });
        
        // Color selection functionality
        colorCircles.forEach(circle => {
            circle.addEventListener('click', function() {
                // If the circle is in a pair (like middle/petals), only toggle selection within its group
                const colorPair = this.closest('.color-pair');
                
                if (colorPair) {
                    const circles = colorPair.querySelectorAll('.color-circle');
                    circles.forEach(c => {
                        c.classList.remove('selected');
                    });
                    this.classList.add('selected');
                } else {
                    // Toggle the selected state
                    this.classList.toggle('selected');
                }
            });
        });
    }
    
    // Notification function
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Add visible class after a small delay for animation
        setTimeout(() => {
            notification.classList.add('visible');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('visible');
            
            // Remove from DOM after fade out animation
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submission:', { name, email, message });
            
            // Show confirmation message
            showNotification('Message sent successfully!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #d4b08c;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.5s ease;
            z-index: 1000;
        }
        
        .notification.visible {
            transform: translateY(0);
            opacity: 1;
        }
        
        .color-circle.selected {
            transform: scale(1.2);
            box-shadow: 0 0 0 2px #d4b08c;
        }
    `;
    document.head.appendChild(style);
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add scrolled class styles
    const scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
        header.scrolled {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 0.95);
            padding: 15px 0;
        }
    `;
    document.head.appendChild(scrollStyle);
});
