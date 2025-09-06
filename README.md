# 🚀 Activity Tracker - Advanced Task Management Application

A modern, feature-rich activity tracking application built with Vue 3, Pinia, and Tailwind CSS, following Material Design principles. This application demonstrates advanced frontend development skills with comprehensive task management capabilities.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [State Management](#-state-management)
- [API Documentation](#-api-documentation)
- [Key Features Deep Dive](#-key-features-deep-dive)
- [Development](#-development)
- [Build & Deployment](#-build--deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **✅ Add Activities**: Create new tasks with description, priority, and due date
- **🔄 Toggle Completion**: Mark tasks as completed or pending with visual feedback
- **✏️ Edit Activities**: Double-click to edit task text inline
- **🗑️ Delete Activities**: Remove individual tasks with confirmation modals
- **📊 Real-time Statistics**: Live count of total, pending, completed, high priority, and overdue tasks

### 🎨 Advanced Features
- **🏷️ Priority System**: High (🔴), Medium (🟡), Low (🟢) priority levels with visual indicators
- **📅 Due Date Management**: Optional due dates with overdue detection and warnings
- **🔍 Advanced Filtering**: Filter by priority, status, and search by text content
- **📱 Responsive Design**: Beautiful interface that works on all device sizes
- **💾 Persistent Storage**: All data automatically saved to localStorage
- **🎭 Material Design**: Consistent with Google's Material Design principles
- **♿ Accessibility**: Keyboard navigation, screen reader support, focus management

### 🚀 Smart Features
- **🔄 Auto-sorting**: Tasks automatically sorted by priority → status → due date
- **⚠️ Overdue Detection**: Visual warnings for overdue tasks with red highlighting
- **🎯 Smart Statistics**: Real-time counters with animated indicators for urgent items
- **🎨 Beautiful Modals**: Professional confirmation dialogs instead of browser alerts
- **⚡ Smooth Animations**: Slide-in animations for new tasks and smooth transitions

## 🛠️ Tech Stack

### Frontend Framework
- **Vue 3** - Progressive JavaScript framework with Composition API
- **Pinia** - Modern state management with Flux/Redux principles
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Material Design** - Google's design system for consistent UI
- **Custom Color Palette**:
  - Primary: `#1976D2` (Material Blue 700)
  - Secondary: `#FFC107` (Amber 500)
  - Accent: `#E91E63` (Pink 500)
  - Background: `#F5F5F5` (Gray 100)

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ES Modules** - Modern JavaScript module system

## 📱 Screenshots

### Desktop View
- Clean, modern interface with Material Design components
- Comprehensive filtering and search capabilities
- Real-time statistics in the top navigation bar
- Priority-based task organization

### Mobile View
- Fully responsive design
- Touch-friendly interface elements
- Collapsible statistics for smaller screens
- Optimized for mobile task management

## 🚀 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd activity-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage

### Adding Activities
1. Enter task description in the "Activity Description" field
2. Select priority level (Low 🟢, Medium 🟡, High 🔴)
3. Optionally set a due date
4. Click "Add Activity" or press Enter

### Managing Activities
- **Complete Task**: Click the checkbox to mark as completed
- **Edit Task**: Double-click on the task text to edit inline
- **Delete Task**: Click the delete button and confirm in the modal
- **View Details**: See priority, due date, and creation date on each task card

### Filtering & Search
- **Search**: Use the search bar to find tasks by text content
- **Filter by Priority**: Select specific priority levels
- **Filter by Status**: Show only pending or completed tasks
- **Clear Filters**: Remove all active filters with one click

### Bulk Actions
- **Clear Completed**: Remove all completed tasks at once
- **Clear All**: Remove all tasks (with confirmation)

## 📁 Project Structure

```
src/
├── components/
│   ├── AppBar.vue              # Top navigation with statistics
│   ├── ActivityCard.vue        # Individual task item with actions
│   ├── ActivityForm.vue        # Add new task form
│   ├── ActivityList.vue        # List of all tasks
│   ├── ConfirmationModal.vue   # Reusable confirmation dialog
│   └── FilterBar.vue           # Search and filtering controls
├── stores/
│   └── activityStore.js        # Pinia store for state management
├── App.vue                     # Main application component
├── main.js                     # Application entry point
└── style.css                   # Global styles and Tailwind imports

api.yaml                        # OpenAPI 3.0 API specification
README.md                       # Project documentation
package.json                    # Dependencies and scripts
tailwind.config.js              # Tailwind CSS configuration
postcss.config.js               # PostCSS configuration
vite.config.js                  # Vite build configuration
```

## 🗃️ State Management

### Pinia Store Structure
```javascript
// Store state
{
  activities: [
    {
      id: 1,
      text: "Complete project documentation",
      priority: "high",
      dueDate: "2024-01-20",
      completed: false,
      createdAt: "2024-01-15T10:30:00Z"
    }
  ],
  filters: {
    priority: "all",
    status: "all", 
    search: ""
  }
}
```

### Available Actions
- `addActivity(text, priority, dueDate)` - Add new task
- `toggleActivity(id)` - Toggle completion status
- `deleteActivity(id)` - Delete specific task
- `updateActivity(id, newText)` - Update task text
- `clearCompleted()` - Remove all completed tasks
- `clearAll()` - Remove all tasks
- `setPriorityFilter(priority)` - Filter by priority
- `setStatusFilter(status)` - Filter by status
- `setSearchFilter(search)` - Search by text
- `clearFilters()` - Reset all filters

### Smart Sorting Logic
Tasks are automatically sorted by:
1. **Priority** (High → Medium → Low)
2. **Completion Status** (Pending → Completed)
3. **Due Date** (Earliest first)

## 📚 API Documentation

The project includes a comprehensive **OpenAPI 3.0 specification** (`api.yaml`) that defines the REST API endpoints:

### Endpoints
- `GET /activities` - List all activities with filtering and sorting
- `POST /activities` - Create a new activity
- `GET /activities/{id}` - Get a specific activity
- `PATCH /activities/{id}` - Update an activity
- `DELETE /activities/{id}` - Delete an activity
- `DELETE /activities/clear-completed` - Clear all completed activities

### Query Parameters
- `search` - Search activities by text content
- `priority` - Filter by priority (all, low, medium, high)
- `status` - Filter by status (all, pending, completed)
- `limit` - Maximum number of results (1-100)
- `offset` - Number of results to skip

### Data Model
```yaml
Activity:
  id: integer          # Unique identifier
  text: string         # Task description
  priority: string     # low, medium, high
  dueDate: date        # Optional due date
  completed: boolean   # Completion status
  createdAt: datetime  # Creation timestamp
```

## 🔍 Key Features Deep Dive

### Priority System
- **Visual Indicators**: Color-coded badges (🔴🟡🟢) for easy identification
- **Smart Sorting**: High priority tasks appear first in the list
- **Statistics**: Real-time count of high priority pending tasks

### Due Date Management
- **Date Picker**: User-friendly date selection interface
- **Overdue Detection**: Automatic detection of overdue tasks
- **Visual Warnings**: Red highlighting and warning icons for overdue items
- **Smart Formatting**: "Today", "Tomorrow", "In X days" display

### Advanced Filtering
- **Real-time Search**: Instant filtering as you type
- **Multi-criteria Filtering**: Combine search, priority, and status filters
- **Active Filter Display**: Visual chips showing current filters
- **One-click Clear**: Easy filter reset functionality

### Responsive Design
- **Mobile-first Approach**: Optimized for mobile devices
- **Adaptive Layout**: Different layouts for different screen sizes
- **Touch-friendly**: Large touch targets for mobile interaction
- **Collapsible Elements**: Statistics collapse on smaller screens

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Sufficient color contrast for readability

## 🛠️ Development

### Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for linting errors
npm run lint
```

### Development Features
- **Hot Module Replacement**: Instant updates during development
- **ES Modules**: Modern JavaScript module system
- **TypeScript Ready**: Easy to add TypeScript support
- **Component-based Architecture**: Reusable, maintainable components

### Code Quality
- **Clean Architecture**: Well-structured, maintainable codebase
- **Error Handling**: Comprehensive error handling throughout
- **Performance Optimized**: Efficient state management and rendering
- **Documentation**: Extensive inline comments and documentation

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Optimized assets
- Tree-shaking for smaller bundle size
- Modern ES modules for better performance

### Deployment Options
- **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
- **CDN**: Use with any CDN for global distribution
- **Docker**: Containerize for consistent deployment
- **Traditional Hosting**: Upload to any web server

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow Vue 3 Composition API best practices
- Use Tailwind CSS for styling
- Maintain Material Design principles
- Write clean, documented code
- Test on multiple devices and browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vue.js Team** - For the amazing progressive framework
- **Pinia Team** - For excellent state management solution
- **Tailwind CSS** - For the utility-first CSS approach
- **Material Design** - For the comprehensive design system
- **Vite Team** - For the fast build tool and dev server

## 📞 Support

For support, email support@activitytracker.com or create an issue in the repository.

---

**Built with ❤️ for modern task management**