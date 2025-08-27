# 🐕 Dachsbook

The ultimate dachshund cuteness competition! Vote for your favorite wiener dogs in head-to-head matchups and see which dachshunds rise to the top of our community rankings.

## 🚀 Features

- **🐕 Dachshund Voting**: Head-to-head photo competitions with ELO-style rating system
- **🏆 Live Rankings**: Real-time leaderboard based on community votes
- **🔐 Authentication**: Secure Google OAuth integration for voting
- **⚙️ Admin Panel**: Import and manage dachshund data
- **🤖 AI Chat**: Optional AI-powered chat functionality
- **📱 Responsive**: Beautiful mobile-first design

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with Google OAuth
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: Vercel AI SDK with OpenAI support

## 📋 Prerequisites

- **Node.js**: Version 18.0 or higher
- **Git**: For cloning the repository
- **PostgreSQL**: Local installation or hosted service (Vercel Postgres recommended)

## 🛠️ Quick Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd dachsbook
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp env.example .env
```

Fill in your environment variables in the `.env` file:

```env
# Database
POSTGRES_URL="postgresql://username:password@localhost:5432/dachsbook"

# Authentication - Better Auth
BETTER_AUTH_SECRET="your-random-32-character-secret-key-here"

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Integration (Optional - for chat functionality)
OPENAI_API_KEY="sk-your-openai-api-key-here"
OPENAI_MODEL="gpt-4"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

Generate and run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 5. Start the Development Server

```bash
npm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── vote/          # Voting submission endpoint
│   │   ├── rankings/      # Rankings data endpoint
│   │   ├── dachshunds/    # Dachshund data endpoints
│   │   └── admin/         # Admin management endpoints
│   ├── vote/              # Voting interface page
│   ├── rankings/          # Leaderboard page
│   ├── admin/             # Admin panel
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── auth/             # Authentication components
│   └── ui/               # shadcn/ui components
└── lib/                  # Utilities and configurations
    ├── schema.ts         # Database schema (dachshunds, votes, users)
    ├── auth.ts           # Better Auth configuration
    └── db.ts             # Database connection
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production (includes db:migrate)
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio (database GUI)
npm run db:reset     # Reset database (drop all tables)
```

## 📖 How It Works

### ELO Rating System
Dachsbook uses an ELO rating system similar to chess rankings:
- All dachshunds start with a rating of 1000
- Winners gain points, losers lose points
- The amount gained/lost depends on the rating difference between competitors
- Higher-rated dogs have more to lose and less to gain when facing lower-rated opponents

### Pages Overview

- **Home (`/`)**: Landing page with voting call-to-action and how-it-works guide
- **Vote (`/vote`)**: Main voting interface showing random dachshund pairs
- **Rankings (`/rankings`)**: Live leaderboard showing top-rated dachshunds
- **Admin (`/admin`)**: Protected admin panel for importing and managing dachshund data

## ⚙️ Service Configuration

### PostgreSQL Database on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the **Storage** tab
3. Click **Create** → **Postgres**
4. Choose your database name and region
5. Copy the `POSTGRES_URL` from the `.env.local` tab
6. Add it to your `.env` file

### Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
4. Set application type to **Web application**
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the **Client ID** and **Client Secret** to your `.env` file

### OpenAI API Key (Optional)

1. Go to [OpenAI Platform](https://platform.openai.com/dashboard)
2. Navigate to **API Keys** in the sidebar
3. Click **Create new secret key**
4. Give it a name and copy the key
5. Add it to your `.env` file as `OPENAI_API_KEY`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Install the Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. Deploy your application:

   ```bash
   vercel --prod
   ```

3. Follow the prompts to configure your deployment
4. Add your environment variables when prompted or via the Vercel dashboard

### Production Environment Variables

Ensure these are set in your production environment:

- `POSTGRES_URL` - Production PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secure random 32+ character string
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `OPENAI_MODEL` - OpenAI model name (optional, defaults to gpt-4)
- `NEXT_PUBLIC_APP_URL` - Your production domain

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy voting! 🐕❤️**