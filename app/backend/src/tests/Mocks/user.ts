const user = {
  id: 1,
  username: 'Amanda',
  role: 'amanda',
  email: 'amanda-test@test.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    // senha é batatinha123
}


const userLogin = 
  {
    "email": "amanda-test@test.com",
    "password": "secret_admin"
  }
;

const userLoginWithoutEmail = 
  {
    "email": "",
    "password": "secret_admin"
  }
;

const userLoginWithoutPassword = 
  {
    "email": "amanda-test@test.com",
    "password": ""
  }
;

const userLoginPasswordWrong = 
  {
    "email": "amanda-test@test.com",
    "password": "scrt"
  }
;

const userLoginEmailWrong = 
  {
    "email": "admin.com",
    "password": "secret_admin"
  }

const mockToken = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImJhdGF0aW5oYTEyMyJ9.Z4rGSpVxKQd78d8CgwjCTqXTHtoSr8ACQX9IBlx2kuo"
}


  export default { user, userLogin, mockToken, userLoginWithoutEmail, userLoginWithoutPassword, userLoginPasswordWrong, userLoginEmailWrong};