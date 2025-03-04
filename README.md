# Spark

Spark is a modern Link Management application designed to help users create, manage, and share multiple links through a single customizable profile, similar to LinkTree.

## Features
- **Customizable Profiles** – Personalize your profile with links, images, and descriptions.
- **User Authentication** – Secure login/signup functionality.
- **Dynamic Link Management** – Add, edit, or remove links seamlessly.
- **Analytics Dashboard** – Gain insights into link clicks and user engagement.
- **Responsive Design** – Fully optimized for mobile and desktop.

## Tech Stack
- **Frontend**: React.js,  CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication

## Installation



### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone [https://github.com/yourusername/spark.git](https://github.com/kestsaurav21/Spark-LinkTree-Like-App.git)
   cd spark
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   

4. Start the development server:
   ```sh
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

## API Endpoints
| Method | Endpoint         | Description                |
|--------|----------------|----------------------------|
| POST   | /api/auth/signup | Register a new user       |
| POST   | /api/auth/login  | Authenticate user         |
| GET    | /api/links       | Retrieve user links       |
| POST   | /api/links       | Add a new link            |
| DELETE | /api/links/:id   | Remove a link             |

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, reach out via [your email] or open an issue in the repository.
