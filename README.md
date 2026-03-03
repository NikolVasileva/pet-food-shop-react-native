# Project Overview

## Application Name
Pet Food Shop | eCommerce

## Application Category / Topic
Online shop

## Main Purpose
An online pet food store where users can browse products by category and brand, and take advantage of special discounts.

## APK Link - https://drive.google.com/file/d/1by-wgpXaVuy57ox6-DvM48OLHyZx2XTy/view?usp=sharing 

---

# User Access & Permissions

## Guest (Not Authenticated)
- Available screens or actions:
  - Unauthenticated users can only access the Login and Registration screens.

## Authenticated User
- Main sections / tabs:
  - Logged-in users can access the main tabs: Home, Cart, Favourite, and Profile.
- Details screens:
  - Product Details, Cart Details, Favourite Items, User Profile (shows only registered email), and a special Easter promotion page.
- Create / Edit / Delete actions:
  - Users can add products to Cart or Favourites, update Cart quantities, apply promo codes for discounts, remove items, manage favourite products, and edit their registered email.

---

# Authentication & Session Handling

## Authentication Flow
The user sees the start screen with options to navigate to Login or Registration; the app initializes AuthContext, and after successful login or registration the user is redirected to the Home screen with all main tabs; on logout, user data is cleared and they are returned to the unauthenticated start screens.

## Session Persistence
User session is stored using secure state, separating the storage of user data and access tokens. After app restart, the session is preserved, including items added to the Cart and products marked as Favourite.

---

# Navigation Structure

## Root Navigation Logic
- Navigation is split into two parts: Auth and Shop. Unauthenticated users cannot access the Shop navigation until they log in.

## Main Navigation
- The main navigation is the Shop, using tabs for the primary sections: Home (with nested stack navigation), Cart (with nested stack navigation), Favorites, and Profile.

## Nested Navigation
- Home tab includes a nested stack: Home, Brands screen, Category screen, Special Offer, and Product Details.  
- Cart tab includes a nested stack: Cart screen and Cart Delivery screen.

---

# List → Details Flow

## List / Overview Screen
- Type of data displayed: The Home screen shows a Special Offer banner, product sections by Category and Brand, and a Best Sellers section.  
- How the user interacts with the list:  
  - Tapping the Special Offer banner opens a dedicated promotion page.  
  - Tapping a Category opens a screen showing products from that category.  
  - Tapping a Brand opens a screen with brand details and products.  
  - Tapping a product in Best Sellers opens the Product Details screen, where the user can add it to the Cart or mark it as Favourite.

## Details Screen
- How navigation is triggered: Activated via stack navigation when tapping a product card, brand card, or category card.  
- What data is received via route parameters: The relevant `id` of the product, brand, or category is passed to the details screen.

---

# Data Source & Backend

## Backend Type
- Simulated backend - JSON server

---

# Data Operations (CRUD)

## Read (GET)
- Fetch lists of Brands, Categories, and Products.  
- Fetch the user's list of Favourite products.

## Create (POST)
- Create a new user on registration and store user session on login.

## Patch / Put
- Users can update their registered email in the Profile section.  
- Users can update their list of Favourite products.

---

# Forms & Validation

## Forms Used
- Forms are used on Login and Registration screens, as well as in the order fields.

## Validation Rules
- Fields cannot be empty.  
- Email must be valid, including proper characters and domain.  
- Passwords must be at least 4 characters long.  
- Phone numbers must be at least 10 digits.

---

# Native Device Features

## Used Native Feature(s)
- Clipboard

## Usage Description
- In the Cart, users can apply a 20% discount voucher by copying it to the clipboard and pasting it into the voucher field.

---

# Typical User Flow

1. User opens the app and sees the start screen.  
2. User navigates to Login or Registration and signs in.  
3. User browses products by Category or Brand, views Special Offers, and visits a dedicated Promotions page.  
4. On product pages, users can add items to Cart or mark them as Favourite.  
5. User applies promo codes or vouchers in the Cart and proceeds to checkout.  
6. User can view and edit their Profile, including updating their email, or log out to return to the start screen.

---

# Error & Edge Case Handling

## Error & Edge Case Handling
- Registration and Login form fields highlight in red on errors; empty fields are not allowed.  
- System errors trigger Toast notifications.  
- Adding a promo code in the Cart or filling out delivery information uses Alerts to notify the user.