# Vision Studio

A modern, full-stack computer vision platform for training and deploying AI models. Vision Studio provides an intuitive interface for managing datasets, annotating images, training models, and evaluating their performance.

## Core Features

### 🖼️ Dataset Management
- Intuitive drag-and-drop image upload
- Bulk import capabilities
- Smart dataset organization
- Advanced filtering and search
- Automated metadata extraction

### 🏷️ Annotation Workspace
- Powerful annotation tools
- AI-assisted labeling
- Real-time collaboration
- Version control for annotations
- Custom label hierarchies

### 🤖 Model Training
- State-of-the-art architectures
- Advanced hyperparameter tuning
- Real-time training insights
- Automated data augmentation
- Transfer learning support

### 📊 Evaluation & Analytics
- Comprehensive performance metrics
- Interactive confusion matrices
- Cross-validation analysis
- Batch inference testing
- Custom report generation

## Technology

- **Frontend**: Next.js 14 with TypeScript
- **UI**: Tailwind CSS, Shadcn UI, Radix UI
- **Visualization**: Recharts
- **Validation**: React Hook Form + Zod
- **File Handling**: React Dropzone

## Getting Started

### Requirements
- Node.js 18.17+
- pnpm 8+

### Setup

1. Clone Vision Studio:
```bash
git clone [repository-url]
cd vision-studio
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication routes
│   ├── dashboard/           # Main dashboard
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # Reusable components
│   ├── dashboard/          # Dashboard-specific components
│   ├── layout/             # Layout components
│   ├── ui/                 # Shadcn UI components
│   ├── back-button.tsx     # Navigation component
│   ├── breadcrumbs.tsx     # Navigation breadcrumbs
│   ├── client-layout.tsx   # Client-side layout wrapper
│   ├── confusion-matrix.tsx # ML evaluation component
│   ├── page-transition.tsx # Page transition animations
│   ├── theme-provider.tsx  # Dark/light mode provider
│   ├── theme-toggle.tsx    # Theme switcher
│   └── user-nav.tsx        # User navigation
├── lib/                    # Utility functions
├── public/                 # Static assets
├── styles/                 # Additional styles
├── .env.example           # Environment variables template
├── components.json        # Shadcn UI config
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Workflow

1. **Dataset Creation**
   - Upload images individually or in bulk
   - Organize into collections
   - Apply metadata and tags

2. **Image Annotation**
   - Create custom label sets
   - Use AI-assisted labeling
   - Review and validate annotations

3. **Model Development**
   - Configure training parameters
   - Monitor training progress
   - Track experiments

4. **Deployment & Testing**
   - Evaluate model metrics
   - Run batch predictions
   - Export trained models

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

Vision Studio is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for details.
