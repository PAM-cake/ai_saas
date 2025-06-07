# AI Learning Companion SaaS

An interactive learning platform that creates personalized AI companions for educational purposes. The platform allows users to create, manage, and interact with AI companions for various subjects and topics.

## 🚀 Features

- **Personalized AI Companions**: Create custom learning companions with specific subjects, topics, and personalities
- **Voice Interaction**: Real-time voice conversations with AI companions
- **Subject-Based Learning**: Support for multiple subjects with visual indicators
- **Session Management**: Track learning sessions and progress
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Authentication**: Secure user authentication using Clerk
- **Modern UI**: Built with Tailwind CSS and Radix UI components

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Clerk
- **Voice API**: Vapi SDK
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **Animation**: Lottie for animations
- **Icons**: Lucide Icons

## 📦 Dependencies

```json
{
  "dependencies": {
    "@clerk/nextjs": "^4.29.7",
    "@hookform/resolvers": "^3.3.4",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "lottie-react": "^2.4.0",
    "lucide-react": "^0.331.0",
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.50.1",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4"
  }
}
```

## 🏗️ Project Structure

```
ai_saas/
├── app/                    # Next.js app directory
│   ├── companions/        # Companion-related pages
│   │   ├── [id]/         # Individual companion pages
│   │   ├── new/          # New companion creation
│   │   └── page.tsx      # Companions library
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── CompanionCard.tsx
│   ├── CompanionForm.tsx
│   ├── CompanionList.tsx
│   └── ...
├── lib/                  # Utility functions and actions
│   ├── actions/         # Server actions
│   ├── utils.ts         # Helper functions
│   └── vapi.sdk.ts      # Voice API integration
├── public/              # Static assets
│   ├── icons/          # SVG icons
│   └── images/         # Images
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

## 🎯 Core Components

### Companion Components
- **CompanionCard**: Displays individual companion information with actions
- **CompanionForm**: Form for creating and editing companions
- **CompanionList**: Table view of companions with filtering
- **CompanionComponent**: Interactive learning session interface

### UI Components
- **Button**: Versatile button with multiple variants
- **Input**: Customizable text input
- **Select**: Dropdown selection component
- **Table**: Data display component
- **Accordion**: Collapsible content sections

### Navigation
- **Navbar**: Main navigation with authentication
- **NavItems**: Navigation menu items

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd ai_saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   VAPI_API_KEY=your_vapi_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🔑 Key Features Implementation

### Authentication
- Uses Clerk for secure authentication
- Protected routes with middleware
- User profile management

### Companion Creation
- Form validation with Zod
- Subject and topic selection
- Voice and style customization
- Duration settings

### Learning Sessions
- Real-time voice interaction
- Speech visualization
- Session history tracking
- Microphone controls

### UI/UX
- Responsive design
- Smooth animations
- Accessible components
- Consistent styling with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Clerk](https://clerk.com/)
- [Vapi](https://vapi.ai/)