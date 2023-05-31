# gallery.io


galleryio is an image repository where users can upload image's pictures securely, delete their pictures, view the uploaded pictures (ordered by most recent uploads), view a user's uploads, view your profile (logged in user's profile) & uploads, leave comments or ratings on pictures.
> *PS:* To view the website you need to log in to the system. You could use the demo credentials to login: username: demogalleryio@gmail.com, password: passw0rd, or register! :)
    

> *PPS:* Please excuse the quality of the videos, something must have gone wrong in the video conversion process :/

--- 

## Technologies Used:

* MongoDB
* Express
* React
* Node


## View  Images

- Only logged in users can view images
![View All](./assets/feed.png)

- View pictures uploaded by a user
![User Feed](./assets/userpicture.png)

- View profile (images uploaded by the logged in user)
![View Profile](./assets/profilefeed.png)

- View A Specific Image along with it's comments & ratings
![View Profile](./assets/imageview.png)

- **Search** for images by tags.
![Search](./assets/searchresults.png)

- Pagination implemented to limit the number of results per page to ten. This limit can be changed in the query if needed.
![Pagination](./assets/paginationDemo.gif)

## Upload Image

- **Secure** image upload to the file directory
![Upload image](./assets/upload.gif)

- File type validated before upload for security reasons.
- Image size can be a maximum of 5MB.
- Image has description & tags.

## Delete

- Image Deletion
![Delete](./assets/delete.gif)
- Images can only be deleted by the creator of the image


## Comments / Reviews

- Users can not leave ratings/comments on their own image.
- Aggregate all ratings on a picture to get total rating.
- Filter out vulgar language in the comments.


## Login, Security Features

- Login

    ![Login](./assets/login.gif)

- Register
- Logout
- Auth using JWT and Cookies

## Developer Usage

1. Clone this project from github.
2. Run this command in the project terminal to install all the dependencies:
    ```
    npm install
    ```
3. Navigate to db/config, create a config.env file, copy the below code into the file and add your own values to these varaibles (fill it out basically):
    ```
    PORT = 
    MONGO_URI = 
    JWT_SECRET_TOKEN = 
    JWT_EXPIRES_IN = 
    COOKIE_EXPIRES_IN = 
    IMAGE_UPLOAD_PATH = 
    IMAGE_MAX_SIZE = 
    IMAGE_PATH = 
    ```
4. Start the backend server by running the following command in the project terminal.
    ```
    npm run dev
    ```

5. Navigate to the client folder by running `cd client` in the project terminal. Run the following command: 
    ```
    npm start
    ```
6. Go to your favourite broswer (please don't tell me it's internet explorer xD) and go to http://localhost:3000 to use the project.

7. Enjoy! :)
