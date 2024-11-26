
# Next.js Role-Based Application

This is a **role-based management system** built with [Next.js](https://nextjs.org/). The application includes user authentication, role creation, and permissions management.

## How It Works

1. **User Authentication**:
   - user "/" for user side
   - Users can sign up and log in.
   - User data is stored in the database.

3. **Admin Dashboard**:
   - Accessible at `/admin` for admin users.
   - for Admin checking login using email:"abc@gmail.com" pass:"Abc@1234"
   - Features include:
     - Adding, editing, and deleting users.
     - Creating roles with specific permissions (read, edit, delete).
     - Assigning roles to users.

4. **Permissions**:
   - Roles define the actions a user can perform.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:AshuraMajestic/vrvtask.git
   cd <repository-name>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.
