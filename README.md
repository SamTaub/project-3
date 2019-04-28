![Beadli Logo](/client/public/assets/img/readme/beadlilogo.png)

# Beadli
> Make interesting designs with fuse beads.

Beadli is a web application that allows users to create, share, and browse pixel designs intended for fuse bead crafting.

## Getting Started

Create an account, or use our demo account!

Email: demo@bead.li

Password: beadlidemo

![Login Page](/client/public/assets/img/readme/beadlilogin.gif)

After logging in, you can click "Create" on the navbar to begin creating a design. Click on a color to paint on the canvas. Once you are happy with your design, you can save it and view it on your dashboard.

![Creating a Design](/client/public/assets/img/readme/beadlicreate.gif)

In addition to the color picker, the create page has other useful tools:

Eraser: Remove beads by clicking on them with the eraser tool selected.
3D: View your design in 3D to see what it would look like as beads on a pegboard.
Undo: Can undo your last 25 actions.
Trash: Clears the canvas, but is not undoable.

![Create Page Toolbar](/client/public/assets/img/readme/beadlicreatetoolbar.gif)

After saving your design, you can view details by clicking on it. This will show you how many beads you need for your design, as well as the title, description, difficulty, and category information. You can also add it to your favorites or share it to Facebook from this page.

![Design Detail Page](/client/public/assets/img/readme/beadlidesigndetail.gif)

Designs can be edited by clicking the "edit" button (the ruler and pencil icon). Your changes can be saved from the create page.

![Editing a Design](/client/public/assets/img/readme/beadliedit.gif)

Designs can be deleted from your drafts page by clicking the "trash" button.

![Deleting a Design](/client/public/assets/img/readme/beadlitrash.gif)

Click "Browse" on the navbar to see designs other users have made. You can narrow your browse results by category and difficulty, and sort them oldest to newest or vice versa.

![Browse Page](/client/public/assets/img/readme/beadlibrowse.gif)

You can add designs to your favorites by clicking the heart button. You can unfavorite a design by clicking the heart button again. Your favorites can be viewed from your dashboard page.

![Favoriting a Design](/client/public/assets/img/readme/beadlifavoriting.gif)

You can view all designs a specific user has made by clicking on their username from the design detail page.

![User Detail Page](/client/public/assets/img/readme/beadliuserdetail.gif)


## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Links

- Deployed: http://bead.li
- Repository: https://github.com/SamTaub/project-3

## Authors

- Chris Luber: http://chrisluber.com/
- Shelby Reyes: http://shelbyreyes.net/
- Kenny Whitebloom: http://kennywhitebloom.net/
- Sam Taub: https://www.samtaubweb.dev/

## Resources

- Bitmap.js: http://althenia.net/notes/js_bitmap