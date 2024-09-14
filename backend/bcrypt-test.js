// bcrypt-full-test.js
const bcrypt = require('bcrypt');

// The plain-text password you are testing
const plainPassword = '12345678';

// Hash the password
bcrypt.genSalt(12, (err, salt) => {
  if (err) throw err;

  bcrypt.hash(plainPassword, salt, (err, hash) => {
    if (err) throw err;
    
    console.log('Hashed password:', hash);

    // Compare the password with the hash
    bcrypt.compare(plainPassword, hash, (err, isMatch) => {
      if (err) throw err;
      
      console.log('Password match:', isMatch);  // Should log true
    });
  });
});
