# RIT CodeLab 🚀

## Overview 🌟

RIT CodeLab is a sophisticated web-based coding evaluation platform developed for RIT. It provides a secure, scalable, and efficient environment for conducting programming assessments, managing student submissions, and automated code evaluation through AI-powered test case generation.

## Key Features 🎯

### Core Functionality 💻
- **Real-time Code Execution**: Containerized code execution environment using Docker for secure and isolated runtime
- **Integrated Development Environment**: Browser-based code editor with syntax highlighting and auto-completion
- **Multi-language Support**: Supports C, C++, Python, Java, and SQL with language-specific compilation and execution
- **Automated Assessment**: AI-powered test case generation and validation using OpenAI's structured outputs

### Security & Monitoring 🛡️
- **Plagiarism Detection**: Advanced copy-paste detection and code similarity analysis
- **Secure Runtime**: Sandboxed execution environment with resource limitations and security constraints
- **Proctor Dashboard**: Real-time monitoring of student activities and system resources
- **IP Address Tracking**: Monitor and control access based on geographical location

### Administrative Features ⚙️
- **User Management**: Comprehensive admin interface for managing students and faculty
- **Performance Analytics**: Detailed insights into student performance and submission patterns
- **Batch Operations**: Bulk user import and result export capabilities
- **Custom Test Cases**: Support for both AI-generated and manually created test cases

## Technical Architecture 🏗️

### Frontend 🎨
- **Framework**: Next.js 14 with App Router for server-side rendering
- **Styling**: Tailwind CSS with custom theming support
- **State Management**: React Context API and custom hooks
- **UI Components**: Shadcn UI components with dark/light mode support

### Backend 🔧
- **API Routes**: Next.js API routes with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with role-based access control
- **File Storage**: Local storage with proper file system organization

### AI Integration 🤖
- **Test Case Generation**: OpenAI API integration for dynamic test case creation
- **Code Analysis**: Structured output format for consistent test case validation
- **Performance Optimization**: Caching and batch processing of AI requests

## Upcoming Features 🔜

### Security Enhancements 🔒
1. **Advanced Copy-Paste Detection**
   - Real-time monitoring of clipboard actions
   - Pattern matching for code similarity
   - Integration with plagiarism databases

2. **External URL Visit Detection**
   - Track browser tab switches
   - Monitor external domain access
   - Alert system for suspicious activity

3. **IP Address Tracking**
   - Geolocation tracking
   - Device fingerprinting
   - Session management with IP binding

## Directory Structure 📁

```
RIT-CodeLab/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel routes
│   ├── api/               # API routes
│   ├── auth/              # Authentication routes
│   ├── exam/              # Exam interface
│   └── problems/          # Problem management
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── docker/               # Docker configuration files
```

## Installation and Setup ⚡

### Prerequisites 📋
- Node.js v18 or later
- Docker and Docker Compose
- PostgreSQL database
- OpenAI API key

### Development Setup 🛠️

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/yourusername/rit-codelab.git
   cd rit-codelab
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/codelab"
   NEXTAUTH_SECRET="your-secret-key"
   OPENAI_API_KEY="your-openai-api-key"
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Docker Deployment 🐳

1. **Build Docker Image**
   ```bash
   docker build -t rit-codelab .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

## Code Execution Flow ⚡

1. **Submission Process**
   - Student submits code through the web interface
   - Code is validated and stored in the database
   - Docker container is prepared for execution

2. **Test Case Generation**
   - OpenAI API generates test cases based on problem requirements
   - Test cases are validated and stored
   - Multiple test scenarios are created for comprehensive testing

3. **Execution and Evaluation**
   - Code is executed in isolated Docker container
   - Resource limits are enforced (CPU, memory, time)
   - Results are compared with expected outputs
   - Detailed feedback is generated for students

## Contributing 🤝

We welcome contributions to RIT CodeLab! Here's how you can help:

### Areas for Contribution 🎯
1. **Security Features**
   - Implement advanced copy-paste detection
   - Develop external URL visit monitoring
   - Enhance IP address tracking system

2. **UI/UX Improvements**
   - Dark/light theme enhancements
   - Accessibility features
   - Mobile responsiveness

3. **Performance Optimization**
   - Code execution speed
   - Test case generation efficiency
   - Database query optimization

### How to Contribute 📝
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
