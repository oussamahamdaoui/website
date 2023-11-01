# Juno Website

## App Assets Guide
To learn how to prepare your assets for the Juno website, see the [App Assets Guide](https://www.figma.com/community/file/1285579551089973016/Juno-App-Assets-Guide).

## How To Submit Your Project To The Ecosystem Page

Submit a pull request to add your project to the Juno ecosystem page.

You need to edit `ecosystem.json` in `assets/json/` and add your project's info.

Example:
```
{
  "id": "70a0794d-347e-4292-a782-2d12557c83c5";
  "icon": "main-icon.png",
  "backgroundImage: "background-image-test-project.jpg",
  "coverImage": "cover-image-test-project.jpg",
  "appPreviews": [
    "app-previews/MY_PROJECT/app-preview-1.jpg",
    "app-previews/MY_PROJECT/app-preview-2.jpg",
    "app-previews/MY_PROJECT/app-preview-3.jpg"
  ],
  "appLinks": {
    "chrome": "https://testproject.testproject",
    "firefox": "https://testproject.testproject",
    "android": "https://testproject.testproject",
    "ios": "https://testproject.testproject"
  },
  "title": "Test Project",
  "text": "This is a test project.",
  "category": "DeFi",
  "website": "https://testproject.testproject",
  "github": "https://github.com/GitAccount/TestProject",
  "discord": "https://discord.gg/TestProject",
  "twitter": "https://twitter.com/TestProject",
  "telegram": "https://t.me/TestProject"
}
```
**id**: This is the ID. Generate a new one here https://www.uuidtools.com/v4

**icon**: This is the name of the image file which should be present in `public/ecosystem/icons/`

**backgroundImage**: This is the name of the background image file which should be present in `public/ecosystem/background-images/`

**coverImage**: This is the name of the cover image file which should be present in `public/ecosystem/cover-images`

**appPreviews**: This is an array with the name of the preview image files (at least 3) prefixed by `app-previews/MY_PROJECT/` which should be present in `public/ecosystem/app-previews/MY_PROJECT/`. Replace `MY_PROJECT` with the name of your project as directory name. 

**appLinks**: This is an object with links. Allowed keys are `chrome`, `firefox`, `android` or `ios` (optional)

**title**: This is the name of your project

**text**: This is the description of your project

**category**: This is the type of your project. Choose between `Tooling`, `NFT`, `DeFi`, `Exchange`, `Wallet`, `Consumer`, `Gaming`, or `Soon` (if your project is coming soon and not launched yet)

**website**: This is your project's website (optional)

**github**: This is the invitation link to your Discord server (optional)

**twitter**: This is the twitter link to your project's profile (optional)

**telegram**: This is the invitation link to your telegram group/channel (optional)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
