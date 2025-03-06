# Train_Management_System2.0
This includes Customer Registration &amp; Login, Customer Portal, and Admin Portal. Customers can register, log in, book, view, and cancel tickets. They can update details and log out. Admins manage tickets, users, and trains, view sales reports, and update profiles. Both users and admins have a structured workflow ensuring smooth operations.

1	Registration Page	US_UI_001	Login related information	"You have to create 2 web pages for the registration for the customer and login for the customer.

Login.
    If the user is already register for application you will ask the user for the username and password. You will need to take following things in to consideration.
        1. Username -> username should be string and it should not be a not null value
        2. password -> password should be string and it should also be not null value.

Register
    If the user is not register you will go to register page and you fill out the following details
        1. username
            1.1 -> it should be at least 6 character long
            1.2 -> without the special character or number
            1.3 -> it should be a not null value.
        2. password
            1.1 -> It should be at least 8 character long
            1.2 -> It should contain at least 1 special character
            1.3 -> It should contain at least 1 number character
            1.4 -> It should contain at least 1 upper character
            1.5 -> it should be a not null value.
        3. Confirm Password
            1.1 -> It should be matching with the password and confirm password
            1.2 -> it should be a not null value.
        4. Mail
            1.1 -> It should contain at least one ""@"" sign
            1.2 -> It should contain at least one part for the domain like gmail.com or hotmail.com
            1.3 -> it should be a not null value.
        5. Mobile Number
            1.1 -> It should not take any alphabet as input and it should be 10 digit long
            1.2 -> it should be a not null value.
        6. Adhara number
            1.1 -> it should be a not null value."
            
            
2	Login Page	US_UI_002	Customer related operation	"Once you are logged into the customer portal there should be following functions 

 Home[Current page]
  In the home page there will be 4 main compoment you will need to impliment.
  1. Table aggregate Section
               1.1 Number of tickets booked per class
                1.2 Sales done per quarter
  2. Book Ticket
     2.1 ID [This should be auto populated in accordance to the user logged in]
                   2.2 Name
                   2.3 Mobile
     2.4 Age
                   2.5 Date
     2.4 Boarding Station
     2.5 Destination Station 
     2.6 Ticket Category [First class , A.C tier 1 ,A.C tier2 , Tatkal etc ]
     2.7 Trains available [Showing all the available trains for selection]
     2.8 Number of tickets
     
         Upon Submiting it should navigate you to a booking confirmation page displaying your ID and train ID with a few essential booking details eg. Your booking ID , Boarding and destination station etc.
        
  3. Veiw Ticket 
     This section will display all the tickets booked by you. Following things should be displayed 
     3.1 Ticket ID
     3.2 Train ID
     3.3 User ID
     3.4 User Name
     3.5 Boarding Station
     3.6 Destination Station
     3.7 Boarding Date and Time 
         3.8 Arrival Date and Time 
     3.9 Number of tickets [This will show the number of tickets bought ]
     3.10 Cancel Ticket 
   3.10.1 Cancel ticket option should pop the cancellation confirmation box which should be confirmed in order to cancel the ticket

    4. Update Details
     This section will allow the userto update their details. The user should be able to update the following things
     4.1 Email
     4.2 Mobile Number
     4.3 Address
     4.4 Update Password 
         4.4.1 If selected it will show the following feilds
                      4.4.1.1 Current Password
                      4.4.1.2 New Password
        4.4.1.3 Confirm password
   [Note: The validations here should be default i.e. followed same as you followed for user registration process]

     5. Logout [Once the user clicks on the logout button user should be redirected to the login page for the application   ]"


3	Home Page	US_UI_003	Admin Related operation	"Once you are logged into the admin portal there should be a navigation with the following
NOTE: All the values that you will be entering in your application should not be null value.

    Home (current)
        In the home page there will be 3 main compoment you will need to impliment.
        1. Aggrigate Table Section
            1.1 Number of tickets booked per class
            1.2 Sales done per quarter
        2. Table section
            2.1 In the table section you will be having data with respect the client, with following information.
                2.2.1 ID
                2.2.2 Name
                2.2.3 Mobile
                2.2.4 Number Of ticket Booked
                2.2.5 Delete customer
    Register a train
        In the register a train web page, you will register the train so that we can use the same while checking the schedule and user can select which train he wants to go through
        Following are some of the things admin will enter, to register a train
            1. Name of train
            2. Number of seats
            3. To
            4. From
            5. Owner Ship for the train.
    Profile
        In the profile section we will be updating or deleting the user information. It will be having the following information user can update.
            1. Username
            2. Password
            3. Mobile Number
            4. Email Id
    Logout
        Once the user clicks on the logout button user should be redirected the login page for the application"
				
