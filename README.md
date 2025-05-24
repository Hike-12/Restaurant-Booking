# Restaurant Booking System - The Coffee Cup

## Project Abstract

The Coffee Cup Restaurant Booking System is a comprehensive web application that revolutionizes the dining experience through digital innovation. This platform enables customers to explore menus, book exclusive themed dining events, reserve tables, and interact with an AI-powered chatbot for personalized assistance. The system features a robust event management system with queue handling, real-time table booking with visual layouts, QR code generation for events, chef profiles, customer reviews, and a virtual reality tour experience. Built with modern web technologies, it provides seamless user authentication, responsive design, and optimized image loading for an exceptional user experience across all devices.

## Domain and Tools Used

- **Domain:** Full-Stack Web Application Development for Restaurant Management & Booking
- **Languages and Frameworks:**
  - **Frontend:** React.js, Vite, TailwindCSS, Framer Motion
  - **Backend:** Django
  - **Database:** SQLite (Development)
  - **AI Integration:** Google Generative AI (Gemini)
- **Tools & Technologies:**
  - **Version Control:** GitHub
  - **Development Environment:** VS Code
  - **Deployment:** Render (Backend), Vercel (Frontend)
  - **Styling:** TailwindCSS with custom color palette
  - **Animations:** Framer Motion
  - **Image Optimization:** Custom service worker with caching
  - **Authentication:** Django Sessions
  - **UI Components:** Lucide React Icons
  - **Notifications:** React Toastify

## Key Features

### 🍽️ **Menu Management**
- Dynamic menu display with images, descriptions, and pricing
- Calorie information and detailed item descriptions
- Optimized image loading with caching

### 📅 **Event Management**
- Themed dining event creation and management
- Real-time booking system with queue management
- QR code generation for event check-ins
- Event schedule management with date/time slots

### 🪑 **Table Booking System**
- Interactive visual table layout
- Real-time availability checking
- 45-minute interval time slots
- Multi-table selection capability

### 👨‍🍳 **Chef Profiles**
- Chef showcase with specialties and availability
- Professional chef image gallery
- Cuisine expertise display

### 🤖 **AI-Powered Chatbot**
- Google Gemini AI integration
- Restaurant-specific query handling
- Real-time customer support

### ⭐ **Review System**
- Customer review submission
- Rating system with star display
- Review management and display

### 🔐 **User Authentication**
- Secure user registration and login
- Session-based authentication
- User-specific event tracking

### 📱 **Responsive Design**
- Mobile-first responsive layout
- Cross-browser compatibility
- Progressive Web App features

### 🎮 **Virtual Reality Tour**
- Immersive restaurant tour experience
- Interactive VR scene exploration

## Project Structure

```
Restaurant Booking System/
├── Backend/
│   └── web/
│       ├── home/                 # Main Django app
│       │   ├── models.py        # Database models
│       │   ├── views.py         # API endpoints
│       │   ├── urls.py          # URL routing
│       │   └── migrations/      # Database migrations
│       ├── web/                 # Django project settings
│       ├── media/               # Uploaded images
│       ├── requirements.txt     # Python dependencies
│       └── manage.py           # Django management
│
└── Frontend/
    └── web/
        ├── src/
        │   ├── components/      # React components
        │   ├── hooks/          # Custom React hooks
        │   ├── config/         # Configuration files
        │   └── App.jsx         # Main app component
        ├── public/             # Static assets
        ├── package.json        # Node dependencies
        └── tailwind.config.js  # Tailwind configuration
```

## API Endpoints

### Authentication
- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout

### Menu & Events
- `GET /api/menus/` - Fetch menu items
- `GET /api/events/` - Fetch events
- `GET /api/event-schedules/` - Fetch event schedules
- `POST /api/events/{id}/register/` - Register for event

### Bookings
- `GET /api/table-bookings/` - Fetch table availability
- `POST /api/book-table/` - Book a table
- `GET /api/user-registered-events/` - User's events

### Other Features
- `GET /api/chefs/` - Fetch chef profiles
- `GET /api/reviews/` - Fetch reviews
- `POST /api/add-review/` - Add review
- `POST /api/chatbot/` - AI chatbot interaction

## Installation & Setup

### Backend Setup
```bash
cd Backend/web
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd Frontend/web
npm install
npm run dev
```

### Environment Variables
```bash
# Backend (.env)
GOOGLE_API_KEY=your_google_api_key
SECRET_KEY=your_django_secret_key
DEBUG=True
ENVIRONMENT=development

# Frontend (.env)
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Deployment

- **Backend:** Deployed on Render with SQLite database
- **Frontend:** Deployed on Vercel with optimized build
- **Live URLs:**
  - Frontend: https://coffee-cup-gamma.vercel.app
  - Backend API: https://restraunt-booking.onrender.com/api

## Technologies Deep Dive

### Frontend Architecture
- **React 18** with functional components and hooks
- **Vite** for fast development and optimized builds
- **TailwindCSS** with custom design system
- **Framer Motion** for smooth animations
- **Service Worker** for image caching and offline support

### Backend Architecture
- **Django** with class-based and function-based views
- **SQLite** for development, **PostgreSQL** ready for production
- **Django CORS** for cross-origin requests
- **WhiteNoise** for static file serving
- **Custom middleware** for JSON authentication

### Design System
- **Custom Color Palette:** Sand, Beige, Olive, Dark Brown
- **Typography:** Custom font weights and spacing
- **Component Library:** Reusable UI components
- **Responsive Breakpoints:** Mobile-first approach

## Future Enhancements

- [ ] Mobile app development with React Native
- [ ] Real-time notifications with WebSockets
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Push notifications for mobile
- [ ] Social media integration
- [ ] Loyalty program features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is developed as part of an academic project and is intended for educational purposes.

---

**The Coffee Cup Restaurant Booking System** - Enhancing dining experiences through digital innovation.
