# Train Booking System 🚂

A modern, user-friendly train booking application built with **TypeScript**, **React**, **Vite**, and **Tailwind CSS**. This system allows users to search for trains, view available seats, and book tickets seamlessly.

## ✨ Features

- 🔍 **Train Search**: Search for available trains by route and date
- 🪑 **Seat Selection**: Interactive seat layout for easy selection
- 💳 **Booking Management**: Book and manage your train reservations
- 📱 **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- ⚡ **Fast Performance**: Built with Vite for optimal performance
- 🎨 **Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Post Processing**: PostCSS
- **Code Quality**: ESLint

## 🚀 Installation

### Prerequisites

- **Node.js**: Version 16 or higher
- **npm** or **yarn**: Package manager

### Steps

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Payal-mak/Train-Booking-System.git
   cd Train-Booking-System
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   - Navigate to `http://localhost:5173` (default Vite port)

## 💻 Usage

### Search for Trains
1. Enter your departure and arrival cities
2. Select your preferred date
3. Click "Search" to view available trains

### Book a Ticket
1. Select a train from the search results
2. Choose your preferred seats from the interactive seat map
3. Enter passenger details
4. Confirm and complete the booking

### Manage Bookings
- View all your confirmed bookings
- Cancel or modify existing reservations
- Download e-tickets

## ⚙️ Configuration

### Tailwind CSS
Customize the default Tailwind theme in `tailwind.config.js`:

\`\`\`javascript
export default {
  theme: {
    extend: {
      // Add custom colors, fonts, spacing, etc.
    },
  },
}
\`\`\`

### TypeScript
Configure TypeScript settings in `tsconfig.json` and `tsconfig.app.json` for strict type checking and optimal development experience.

### ESLint
The project uses ESLint for code quality. Run:
\`\`\`bash
npm run lint
\`\`\`

## 🔧 Development

### Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

### Development Workflow

1. Create a new branch for your feature
2. Make your changes
3. Ensure ESLint passes
4. Test your changes locally
5. Submit a pull request

## 🏗️ Building

To create an optimized production build:

\`\`\`bash
npm run build
\`\`\`

The build output will be generated in the `dist/` directory, ready for deployment.

To preview the production build locally:

\`\`\`bash
npm run preview
\`\`\`

## 👤 Author

**Payal Mak**  
GitHub: [@Payal-mak](https://github.com/Payal-mak)

