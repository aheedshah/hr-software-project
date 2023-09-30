USE myDatabase;
-- Inserting details for testing purposes.
INSERT INTO users(username, password, admin) 
VALUES ('jbond007', 'hello', false);

INSERT INTO employeeDetails(first_name, last_name, email, phone, hire_date, department_name, job_title, street_address, 
postal_code, city, country_id, daysLeftForLeave, lastPay) 
Values ('James', 'Bond', 'jbond007@gold.ac.uk', '0773707772', '2022-01-1', 'MI5', 'Espionage', 
'25, Kings Road, Chelsea', 'SW10 2RN', 'London', 'GB', 21, '2022-02-01');