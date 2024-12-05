# **Personal Blog Application**

Welcome to my **Personal Blog Application**, a simple full-stack blog built with React, Express, and SQLite. This project allows authenticated users (admins) to create, update, and delete blog posts while letting public users read posts and view details.

---

## **Features**
- **Public Access**:
  - View all blog posts.
  - Read individual post details.
- **Admin Access**:
  - Create new posts.
  - Edit existing posts.
  - Delete posts.
- **Authentication**:
  - Secure login for admin functionality.
  - JWT-based token validation.

---

## **Technologies Used**

### **Frontend**
- **React**: A modern JavaScript library for building user interfaces.
- **TailwindCSS**: For responsive and attractive styling.
- **React Router**: To manage navigation and routing.

### **Backend**
- **Express.js**: Lightweight Node.js web framework.
- **SQLite**: A lightweight SQL database for data storage.
- **JWT (JSON Web Tokens)**: For secure authentication.

### **Other Tools**
- **Node.js**: JavaScript runtime environment.
- **Bcrypt**: For hashing passwords.
- **Cors**: To enable secure cross-origin requests.

---

## **Installation and Setup**

### **Clone the Repository**
```bash
git clone https://github.com/vikernes1981/FullStackBlog.git
cd FullStackBlog

Backend Setup

    Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Set up the SQLite database:

    Ensure blog.db exists in the backend directory. It will be initialized automatically if not present.

Start the backend server:

    node server.js

    By default, the backend runs on http://localhost:3000.

Frontend Setup

    Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the React app:

    npm run start

    By default, the frontend runs on http://localhost:5173.

Usage

## **User Registration and Login Instructions**

### **Step 1: Register**
To register as a user, follow these steps:
1. Navigate to `http://localhost/login`.
2. Click on the "Register" button to create a new account.
3. Fill in your details (e.g., email and password) to complete the registration process.

### **Step 2: Login**
Once registered, return to `http://localhost/login` and use your credentials to log in.

---

### **Important Note**
After you register your desired users, **remove the registration feature from the code** to disable further registrations. This ensures that only the intended users can access the admin functionalities of the blog.

To remove registration:
- Delete or comment out the `/signup` route in your `App.jsx`.
- Optionally, remove the `SignUpPage` component entirely.

For example, in `App.jsx`:
```javascript
<Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/entries/:id" element={<PostDetailsPage />} />
    <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />

    {/* Remove or comment out this line */}
    {/* <Route path="/signup" element={<SignUpPage />} /> */}
  </Routes>
</Router>

Future Enhancements

    Enhanced Security:
        Implement rate-limiting and CAPTCHAs for login.
        Add multi-factor authentication (MFA).
    Rich Text Editor for creating posts.
    Search and Filter features for blog entries.
    Comment System for user engagement.

License

This project is licensed under the MIT License. Feel free to use and modify it.
Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.
Acknowledgments

    React and Express communities for their amazing tools and documentation.
    SQLite for being an easy-to-use, lightweight database.
