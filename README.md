## Welcome to NextJS with CMS!

This is a powerful framework built on top of NextJS that combines the benefits of a robust frontend library with a customizable content management system (CMS).

Using NextJS as a foundation allows for a fast and efficient frontend experience, while the CMS functionality allows for easy content management and updates.

To get started, simply run npm install to install the necessary dependencies. Then, create a .env.local file in the root directory to connect to your MongoDB instance using your connection string like so:

- MONGO_URI=mongodb+srv://<username>:<password>@cluster0.something.mongodb.net/next_stcms?retryWrites=true&w=majority
- login_key=login_key

Login key is the login key for editing.

You can then customize your configuration by editing the config.tsx file in the src/appConstants directory. This will allow you to adjust the port number and other settings to fit your needs.

Finally, run npm run dev to start your development server and begin building your NextJS app with CMS capabilities.

We'll be releasing a tutorial soon to help guide you through the process and get you up and running quickly. Enjoy!
