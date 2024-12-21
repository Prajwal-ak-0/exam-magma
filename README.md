# Exam-magma

## Overview

Exam-magma is a robust web-based coding lab evaluation system developed for MS RIT. It streamlines the processes of exam administration, proctoring, evaluation, and student tracking, enhancing efficiency and ensuring fairness in assessments.

## Features

- **Integrated Code Editor**: Provides a seamless coding experience within the browser, supporting multiple programming languages including C, C++, Python, Java, and SQL.
  
- **Automated Grading**: Utilizes dynamic test case generation and automated code verification to deliver timely and accurate feedback.
  
- **Plagiarism Detection**: Implements copy-paste detection mechanisms to maintain academic integrity across student submissions.
  
- **Scalable Infrastructure**: Designed to handle large-scale evaluations with ease, reducing the manual workload on instructors.

## Technologies Used

- **Next.js**: Framework for building the frontend and backend of the application.
  
- **TypeScript**: Adds static typing to JavaScript, enhancing code reliability and maintainability.
  
- **Prisma**: An ORM for efficient and type-safe database interactions.
  
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
  
- **Docker**: Containerization platform to ensure consistent and scalable deployments.
  
- **OpenAI API**: Integrated for generating dynamic test cases to evaluate student code effectively.

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **Docker**
- **Git**

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/whackiest-2024.git
    cd whackiest-2024
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the following variables:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    DATABASE_URL=your_database_url
    ```

4. **Set Up the Database**

    ```bash
    npx prisma migrate deploy
    ```

5. **Run the Development Server**

    ```bash
    npm run dev
    ```

6. **Access the Application**

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
