# DESIGN AND ARCHITECTURE

Before starting the application, draw up some basic designs and outline in a document what you are
going to create – plan the features like validation and authentication so you know what the
application is going to look like. After step 4, you should also evaluate the application against the
design plans and consider how successful the application is in meeting your aims.

# Implement

## Screens

- Login Screen
- Sign Up Screen
- Landing/Home Screen (auth protected): This would display artists and all their songs
- Artist Screen (auth protected)
<!-- - Album Songs Screens (auth protected): This shows all the albums and all the songs  -->
- Song Details Modal, with CRUD (auth protected)
- Song Creation Modal

## Functional Requirements

- Authentication Context
- Token Expiration/Invalidation Redirects to Login Screen
- Listing of available songs on the Landing screen.
- Display all viable Genres: Horizontal scroll on the landing screen displaying all genres
- Add song: There should be a add song button at the top right of the lanfing screen together with a log-out button.
- View song details: Web view to play songs using available links (we will use a bottom sheet for song clicks).
- View songs by artist: In the song details screen users should be able to click the artists name and view all their albums, on click of an album, the album songs should be displayed, ParallaxScrollView would be used here.
- Edit song details: Upon song details edit song data should be invalidated.
- Delete song: Upon song delete the user should be redirected to he home screen with cache invalidates.

# Theme

All designs should be in dark theme
