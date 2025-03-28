# Skip Management Application

This project is a React TypeScript application for waste management skip selection and booking.

## Recent Improvements

- total price calculation based on weekly price and hire period altough I'm not sure if I should've add transport cost to it, maybe price should be calculated at the backend
- transport cost display in a badge at the top right of each card
- "Free Transport" displayed in green when transport cost is null because everyone likes free things
- transport fees included in the price when applicable
- continue button has a right arrow icon when a skip is selected to urge user to proceed
- removed duplicate informations
- show available skips by default on mobile screens (<640px) to help with the ux, less scrolling
- removed image from the card because it was same image for all skips and takes too much space, user will read the information and wont get distracted by the image
- formatted the price to be displayed with thousand separators
- added a small animation to the banner to make it more engaging
- removed outdated borders to reduce distraction
- updated the button text
- card height is smaller for less scrolling

### Code Structure Improvements

1. **Component Extraction**: Extracted `SkipCard` into a separate component for better modularity and reusability
2. **Utility Functions**: Moved helper functions to a dedicated `/utils/formatters.ts` file:
   - `formatPrice`: Formats prices with thousand separators and decimal places when needed
   - `calculatePriceWithVAT`: Calculates prices including VAT
   - `calculateTotalPrice`: Calculates total price based on weekly price and hire period

### UI/UX Improvements

1. **Price Display Logic**:
   - Weekly prices shown on cards
   - Total price (based on hire period) shown in the bottom banner
   - All prices formatted with thousand separators (e.g., £1,234.56)

2. **Transport Cost Display**:
   - Transport costs shown in a badge at the top right of each card
   - "Free Transport" displayed in green when transport cost is null
   - Transport fees included in the price when applicable

3. **Selection Experience**:
   - Card selection changes are immediate
   - Banner animations provide smooth transitions
   - Continue button has a right arrow icon when a skip is selected

4. **Mobile Optimization**:
   - "Show only available skips" set to true by default on mobile screens (<640px)
   - Responsive layout with different column counts based on screen size

5. **User Feedback**:
   - Alert with selected skip ID and thank you message when Continue is clicked
   - Clear visual indication of selected skip
   - Banner with highest z-index (z-50) to appear on top of everything else

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
