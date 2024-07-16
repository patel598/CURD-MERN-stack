

##  ----------USER REGISTRATION------------- ##


# This end-point to create Admin and Super admin 
"/register-super-admin" 

# This end-point to create Users
"/registrae"

# This end-point to login all
"/login"

# This end-point is show user list which show only Admin and Super admin
"/user-list"

# This end-point manage user restrection 
"/user-status"

# This end-point create new access token using refresh token
"/refresh-token"

##  ----------PRODUCT------------- ##

# This end-point for product creation
"/product"

# This end-point for get all product
"/get-product/:userObjectId"

# This end-point for get single product by product id
"/product/:id"

# This end-point for update product by product id
"/product/:id"

# This end-point for manage status of product by id and isActive 
"/product/:id/:isActive"


##  ----------ORDER------------- ##

# This end-point for submit order 
"/submit-order"
