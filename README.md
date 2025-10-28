# Church Website Customer Information Form

A comprehensive web application built by **Divalaser Software Solutions** to collect detailed customer information for church website creation projects. The application features full bilingual support (English/French) and a secure admin dashboard for managing submissions.

## Features

### 🌍 Bilingual Support
- Complete English and French translations
- Easy language switching with persistent preference
- All pages and forms fully translated

### 📋 Comprehensive Form
- Church basic information (name, denomination, address, contact)
- Primary contact person details
- Church details (mission, vision, statement of faith, history)
- Service times and ministries offered
- Website requirements and desired features
- Budget and timeline preferences
- Additional notes and special requirements

### 🔐 Secure Admin Dashboard
- PIN-protected access (PIN: 3495)
- OAuth authentication via Manus
- View all customer submissions
- Update submission status (Pending, In Progress, Completed, Cancelled)
- Soft delete with trash management
- Restore or permanently delete submissions

### 📧 Email Notifications
- Automatic owner notification on new submissions
- Real-time alerts for form submissions

### 🎨 Professional Design
- Black header with yellow branding
- University of Phoenix and Georgia Tech logos
- Blue sky gradient background
- Mobile-responsive design
- Clean, modern UI with shadcn/ui components

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4
- **Backend:** Express 4, tRPC 11
- **Database:** MySQL/TiDB with Drizzle ORM
- **Authentication:** Manus OAuth
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS with custom theming

## Getting Started

### Prerequisites
- Node.js 22.13.0 or higher
- pnpm package manager
- MySQL/TiDB database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bertintshisuaka2/church-website-form.git
cd church-website-form
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file with the following variables (these are auto-injected in the Manus platform):
```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=oauth_server_url
VITE_OAUTH_PORTAL_URL=oauth_portal_url
OWNER_OPEN_ID=owner_open_id
OWNER_NAME=owner_name
BUILT_IN_FORGE_API_URL=api_url
BUILT_IN_FORGE_API_KEY=api_key
```

4. Push database schema:
```bash
pnpm db:push
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
church-website-form/
├── client/                 # Frontend React application
│   ├── public/            # Static assets (logos, images)
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── contexts/      # React contexts (Language, Theme)
│       ├── pages/         # Page components
│       ├── translations/  # English and French translations
│       └── lib/           # tRPC client setup
├── server/                # Backend Express + tRPC
│   ├── db.ts             # Database query helpers
│   ├── routers.ts        # tRPC procedures
│   └── _core/            # Core framework files
├── drizzle/              # Database schema and migrations
│   └── schema.ts         # Database tables definition
└── shared/               # Shared constants and types
```

## Usage

### For Customers

1. Visit the home page
2. Click "Get Started - Request Your Website"
3. Fill out the comprehensive form with church information
4. Submit the form
5. Receive confirmation and next steps

### For Administrators

1. Click "Admin Login" in the header
2. Log in with your Manus account
3. Enter PIN: **3495**
4. View and manage all submissions
5. Update submission status
6. Delete or restore submissions from trash

### Language Switching

Click the **FR** button in the top-right corner to switch between English and French. Your language preference is automatically saved.

## Database Schema

### Users Table
- OAuth-based user authentication
- Role-based access control (admin/user)
- Automatic admin assignment for project owner

### Church Submissions Table
- Comprehensive church information
- Contact details
- Website requirements
- Budget and timeline
- Soft delete support (deletedAt field)
- Status tracking

## API Endpoints

All API endpoints are handled through tRPC:

- `auth.me` - Get current user
- `auth.logout` - Logout user
- `submissions.create` - Create new submission
- `submissions.getAll` - Get all active submissions (admin only)
- `submissions.updateStatus` - Update submission status (admin only)
- `submissions.softDelete` - Move submission to trash (admin only)
- `submissions.getTrashed` - Get trashed submissions (admin only)
- `submissions.restore` - Restore from trash (admin only)
- `submissions.permanentDelete` - Permanently delete (admin only)
- `system.notifyOwner` - Send notification to owner

## Environment

The application is designed to run on the Manus platform with automatic environment variable injection. For local development, ensure all required environment variables are properly configured.

## Contributing

This is a proprietary project for Divalaser Software Solutions. For any questions or support, please contact the development team.

## License

© 2025 Divalaser Software Solutions. All rights reserved.

## Biblical Foundation

> **Matthew 24:14 (NKJV)**  
> "And this gospel of the kingdom will be preached in all the world as a witness to all the nations, and then the end will come."

This application is built to help churches reach the ends of the earth through their digital presence.

## Support

For technical support or questions about this application, please contact Divalaser Software Solutions.

---

**Built with ❤️ by Divalaser Software Solutions**

