/**
 * Example usage of gravatar functions
 * This file demonstrates how to use the gravatar utility functions
 * to generate unique avatar images for users.
 */

import { generateGravatar, generateUniqueAvatar } from '../src/utils/helper.js';

// Example 1: Using Gravatar service
console.log('=== Gravatar Examples ===');

const userEmail = 'john.doe@example.com';
const userEmail2 = 'jane.smith@example.com';

// Basic gravatar with default settings
const basicGravatar = generateGravatar(userEmail);
console.log(`Basic Gravatar for ${userEmail}:`);
console.log(basicGravatar);

// Gravatar with custom size and style
const customGravatar = generateGravatar(userEmail, 150, 'monsterid');
console.log(`\nCustom Gravatar (150px, monsterid) for ${userEmail}:`);
console.log(customGravatar);

// Different user will get different avatar
const anotherGravatar = generateGravatar(userEmail2, 200, 'wavatar');
console.log(`\nGravatar for ${userEmail2}:`);
console.log(anotherGravatar);

// Example 2: Using DiceBear alternative service
console.log('\n=== DiceBear Avatar Examples ===');

const username = 'johndoe123';
const username2 = 'janesmith456';

// Basic avatar with default style
const basicAvatar = generateUniqueAvatar(username);
console.log(`\nBasic Avatar for ${username}:`);
console.log(basicAvatar);

// Avatar with different style
const robotAvatar = generateUniqueAvatar(username, 'bottts', 180);
console.log(`\nRobot Avatar for ${username}:`);
console.log(robotAvatar);

// Pixel art style avatar
const pixelAvatar = generateUniqueAvatar(username2, 'pixel-art', 200);
console.log(`\nPixel Art Avatar for ${username2}:`);
console.log(pixelAvatar);

// Example 3: How to use in user registration
console.log('\n=== User Registration Example ===');

const newUser = {
    username: 'newuser123',
    email: 'newuser@example.com',
    password: 'hashedpassword'
};

// Generate avatar during user registration
const userAvatar = generateGravatar(newUser.email, 200, 'identicon');
const userAvatarAlt = generateUniqueAvatar(newUser.username, 'avataaars');

console.log(`\nFor new user registration:`);
console.log(`Username: ${newUser.username}`);
console.log(`Email: ${newUser.email}`);
console.log(`Gravatar URL: ${userAvatar}`);
console.log(`Alternative Avatar URL: ${userAvatarAlt}`);

// Example 4: Different avatar styles showcase
console.log('\n=== Avatar Styles Showcase ===');

const testEmail = 'test@example.com';
const testUsername = 'testuser';

console.log('\nGravatar styles:');
const gravatarStyles = ['identicon', 'monsterid', 'wavatar', 'retro', 'robohash'];
gravatarStyles.forEach(style => {
    const avatar = generateGravatar(testEmail, 150, style);
    console.log(`${style}: ${avatar}`);
});

console.log('\nDiceBear styles:');
const diceBearStyles = ['avataaars', 'bottts', 'identicon', 'initials', 'personas', 'pixel-art'];
diceBearStyles.forEach(style => {
    const avatar = generateUniqueAvatar(testUsername, style, 150);
    console.log(`${style}: ${avatar}`);
});

console.log('\n=== Usage Tips ===');
console.log('1. Gravatar uses email hash - same email always generates same avatar');
console.log('2. DiceBear uses seed string - same seed always generates same avatar');
console.log('3. Use Gravatar for users with real email addresses');
console.log('4. Use DiceBear for users with usernames or when you want more style options');
console.log('5. Store the generated avatar URL in the user model avatar field');
console.log('6. Consider fallback: try Gravatar first, then DiceBear if needed');
